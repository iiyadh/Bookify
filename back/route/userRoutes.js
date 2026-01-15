const router = require('express').Router();
const {
    getAllUsers,
    blockUser,
    unblockUser
} = require('../controller/userController');
const { verifyToken , authorizeRoles} = require('../middleware/authMiddleware');    

router.get('/', verifyToken, authorizeRoles('admin'), getAllUsers);
router.put('/block/:id', verifyToken, authorizeRoles('admin'),blockUser);
router.put('/unblock/:id', verifyToken, authorizeRoles('admin'),unblockUser);


module.exports = router;