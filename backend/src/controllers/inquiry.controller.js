// src/controllers/inquiry.controller.js
const prisma = require('../config/database');
const { success, error } = require('../utils/apiResponse');
const emailService = require('../services/email.service');

const submitInquiry = async (req, res) => {
  const { productId, buyerName, buyerCompany, buyerEmail, buyerPhone,
          buyerCountry, quantity, message } = req.body;

  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId), isPublished: true },
    include: { vendor: { include: { user: true } } }
  });
  if (!product) return error(res, 'Product not found', 404);

  const inquiry = await prisma.inquiry.create({
    data: {
      productId: product.id,
      vendorId: product.vendorId,
      buyerName, buyerCompany, buyerEmail,
      buyerPhone, buyerCountry,
      quantity: parseInt(quantity),
      message
    }
  });

  // Notify admin and vendor
  await Promise.allSettled([
    emailService.sendInquiryNotification('admin', inquiry, product),
    emailService.sendInquiryNotification('vendor', inquiry, product, product.vendor.user.email),
    emailService.sendInquiryConfirmation(buyerEmail, buyerName, product.name)
  ]);

  return success(res, { id: inquiry.id }, 'Inquiry submitted successfully', 201);
};

module.exports = { submitInquiry };
