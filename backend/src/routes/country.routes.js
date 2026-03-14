const router = require('express').Router();
const prisma = require('../config/database');
const { success } = require('../utils/apiResponse');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');

router.get('/', async (req, res, next) => {
  try {
    const countries = await prisma.country.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    return success(res, countries);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { name, isoCode, currency, flagEmoji } = req.body;
    const country = await prisma.country.create({ data: { name, isoCode, currency, flagEmoji } });
    return success(res, country, 'Country added', 201);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id/toggle', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const country = await prisma.country.findUnique({ where: { id: parseInt(req.params.id) } });
    const updated = await prisma.country.update({
      where: { id: parseInt(req.params.id) },
      data: { isActive: !country.isActive },
    });
    return success(res, updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
