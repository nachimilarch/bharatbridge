const { PrismaClient } = require('@prisma/client');

// Prevent multiple instances in development (hot reload)
const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'info', 'warn', 'error']
    : ['warn', 'error'],
  errorFormat: 'pretty',
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Test connection on startup
prisma.$connect()
  .then(() => console.log('✅ Database connected via Prisma'))
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });

// Graceful disconnect
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
