const prisma  = require('../config/database');
const slugify = require('slugify');
const fs      = require('fs');
const path    = require('path');
const { success, error } = require('../utils/apiResponse');

// ── GET /products ─────────────────────────────────────────────
const listProducts = async (req, res, next) => {
  try {
    const {
      page = 1, limit = 24, search, category,
      featured, sort = 'newest', vendorId,
    } = req.query;

    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const where = { isPublished: true };

    if (search)   where.name        = { contains: search };
    if (featured) where.isFeatured  = true;
    if (vendorId) where.vendorId    = vendorId;
    if (category) {
      where.category = { slug: category };
    }

    const orderBy =
      sort === 'newest'      ? { createdAt: 'desc' }  :
      sort === 'oldest'      ? { createdAt: 'asc'  }  :
      sort === 'price_asc'   ? { basePriceInr: 'asc'  } :
      sort === 'price_desc'  ? { basePriceInr: 'desc' } :
      { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: parseInt(limit),
        include: {
          category: { select: { id: true, name: true, slug: true } },
          vendor:   { select: { id: true, companyName: true, isApproved: true, kycStatus: true, city: true } },
        },
      }),
      prisma.product.count({ where }),
    ]);

    return success(res, { products, total }, '', 200, {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) { next(err); }
};

// ── GET /products/:slug ───────────────────────────────────────
const getProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [
          { slug: req.params.slug },
          { id:   req.params.slug },
        ],
        isPublished: true,
      },
      include: {
        category:    { select: { id: true, name: true, slug: true } },
        vendor:      { select: { id: true, companyName: true, isApproved: true, kycStatus: true, city: true, state: true, contactPhone: true, website: true, logoUrl: true } },
      },
    });

    if (!product) return error(res, 'Product not found.', 404);
    return success(res, product);
  } catch (err) { next(err); }
};

// ── POST /products ────────────────────────────────────────────
const createProduct = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    if (!vendor)            return error(res, 'Vendor profile not found.',           404);
    if (!vendor.isApproved) return error(res, 'Your account is pending KYC approval.', 403);

    const {
      name, description, categoryId,
      basePriceInr, minOrderQty, unit,
      exportCountries, specifications,
    } = req.body;

    if (!name) return error(res, 'Product name is required.', 400);

    // Generate unique slug
    let slug = slugify(name, { lower: true, strict: true });
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        basePriceInr:    basePriceInr ? parseFloat(basePriceInr) : null,
        minOrderQty:     minOrderQty  ? parseInt(minOrderQty)    : 1,
        unit:            unit         || 'KG',
        exportCountries: exportCountries || [],
        specifications:  specifications  || {},
        isPublished:        true,
        isFeatured:      false,
        vendorId:        vendor.id,
        categoryId:      categoryId || null,
        // Handle uploaded images
        images: req.files?.length ? {
          create: req.files.map((f, i) => ({
            url:   `/uploads/products/${f.filename}`,
            order: i,
          })),
        } : undefined,
      },
      include: {
        images:   true,
        category: { select: { name: true, slug: true } },
        vendor:   { select: { companyName: true } },
      },
    });

    return success(res, product, 'Product created successfully.', 201);
  } catch (err) { next(err); }
};

// ── PUT /products/:id ─────────────────────────────────────────
const updateProduct = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    const product = await prisma.product.findFirst({
      where: { id: req.params.id, vendorId: vendor?.id },
    });
    if (!product) return error(res, 'Product not found or access denied.', 404);

    const {
      name, description, categoryId,
      basePriceInr, minOrderQty, unit,
      exportCountries, specifications, isPublished,
    } = req.body;

    const updateData = {};
    if (name !== undefined)            updateData.name            = name;
    if (description !== undefined)     updateData.description     = description;
    if (categoryId !== undefined)      updateData.categoryId      = categoryId;
    if (basePriceInr !== undefined)    updateData.basePriceInr    = parseFloat(basePriceInr);
    if (minOrderQty !== undefined)     updateData.minOrderQty     = parseInt(minOrderQty);
    if (unit !== undefined)            updateData.unit            = unit;
    if (exportCountries !== undefined) updateData.exportCountries = exportCountries;
    if (specifications !== undefined)  updateData.specifications  = specifications;
    if (isPublished !== undefined)        updateData.isPublished        = Boolean(isPublished);

    // Re-slug if name changed
    if (name && name !== product.name) {
      let slug = slugify(name, { lower: true, strict: true });
      const existing = await prisma.product.findFirst({ where: { slug, NOT: { id: product.id } } });
      if (existing) slug = `${slug}-${Date.now()}`;
      updateData.slug = slug;
    }

    const updated = await prisma.product.update({
      where:   { id: req.params.id },
      data:    updateData,
      include: { images: true, category: { select: { name: true } } },
    });

    return success(res, updated, 'Product updated.');
  } catch (err) { next(err); }
};

// ── DELETE /products/:id ──────────────────────────────────────
const deleteProduct = async (req, res, next) => {
  try {
    const vendor = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    const product = await prisma.product.findFirst({
      where:   { id: req.params.id, vendorId: vendor?.id },
      include: { images: true },
    });
    if (!product) return error(res, 'Product not found or access denied.', 404);

    // Delete image files from disk
    product.images.forEach((img) => {
      const filePath = path.join(__dirname, '../../', img.url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

    await prisma.product.delete({ where: { id: req.params.id } });
    return success(res, null, 'Product deleted.');
  } catch (err) { next(err); }
};

// ── POST /products/:id/images ─────────────────────────────────
const uploadProductImages = async (req, res, next) => {
  try {
    if (!req.files?.length) return error(res, 'No images uploaded.', 400);

    const vendor  = await prisma.vendor.findUnique({ where: { userId: req.user.id } });
    const product = await prisma.product.findFirst({
      where: { id: req.params.id, vendorId: vendor?.id },
    });
    if (!product) return error(res, 'Product not found.', 404);

    const images = await Promise.all(
      req.files.map((f, i) =>
        prisma.productImage.create({
          data: { url: `/uploads/products/${f.filename}`, productId: product.id, order: i },
        })
      )
    );

    return success(res, images, 'Images uploaded.');
  } catch (err) { next(err); }
};

// ── DELETE /products/:id/images/:imageId ──────────────────────
const deleteProductImage = async (req, res, next) => {
  try {
    const image = await prisma.productImage.findUnique({ where: { id: req.params.imageId } });
    if (!image) return error(res, 'Image not found.', 404);

    const filePath = path.join(__dirname, '../../', image.url);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await prisma.productImage.delete({ where: { id: req.params.imageId } });
    return success(res, null, 'Image deleted.');
  } catch (err) { next(err); }
};

// ── PATCH /products/:id/feature (admin) ───────────────────────
const toggleFeature = async (req, res, next) => {
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

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  deleteProductImage,
  toggleFeature,
};
