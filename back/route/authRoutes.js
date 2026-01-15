const {
    login,
    register,
    logout,
    checkAuth,
    signWithGoogle,
    signWithFacebook } = require('../controller/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = require('express').Router();


router.post('/login' , login);
router.post('/register' , register);
router.post('/google/:token' , signWithGoogle);
router.post('/facebook/:token' , signWithFacebook);
router.post('/logout' , logout);
router.get('/checkAuth' , verifyToken , checkAuth);





module.exports = router;