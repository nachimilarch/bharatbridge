// src/services/product.service.js
const prisma = require('../config/database');
const slugify = require('../utils/slugify');

const createProduct = async (vendorUserId, data, files) => {
  const vendor = await prisma.vendor.findUnique({ where: { userId: vendorUserId } });
  if (!vendor?.isApproved) throw new Error('Vendor not approved yet');

  const slug = await generateUniqueSlug(data.name);

  const product = await prisma.product.create({
    data: {
      vendorId: vendor.id,
      categoryId: parseInt(data.categoryId),
      name: data.name,
      slug,
      description: data.description,
      specifications: data.specifications ? JSON.parse(data.specifications) : null,
      basePriceInr: parseFloat(data.basePriceInr),
      minOrderQty: parseInt(data.minOrderQty) || 1,
      unit: data.unit || 'piece',
      hsCode: data.hsCode,
      images: {
        create: files.map((file, i) => ({
          url: `/uploads/products/${file.filename}`,
          isPrimary: i === 0,
          sortOrder: i,
        }))
      },
      productCountries: data.countryIds
        ? { create: data.countryIds.map(id => ({ countryId: parseInt(id) })) }
        : undefined
    },
    include: { images: true, productCountries: { include: { country: true } } }
  });
  return product;
};

const generateUniqueSlug = async (name) => {
  let slug = slugify(name);
  let count = 0;
  while (await prisma.product.findUnique({ where: { slug: count ? `${slug}-${count}` : slug } })) {
    count++;
  }
  return count ? `${slug}-${count}` : slug;
};

// Public: List products with pagination and filters
const listProducts = async ({ page = 1, limit = 24, category, search, country }) => {
  const where = {
    isPublished: true,
    deletedAt: null,
    ...(category && { category: { slug: category } }),
    ...(search && { OR: [{ name: { contains: search } }, { description: { contains: search } }] }),
    ...(country && { productCountries: { some: { country: { isoCode: country } } } })
  };
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true,
        vendor: { select: { companyName: true } }
      }
    }),
    prisma.product.count({ where })
  ]);
  return { products, total, page: Number(page), totalPages: Math.ceil(total / limit) };
};

module.exports = { createProduct, listProducts };
