const router = require('express').Router();
const ctrl   = require('../controllers/admin.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize }    = require('../middlewares/rbac.middleware');

// All admin routes require auth + admin role
router.use(authenticate, authorize('admin'));

router.get('/stats',                      ctrl.getDashboardStats);
router.get('/vendors',                    ctrl.listVendors);
router.get('/vendors/:id',                ctrl.getVendor);
router.patch('/vendors/:id/approve',      ctrl.approveVendor);
router.patch('/vendors/:id/reject',       ctrl.rejectVendor);
router.delete('/vendors/:id',             ctrl.deleteVendor);
router.get('/products',                   ctrl.listProducts);
router.patch('/products/:id/feature',     ctrl.toggleFeatureProduct);
router.get('/inquiries',                  ctrl.listInquiries);
router.get('/users',                      ctrl.listUsers);

module.exports = router;
