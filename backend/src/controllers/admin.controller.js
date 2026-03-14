const prisma = require('../config/database');
const { success, error } = require('../utils/apiResponse');

// GET /admin/stats
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalVendors, pendingKyc, approvedVendors,
      totalProducts, totalInquiries, newInquiries,
      totalUsers,
    ] = await Promise.all([
      prisma.vendor.count(),
      prisma.vendor.count({ where: { kycStatus: 'PENDING' } }),
      prisma.vendor.count({ where: { isApproved: true } }),
      prisma.product.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.user.count(),
    ]);

    const recentVendors = await prisma.vendor.findMany({
      orderBy: { createdAt: 'desc' },
      take:    5,
      include: { user: { select: { name: true, email: true } } },
    });
    const recentInquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      take:    5,
      include: { product: { select: { name: true } }, vendor: { select: { companyName: true } } },
    });

    return success(res, {
      stats: { totalVendors, pendingKyc, approvedVendors, totalProducts, totalInquiries, newInquiries, totalUsers },
      recentVendors,
      recentInquiries,
    });
  } catch (err) { next(err); }
};

// GET /admin/vendors
const listVendors = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const where = {
      ...(status === 'pending'  && { kycStatus: 'PENDING', isApproved: false }),
      ...(status === 'approved' && { isApproved: true }),
      ...(status === 'rejected' && { kycStatus: 'REJECTED' }),
      ...(search && {
        OR: [
          { companyName: { contains: search } },
          { user: { email: { contains: search } } },
        ],
      }),
    };

    const [vendors, total] = await Promise.all([
      prisma.vendor.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take:    parseInt(limit),
        include: {
          user:    { select: { id: true, name: true, email: true, createdAt: true } },
          _count:  { select: { products: true, inquiries: true } },
        },
      }),
      prisma.vendor.count({ where }),
    ]);

    return success(res, vendors, '', 200, {
      page: parseInt(page), limit: parseInt(limit), total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) { next(err); }
};

// GET /admin/vendors/:id
const getVendor = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({
      where:   { id: req.params.id },
      include: {
        user:     { select: { id: true, name: true, email: true, createdAt: true } },
        products: { orderBy: { createdAt: 'desc' }, take: 10 },
        _count:   { select: { products: true, inquiries: true } },
      },
    });
    if (!vendor) return error(res, 'Vendor not found.', 404);
    return success(res, vendor);
  } catch (err) { next(err); }
};

// PATCH /admin/vendors/:id/approve
const approveVendor = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.update({
      where: { id: req.params.id },
      data:  { isApproved: true, kycStatus: 'VERIFIED' },
    });
    return success(res, vendor, 'Vendor approved successfully.');
  } catch (err) { next(err); }
};

// PATCH /admin/vendors/:id/reject
const rejectVendor = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const vendor = await prisma.vendor.update({
      where: { id: req.params.id },
      data:  { isApproved: false, kycStatus: 'REJECTED' },
    });
    return success(res, vendor, 'Vendor rejected.');
  } catch (err) { next(err); }
};

// DELETE /admin/vendors/:id
const deleteVendor = async (req, res, next) => {
  try {
    await prisma.vendor.delete({ where: { id: req.params.id } });
    return success(res, null, 'Vendor deleted.');
  } catch (err) { next(err); }
};

// GET /admin/products
const listProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const where = search ? { name: { contains: search } } : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take:    parseInt(limit),
        include: {
          vendor:   { select: { companyName: true } },
          category: { select: { name: true } },
          _count:   { select: { inquiries: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return success(res, products, '', 200, {
      page: parseInt(page), limit: parseInt(limit), total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) { next(err); }
};

// PATCH /admin/products/:id/feature
const toggleFeatureProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    if (!product) return error(res, 'Product not found.', 404);
    const updated = await prisma.product.update({
      where: { id: req.params.id },
      data:  { isFeatured: !product.isFeatured },
    });
    return success(res, updated, `Product ${updated.isFeatured ? 'featured' : 'unfeatured'}.`);
  } catch (err) { next(err); }
};

// GET /admin/inquiries
const listInquiries = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const where = status ? { status } : {};

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take:    parseInt(limit),
        include: {
          product: { select: { name: true, slug: true } },
          vendor:  { select: { companyName: true } },
        },
      }),
      prisma.inquiry.count({ where }),
    ]);

    return success(res, inquiries, '', 200, {
      page: parseInt(page), limit: parseInt(limit), total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) { next(err); }
};

// GET /admin/users
const listUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select:  { id: true, name: true, email: true, role: true, createdAt: true,
                 vendor: { select: { companyName: true, kycStatus: true } } },
    });
    return success(res, users);
  } catch (err) { next(err); }
};

module.exports = {
  getDashboardStats, listVendors, getVendor, approveVendor,
  rejectVendor, deleteVendor, listProducts, toggleFeatureProduct,
  listInquiries, listUsers,
};
