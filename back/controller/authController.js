const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const axios = require('axios');



const JWT_SECRET = process.env.JWT_SECRET ;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ;


const generateToken = (user) =>{
    const payload = {
        id: user._id,
        role: user.role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

const login = async (req , res)=>{
    const { email, password , remmberMe } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user , user.role);
        res.cookie('token', token, {
                httpOnly: true ,
                sameSite: 'none',
                secure: true,
                maxAge: remmberMe ? 7 * 24 * 60 * 60 * 1000 : null,
                path: "/",
            });
        res.json({message : 'Login successful' , role : user.role});
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}

const register = async (req , res)=>{
    const { username, email, password } = req.body;
    try{
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();
        const token = generateToken(user);
        res.cookie('token', token, {
                httpOnly: true ,
                secure: true,
                sameSite: 'none',
                path: "/", 
            });
        res.status(201).json({ message: 'User registered successfully' , role : user.role});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const signWithGoogle = async (req, res) =>{
    const { token } = req.params;
    try{
        const googleRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { email, name } = googleRes.data;
        let user = await User.findOne({ email });
        if(!user){
            user = new User({
                username: name,
                email,
                password: ''
            });
            await user.save();
        }
        const jwtToken = generateToken(user);
        res.cookie('token', jwtToken, {
                httpOnly: true ,
                secure: true,
                sameSite: 'None',
                path: "/",  
            });
        res.json({ message: 'Login with Google successful' , role : user.role});
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const signWithFacebook = async (req, res) =>{
    const { token } = req.params;
    try{
        const fbRes = await axios.get("https://graph.facebook.com/me", {
            params: {
                fields: "id,name,email",
                access_token: token,
            },
        });

        const { email, name } = fbRes.data;
        let user = await User.findOne({ email });
        if(!user){
            user = new User({
                username: name,
                email,
                password: '' 
            });
            await user.save();
        }
        const jwtToken = generateToken(user);
        res.cookie('token', jwtToken, {
                httpOnly: true ,
                secure: true,
                sameSite: 'None',
                path: "/",
            });
        res.json({ message: 'Login with Facebook successful' , role : user.role});
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}

const logout = (req , res)=>{
    res.clearCookie('token', {
        httpOnly: true ,
        secure: true,
        sameSite: 'none',
        path: "/",
    });
    res.status(200).json({ message: 'Logout successful' });
}

const checkAuth = async (req , res)=>{
    const userStatus = await User.findById(req.user.id).select('status');
    try{
        if(req.user){
            return res.status(200).json({ isAuthenticated: true , role : req.user.role , status: userStatus.status } );
        }
        res.status(400).json({ isAuthenticated: false });
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = {
    login,
    register,
    logout,
    checkAuth,
    signWithGoogle,
    signWithFacebook
}