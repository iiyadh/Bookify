const Appointement = require('../model/Appointement');
const dayjs =  require('dayjs');
const { sendEmail } = require('../lib/emailSender');


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

const sendReminder = async (req,res) => {
    try {
        const startOfDay = dayjs().startOf("day");
        const endOfDay = dayjs().endOf("day");

        const appointments = await Appointement.find({ dateTime: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }, status: 'Confirmed' }).populate({ path: 'user', select: 'email' });
        for (let appt of appointments) {
            const appointmentDate = dayjs(appt.dateTime).format('MMMM D, YYYY');
            const appointmentTime = dayjs(appt.dateTime).format('h:mm A');

            const mailOptions = {
                from: process.env.SMTP_USER,
                to: appt.user.email,
                subject: '🔔 Appointment Reminder',
                text: `This is a friendly reminder for your appointment scheduled on ${appointmentDate} at ${appointmentTime}.`,
                html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #2c3e50; text-align: center; margin-bottom: 30px;">
                    🔔 Appointment Reminder
                </h2>
                <p style="font-size: 16px; color: #333; line-height: 1.6;">
                    This is a friendly reminder for your upcoming appointment:
                </p>
                <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 10px 0; font-size: 16px; color: #2c3e50;">
                    <strong>📅 Date:</strong> ${appointmentDate}
                    </p>
                    <p style="margin: 10px 0; font-size: 16px; color: #2c3e50;">
                    <strong>🕐 Time:</strong> ${appointmentTime}
                    </p>
                </div>
                <p style="font-size: 14px; color: #666; text-align: center; margin-top: 30px;">
                    Thank you for choosing our services!
                </p>
                </div>
            </div>
            `
            };
            await sendEmail(mailOptions);
        }
        res.status(200).json({ message: 'Reminders sent successfully' });
    }catch(err){
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
    getAppointmenetByDate,
    sendReminder
};
