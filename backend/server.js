require('dotenv').config();
const app = require('./src/app');
const { startCronJobs } = require('./src/jobs/currencySync.job');
const { validateEnv } = require('./src/config/env');

// Validate all required environment variables at startup
validateEnv();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Bharath Bridge API running on http://${HOST}:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV}`);
  console.log(`   API Base: http://${HOST}:${PORT}/api/v1`);

  // Start background cron jobs
  startCronJobs();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

module.exports = server;
