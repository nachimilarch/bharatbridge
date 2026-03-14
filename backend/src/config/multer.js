const multer = require('multer');
const path   = require('path');
const fs     = require('fs');

// ── Ensure upload directories exist ─────────────────────────
['uploads/products', 'uploads/logos', 'uploads/documents'].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ── Storage factory ──────────────────────────────────────────
const makeStorage = (subfolder) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, `uploads/${subfolder}`),
    filename:    (req, file, cb) => {
      const ext   = path.extname(file.originalname).toLowerCase();
      const stamp = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${subfolder}-${stamp}${ext}`);
    },
  });

// ── File filters ─────────────────────────────────────────────
const imageFilter = (req, file, cb) => {
  const ALLOWED = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  ALLOWED.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error('Only image files allowed (jpeg, png, webp, gif)'), false);
};

const docFilter = (req, file, cb) => {
  const ALLOWED = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  ALLOWED.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error('Only images and PDF/DOC files allowed'), false);
};

// ── Raw multer instances (NOT pre-called) ────────────────────
const productMulter  = multer({ storage: makeStorage('products'),  fileFilter: imageFilter, limits: { fileSize: 5  * 1024 * 1024 } });
const logoMulter     = multer({ storage: makeStorage('logos'),     fileFilter: imageFilter, limits: { fileSize: 2  * 1024 * 1024 } });
const documentMulter = multer({ storage: makeStorage('documents'), fileFilter: docFilter,   limits: { fileSize: 10 * 1024 * 1024 } });

// ── Exported middleware ───────────────────────────────────────
// All exports are either factory functions OR pre-called middleware.
// NEVER mix — pick one pattern per export.

// Factory functions (call in route definition)
const uploadSingle        = (field = 'file')     => logoMulter.single(field);
const uploadProductSingle = (field = 'image')    => productMulter.single(field);
const uploadDocument      = (field = 'document') => documentMulter.single(field);

// Pre-called middleware (use directly in route, NO extra call needed)
const uploadProductImages = productMulter.array('images', 8);   // ← already called
const uploadLogoMiddleware = logoMulter.single('logo');          // ← already called

module.exports = {
  uploadSingle,           // factory → use as: uploadSingle('logo')
  uploadProductSingle,    // factory → use as: uploadProductSingle('image')
  uploadDocument,         // factory → use as: uploadDocument('doc')
  uploadProductImages,    // middleware → use directly, NO ()
  uploadLogoMiddleware,   // middleware → use directly, NO ()
};
