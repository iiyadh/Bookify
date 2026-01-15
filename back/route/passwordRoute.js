const router = require('express').Router();
const { forgotPassword , resetPassword } = require('../controller/passwordController');

router.post('/forgot',forgotPassword);
router.post('/reset/:token',resetPassword);


module.exports = router;