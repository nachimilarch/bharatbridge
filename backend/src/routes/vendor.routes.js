const router = require('express').Router();
const ctrl   = require('../controllers/vendor.controller');
const { authenticate }     = require('../middlewares/auth.middleware');
const { authorize }        = require('../middlewares/rbac.middleware');
const { uploadSingle, uploadProductImages } = require('../config/multer');

// All vendor routes require auth + vendor role
router.use(authenticate, authorize('vendor'));

router.get('/profile',                                    ctrl.getProfile);
router.put('/profile',                                    ctrl.updateProfile);
router.post('/profile/logo',  uploadSingle('logo'),     ctrl.uploadLogo);
router.get('/dashboard/stats',                            ctrl.getDashboardStats);
router.get('/inquiries',                                  ctrl.getInquiries);
router.patch('/inquiries/:id/status',                     ctrl.updateInquiryStatus);

module.exports = router;
