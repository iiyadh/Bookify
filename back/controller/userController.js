const User = require('../model/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({role : 'user'});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


const blockUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = 'inactive';
        await user.save();
        res.json({ message: 'User blocked successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};



const unblockUser = async (req, res) => {
    const userId = req.params.id;
    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = 'active';
        await user.save();
        res.json({ message: 'User unblocked successfully' });
    }catch(err){
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllUsers,
    blockUser,
    unblockUser
};