const Appointement = require('../model/Appointement');

const createAppointement = async (req, res) => {
    try {
        const { serviceId, dateTime, requestDescription } = req.body;
        const userId = req.user.id;
        const newAppointement = new Appointement({
            service: serviceId,
            user: userId,
            dateTime,
            requestDescription
        });
        await newAppointement.save();
        res.status(201).json({ message: 'Appointement created successfully', appointement: newAppointement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


const getallAppointements = async (req, res) => {
    try {
        const appointements = await Appointement.find().populate({path: 'service' , select: 'title' }).populate({path: 'user' , select: 'username'});
        res.status(200).json(appointements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getAppointmenetByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const appointements = await Appointement.find({ dateTime: { $gte: new Date(date), $lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000) } }).populate({path : 'service' , select: 'title' }).populate({path: 'user' , select: 'username'});
        res.status(200).json(appointements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


const getUserAppointements = async (req, res) => {
    try {
        const userId = req.user.id;
        const appointements = await Appointement.find({ user: userId }).populate({path: 'service' , select: 'title' });
        res.status(200).json(appointements);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const cancelAppointement = async (req, res) => {
    try {
        const appointementId = req.params.id;
        const appointement = await Appointement.findById(appointementId);
        if (!appointement) {
            return res.status(404).json({ message: 'Appointement not found' });
        }
        appointement.status = 'Cancelled';
        await appointement.save();
        res.status(200).json({ message: 'Appointement cancelled successfully', appointement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


const approveAppointement = async (req, res) => {
    try {
        const appointementId = req.params.id;
        const appointement = await Appointement.findById(appointementId);
        if (!appointement) {
            return res.status(404).json({ message: 'Appointement not found' });
        }
        appointement.status = 'Confirmed';
        await appointement.save();
        res.status(200).json({ message: 'Appointement approved successfully', appointement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


const rejectAppointement = async (req, res) => {
    try {
        const appointementId = req.params.id;
        const appointement = await Appointement.findById(appointementId);
        if (!appointement) {
            return res.status(404).json({ message: 'Appointement not found' });
        }
        appointement.status = 'Cancelled';
        await appointement.save();
        res.status(200).json({ message: 'Appointement rejected successfully', appointement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const resetAppointement = async (req, res) => {
    try {
        const appointementId = req.params.id;
        const appointement = await Appointement.findById(appointementId);
        if (!appointement) {
            return res.status(404).json({ message: 'Appointement not found' });
        }
        appointement.status = 'Pending';
        await appointement.save();
        res.status(200).json({ message: 'Appointement reset successfully', appointement });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createAppointement,
    getallAppointements,
    getUserAppointements,
    cancelAppointement,
    approveAppointement,
    rejectAppointement,
    resetAppointement,
    getAppointmenetByDate
};
