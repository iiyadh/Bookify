const {
    createAppointement,
    getallAppointements,
    getUserAppointements,
    cancelAppointement,
    approveAppointement,
    rejectAppointement,
    resetAppointement,
    getAppointmenetByDate,
    sendReminder
} = require('../controller/appointementController');
const { verifyToken , authorizeRoles , cronVerifyToken } = require('../middleware/authMiddleware');
const router = require('express').Router();


router.post('/' , verifyToken , createAppointement);
router.get('/' , verifyToken , authorizeRoles('admin') , getallAppointements);
router.get('/date' , verifyToken , authorizeRoles('admin') , getAppointmenetByDate);
router.get('/user' , verifyToken , getUserAppointements);
router.put('/cancel/:id' , verifyToken , cancelAppointement);
router.put('/approve/:id' , verifyToken , authorizeRoles('admin') , approveAppointement);
router.put('/reject/:id' , verifyToken , authorizeRoles('admin') , rejectAppointement);
router.put('/reset/:id' , verifyToken , authorizeRoles('admin') , resetAppointement);
router.post('/send-reminders', cronVerifyToken, sendReminder);



module.exports = router;