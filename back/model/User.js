const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    googleId: {
        type: String,
    },
    facebookId:{
        type:String,
    },
    resetToken:{
        type:String,

    },
    resetTokenExpiry:{
        type:Date,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;