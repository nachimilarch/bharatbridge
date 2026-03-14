const router = require('express').Router();
const prisma = require('../config/database');
const { success } = require('../utils/apiResponse');
const { authenticate } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/rbac.middleware');
const { fetchAndStoreRates } = require('../jobs/currencySync.job');

// Public: Get latest rates
router.get('/rates', async (req, res, next) => {
  try {
    // Get latest unique rates (one per currency)
    const rawRates = await prisma.currencyRate.findMany({
      orderBy: { fetchedAt: 'desc' },
      distinct: ['currencyCode'],
      select: { currencyCode: true, currencyName: true, rateVsInr: true, fetchedAt: true },
    });

    // Convert to map: { USD: 0.012, EUR: 0.011, ... }
    const ratesMap = {};
    rawRates.forEach((r) => {
      ratesMap[r.currencyCode] = parseFloat(r.rateVsInr);
    });

    return success(res, { rates: ratesMap, updatedAt: rawRates[0]?.fetchedAt });
  } catch (err) {
    next(err);
  }
});

// Admin: Trigger manual sync
router.post('/sync', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    await fetchAndStoreRates();
    return success(res, null, 'Currency rates synced successfully');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
