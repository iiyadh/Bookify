const dayjs =  require('dayjs');
const cron = require('node-cron');
const { sendEmail } = require('../lib/emailSender');
const Appointement = require('../model/Appointement');

cron.schedule("0 8 * * *", async () => {
  const startOfDay = dayjs().startOf("day");
  const endOfDay = dayjs().endOf("day");

  const appointments = await Appointement.find({dateTime: {$gte: startOfDay.toDate(),$lte: endOfDay.toDate()},status: 'Confirmed' }).populate({path: 'user', select: 'email'});
  for (let appt of appointments) 
    {
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
});