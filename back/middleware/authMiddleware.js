const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp * 1000 < Date.now()) {
            res.clearCookie('token', {
                httpOnly: true,
                sameSite: 'strict'
            });
            return res.status(401).json({ message: 'Token expired' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

const cronVerifyToken = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        throw new Error('No token provided');
    }
   try{
       if (token == "63f4945d921d599f27ae4fdf5bada3f1") {
           next();
       } else {
           return res.status(401).json({ message: 'Unauthorized' });
       }
    
   }catch(err){
        console.log(err);
        throw new Error('Invalid token');
   }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
}




module.exports = { verifyToken , authorizeRoles ,cronVerifyToken };