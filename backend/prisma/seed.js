const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Admin
  const adminHash = await bcrypt.hash('Admin@1234', 12);
  const admin = await prisma.user.upsert({
    where:  { email: 'admin@bharatbridge.com' },
    update: {},
    create: {
      name:         'BharatBridge Admin',
      email:        'admin@bharatbridge.com',
      passwordHash: adminHash,               // ← passwordHash
      role:         'admin',
    },
  });
  console.log('✅ Admin:', admin.email);

  // Demo vendor
  const vendorHash = await bcrypt.hash('Demo@1234', 12);
  const vendor = await prisma.user.upsert({
    where:  { email: 'vendor@bharatbridge.com' },
    update: {},
    create: {
      name:         'Raj Kumar',
      email:        'vendor@bharatbridge.com',
      passwordHash: vendorHash,              // ← passwordHash
      role:         'vendor',
      vendor: {
        create: {
          companyName: 'Raj Exports Pvt. Ltd.',
          description: 'Premium Indian spice exporter since 1995.',
          city:        'Mumbai',
          state:       'Maharashtra',
          country:     'India',
          iecCode:     'ABCDE1234F',
          gstin:       '27ABCDE1234F1Z5',
          kycStatus:   'VERIFIED',
          isApproved:  true,
        },
      },
    },
  });
  console.log('✅ Vendor:', vendor.email);

  console.log('\n🎉 Done!');
  console.log('   admin@bharatbridge.com  / Admin@1234');
  console.log('   vendor@bharatbridge.com / Demo@1234');
}

main().catch(console.error).finally(() => prisma.$disconnect());
