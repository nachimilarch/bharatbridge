const router = require('express').Router();
const { authenticate }    = require('../middlewares/auth.middleware');
const { authorize }       = require('../middlewares/rbac.middleware');
const { uploadProductImages } = require('../config/multer');

// ── Load controller safely ────────────────────────────────────
const ctrl = require('../controllers/product.controller');

// Guard — logs any undefined exports so you can see exactly what's missing
const REQUIRED_HANDLERS = [
  'listProducts', 'getProduct', 'createProduct',
  'updateProduct', 'deleteProduct',
];
REQUIRED_HANDLERS.forEach((fn) => {
  if (typeof ctrl[fn] !== 'function') {
    console.error(`❌ product.controller.js is missing export: "${fn}"`);
  }
});

// ── Public routes ─────────────────────────────────────────────
router.get('/',      ctrl.listProducts);
router.get('/:slug', ctrl.getProduct);

// ── Vendor protected routes ───────────────────────────────────
router.post(
  '/',
  authenticate,
  authorize('vendor'),
  uploadProductImages,
  ctrl.createProduct
);

router.put(
  '/:id',
  authenticate,
  authorize('vendor'),
  ctrl.updateProduct
);

router.delete(
  '/:id',
  authenticate,
  authorize('vendor'),
  ctrl.deleteProduct
);

// Only add image upload route if handler exists
if (typeof ctrl.uploadProductImages === 'function') {
  router.post(
    '/:id/images',
    authenticate,
    authorize('vendor'),
    uploadProductImages,
    ctrl.uploadProductImages
  );
}

// Only add feature toggle if handler exists
if (typeof ctrl.toggleFeature === 'function') {
  router.patch(
    '/:id/feature',
    authenticate,
    authorize('admin'),
    ctrl.toggleFeature
  );
}

module.exports = router;
