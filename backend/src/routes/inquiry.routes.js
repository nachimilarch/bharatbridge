const router = require('express').Router();
const prisma = require('../config/database');
const { success, error, paginated } = require('../utils/apiResponse');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');
const { validate } = require('../middlewares/validate.middleware');
const emailService = require('../services/email.service');
const { getPagination } = require('../utils/paginate');
const Joi = require('joi');

const inquirySchema = Joi.object({
  productId: Joi.number().integer().required(),
  buyerName: Joi.string().min(2).max(150).required(),
  buyerCompany: Joi.string().max(255).allow('', null),
  buyerEmail: Joi.string().email().required(),
  buyerPhone: Joi.string().max(30).allow('', null),
  buyerCountry: Joi.string().max(100).allow('', null),
  quantity: Joi.number().integer().min(1).allow(null),
  message: Joi.string().max(2000).allow('', null),
});

// Public: Submit inquiry
router.post('/', validate(inquirySchema), async (req, res, next) => {
  try {
    const { productId, buyerName, buyerCompany, buyerEmail, buyerPhone, buyerCountry, quantity, message } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: productId, isPublished: true },
      include: { vendor: { include: { user: { select: { email: true, name: true } } } } },
    });
    if (!product) return error(res, 'Product not found', 404);

    const inquiry = await prisma.inquiry.create({
      data: { productId: product.id, vendorId: product.vendorId, buyerName, buyerCompany, buyerEmail, buyerPhone, buyerCountry, quantity, message },
    });

    // Fire-and-forget email notifications
    Promise.allSettled([
      emailService.sendInquiryToAdmin(inquiry, product),
      emailService.sendInquiryToVendor(inquiry, product, product.vendor.user.email),
      emailService.sendInquiryConfirmationToBuyer(buyerEmail, buyerName, product.name),
    ]).catch(console.error);

    return success(res, { id: inquiry.id }, 'Inquiry submitted successfully', 201);
  } catch (err) {
    next(err);
  }
});

// Vendor: My inquiries
router.get('/my', authenticate, authorize('vendor'), async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    if (!vendor) return error(res, 'Vendor profile not found', 404);

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where: { vendorId: vendor.id },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { product: { select: { name: true, slug: true } } },
      }),
      prisma.inquiry.count({ where: { vendorId: vendor.id } }),
    ]);

    return paginated(res, inquiries, total, page, limit);
  } catch (err) {
    next(err);
  }
});

// Vendor: Respond to inquiry
router.patch('/:id/respond', authenticate, authorize('vendor'), async (req, res, next) => {
  try {
    const { response } = req.body;
    if (!response) return error(res, 'Response message required', 400);

    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    const inquiry = await prisma.inquiry.findFirst({ where: { id: parseInt(req.params.id), vendorId: vendor?.id } });
    if (!inquiry) return error(res, 'Inquiry not found', 404);

    const updated = await prisma.inquiry.update({
      where: { id: inquiry.id },
      data: { vendorResponse: response, status: 'responded', respondedAt: new Date() },
    });

    return success(res, updated, 'Response submitted');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
