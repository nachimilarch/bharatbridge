const router = require('express').Router();

const authRoutes      = require('./auth.routes');
const vendorRoutes    = require('./vendor.routes');
const productRoutes   = require('./product.routes');
const categoryRoutes  = require('./category.routes');
const countryRoutes   = require('./country.routes');
const inquiryRoutes   = require('./inquiry.routes');
const currencyRoutes  = require('./currency.routes');
const adminRoutes     = require('./admin.routes');

router.use('/auth',       authRoutes);
router.use('/vendors',    vendorRoutes);
router.use('/products',   productRoutes);
router.use('/categories', categoryRoutes);
router.use('/countries',  countryRoutes);
router.use('/inquiries',  inquiryRoutes);
router.use('/currency',   currencyRoutes);
router.use('/admin',      adminRoutes);

module.exports = router;
