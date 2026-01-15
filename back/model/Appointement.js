const mongoose = require('mongoose');

const appointementSchema = new mongoose.Schema({
    service :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateTime: {
        type: Date,
        required: true
    },
    requestDescription:{
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

const Appointement = mongoose.model('Appointement', appointementSchema);
module.exports = Appointement;