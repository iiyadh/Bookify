const router = require('express').Router();
const {
    addService,
    getAllServices,
    editService,
    deleteService
} = require('../controller/serviceController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');


router.get('/',verifyToken, authorizeRoles('admin','user'), getAllServices);
router.post('/',verifyToken, authorizeRoles('admin'), addService);
router.put('/:id', verifyToken, authorizeRoles('admin'), editService);
router.delete('/:id', verifyToken, authorizeRoles('admin'), deleteService);



module.exports = router;