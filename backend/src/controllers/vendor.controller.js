const prisma = require('../config/database');
const { success, error } = require('../utils/apiResponse');
const path   = require('path');
const fs     = require('fs');

// GET /vendors/profile — own profile
const getProfile = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where:  { userId: req.user.id },
      include: {
        user:     { select: { id: true, name: true, email: true, createdAt: true } },
        products: { select: { id: true, name: true, slug: true, isPublished: true, _count: true }, take: 5 },
        _count:   { select: { products: true, inquiries: true } },
      },
    });
    if (!vendor) return error(res, 'Vendor profile not found.', 404);
    return success(res, vendor);
  } catch (err) { next(err); }
};

// PUT /vendors/profile — update profile
const updateProfile = async (req, res, next) => {
  try {
    const {
      companyName, description, address, city, state,
      country, pincode, website, gstin, iecCode,
      contactPhone, exportCountries,
    } = req.body;

    const vendor = await prisma.vendor.update({
      where: { userId: req.user.id },
      data: {
        companyName, description, address, city, state,
        country, pincode, website, gstin, iecCode, contactPhone,
      },
    });
    return success(res, vendor, 'Profile updated successfully.');
  } catch (err) { next(err); }
};

// POST /vendors/profile/logo — upload logo
const uploadLogo = async (req, res, next) => {
  try {
    if (!req.file) return error(res, 'No file uploaded.', 400);
    const logoUrl = `/uploads/logos/${req.file.filename}`;
    const vendor = await prisma.vendor.update({
      where: { userId: req.user.id },
      data:  { logoUrl },
    });
    return success(res, { logoUrl: vendor.logoUrl }, 'Logo uploaded.');
  } catch (err) { next(err); }
};

// GET /vendors/dashboard/stats
const getDashboardStats = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    if (!vendor) return error(res, 'Vendor not found.', 404);

    const [totalProducts, activeProducts, totalInquiries, newInquiries] = await Promise.all([
      prisma.product.count({ where: { vendorId: vendor.id } }),
      prisma.product.count({ where: { vendorId: vendor.id, isPublished: true } }),
      prisma.inquiry.count({ where: { vendorId: vendor.id } }),
      prisma.inquiry.count({ where: { vendorId: vendor.id, status: 'NEW' } }),
    ]);

    const recentInquiries = await prisma.inquiry.findMany({
      where:   { vendorId: vendor.id },
      orderBy: { createdAt: 'desc' },
      take:    5,
      include: { product: { select: { name: true, slug: true } } },
    });

    return success(res, {
      vendor:    { id: vendor.id, companyName: vendor.companyName, kycStatus: vendor.kycStatus, isApproved: vendor.isApproved, logoUrl: vendor.logoUrl },
      stats:     { totalProducts, activeProducts, totalInquiries, newInquiries },
      recentInquiries,
    });
  } catch (err) { next(err); }
};

// GET /vendors/inquiries
const getInquiries = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    if (!vendor) return error(res, 'Vendor not found.', 404);

    const { page = 1, limit = 20, status } = req.query;
    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const where = { vendorId: vendor.id, ...(status && { status }) };

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take:    parseInt(limit),
        include: { product: { select: { name: true, slug: true, images: { take: 1 } } } },
      }),
      prisma.inquiry.count({ where }),
    ]);

    return success(res, inquiries, '', 200, {
      page: parseInt(page), limit: parseInt(limit), total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) { next(err); }
};

// PATCH /vendors/inquiries/:id/status
const updateInquiryStatus = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    const { status } = req.body;
    const VALID = ['NEW', 'CONTACTED', 'QUOTED', 'CLOSED', 'REJECTED'];
    if (!VALID.includes(status)) return error(res, 'Invalid status.', 400);

    const inquiry = await prisma.inquiry.findFirst({
      where: { id: req.params.id, vendorId: vendor.id },
    });
    if (!inquiry) return error(res, 'Inquiry not found.', 404);

    const updated = await prisma.inquiry.update({
      where: { id: req.params.id },
      data:  { status },
    });
    return success(res, updated, 'Inquiry status updated.');
  } catch (err) { next(err); }
};

module.exports = { getProfile, updateProfile, uploadLogo, getDashboardStats, getInquiries, updateInquiryStatus };
