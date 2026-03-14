const router = require('express').Router();
const prisma = require('../config/database');
const { success, error } = require('../utils/apiResponse');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');
const slugify = require('../utils/slugify');

router.get('/', async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true, parentId: null },
      include: { children: { where: { isActive: true } } },
      orderBy: { sortOrder: 'asc' },
    });
    return success(res, categories);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { name, description, iconUrl, parentId, sortOrder } = req.body;
    const slug = slugify(name);
    const category = await prisma.category.create({
      data: { name, slug, description, iconUrl, parentId: parentId ? parseInt(parentId) : null, sortOrder: sortOrder || 0 },
    });
    return success(res, category, 'Category created', 201);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { name, description, iconUrl, parentId, sortOrder, isActive } = req.body;
    const data = { description, iconUrl, sortOrder, isActive };
    if (name) { data.name = name; data.slug = slugify(name); }
    if (parentId !== undefined) data.parentId = parentId ? parseInt(parentId) : null;

    const category = await prisma.category.update({ where: { id: parseInt(req.params.id) }, data });
    return success(res, category, 'Category updated');
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    await prisma.category.update({ where: { id: parseInt(req.params.id) }, data: { isActive: false } });
    return success(res, null, 'Category deactivated');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
