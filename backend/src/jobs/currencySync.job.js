const cron = require('node-cron');
const axios = require('axios');
const prisma = require('../config/database');
const { config } = require('../config/env');

const fetchAndStoreRates = async () => {
  try {
    console.log('[CurrencySync] Fetching latest exchange rates...');
    const url = `${config.currency.apiUrl}/${config.currency.apiKey}/latest/INR`;
    const { data } = await axios.get(url, { timeout: 10000 });

    if (data.result !== 'success') {
      throw new Error(`API error: ${data['error-type']}`);
    }

    const rates = Object.entries(data.conversion_rates).map(([code, rate]) => ({
      currencyCode: code,
      rateVsInr: rate,
      fetchedAt: new Date(),
    }));

    await prisma.currencyRate.createMany({ data: rates });
    console.log(`[CurrencySync] ✅ Stored ${rates.length} rates at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('[CurrencySync] ❌ Failed:', err.message);
  }
};

const cleanupOldRates = async () => {
  try {
    const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
    const result = await prisma.currencyRate.deleteMany({ where: { fetchedAt: { lt: cutoff } } });
    console.log(`[Cleanup] Removed ${result.count} old currency rate records`);
  } catch (err) {
    console.error('[Cleanup] Failed:', err.message);
  }
};

const startCronJobs = () => {
  // Daily at 2:00 AM IST
  cron.schedule('0 2 * * *', fetchAndStoreRates, { timezone: 'Asia/Kolkata' });

  // Cleanup old rates: 1st of every month at 3 AM
  cron.schedule('0 3 1 * *', cleanupOldRates, { timezone: 'Asia/Kolkata' });

  console.log('⏰ Cron jobs started:');
  console.log('   - Currency sync: daily at 2:00 AM IST');
  console.log('   - Rate cleanup: monthly on the 1st at 3:00 AM IST');

  // Run once immediately on startup
  fetchAndStoreRates();
};

module.exports = { startCronJobs, fetchAndStoreRates };
