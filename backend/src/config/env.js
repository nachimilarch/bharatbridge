require('dotenv').config();

const REQUIRED_VARS = [
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  'JWT_EXPIRES_IN',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'ADMIN_EMAIL',
  'CURRENCY_API_KEY',
];

const validateEnv = () => {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach((key) => console.error(`   - ${key}`));
    console.error('\nPlease copy .env.example to .env and fill in all values.');
    process.exit(1);
  }

  if (process.env.JWT_SECRET.length < 32) {
    console.error('❌ JWT_SECRET must be at least 32 characters long.');
    process.exit(1);
  }

  console.log('✅ Environment variables validated');
};

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 5000,
  host: process.env.HOST || '0.0.0.0',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  db: {
    url: process.env.DATABASE_URL,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.EMAIL_FROM || `"BharatBridge" <${process.env.SMTP_USER}>`,
    adminEmail: process.env.ADMIN_EMAIL,
  },

  currency: {
    apiKey: process.env.CURRENCY_API_KEY,
    apiUrl: process.env.CURRENCY_API_URL || 'https://v6.exchangerate-api.com/v6',
  },

  upload: {
    path: process.env.UPLOAD_PATH || './uploads',
    maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB) || 5,
    allowedImageTypes: (
      process.env.ALLOWED_IMAGE_TYPES || 'image/jpeg,image/png,image/webp'
    ).split(','),
    allowedDocTypes: (
      process.env.ALLOWED_DOC_TYPES || 'application/pdf,image/jpeg,image/png'
    ).split(','),
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  },
};

module.exports = { validateEnv, config };
