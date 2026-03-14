const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new (require('../config/database').constructor)
  ? require('../config/database')
  : new PrismaClient();
const { config } = require('../config/env');

// ── Import Prisma enums directly from generated client ────────
// This guarantees correct enum values regardless of what they are
const { KycStatus, Role } = require('@prisma/client');

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn || '7d',
  });
  const refreshToken = jwt.sign(
    payload,
    config.jwt.refreshSecret || config.jwt.secret,
    { expiresIn: config.jwt.refreshExpiresIn || '30d' }
  );
  return { accessToken, refreshToken };
};

const register = async ({ name, email, password, role = 'vendor' }) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error('An account with this email already exists.');
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // ── Detect actual enum values from Prisma client ──────────
  // KycStatus enum — use whatever your schema defines
  const kycPendingValue   = KycStatus?.pending    || KycStatus?.PENDING    || 'pending';
  const vendorRoleValue   = Role?.vendor          || Role?.VENDOR          || 'vendor';

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: vendorRoleValue,
      vendor: role === 'vendor' ? {
        create: {
          companyName: `${name}'s Company`,
          kycStatus:   kycPendingValue,   // ← uses actual enum value from schema
          isApproved:  false,
        },
      } : undefined,
    },
    select: {
      id:        true,
      name:      true,
      email:     true,
      role:      true,
      createdAt: true,
      vendor: {
        select: {
          id:          true,
          companyName: true,
          kycStatus:   true,
          isApproved:  true,
        },
      },
    },
  });

  const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });
  return { user, ...tokens };
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
    // ── MUST select passwordHash explicitly ──────────────────
    select: {
      id:           true,
      name:         true,
      email:        true,
      passwordHash: true,   // ← critical — without this bcrypt.compare fails
      role:         true,
      isActive:     true,
      vendor: {
        select: {
          id:          true,
          companyName: true,
          kycStatus:   true,
          isApproved:  true,
          logoUrl:     true,
        },
      },
    },
  });

  if (!user) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  // Strip passwordHash before sending to client
  const { passwordHash: _, ...safeUser } = user;
  const tokens = generateTokens({ id: user.id, email: user.email, role: user.role });
  return { user: safeUser, ...tokens };
};

const refreshTokens = (refreshToken) => {
  try {
    const secret  = config.jwt.refreshSecret || config.jwt.secret;
    const decoded = jwt.verify(refreshToken, secret);
    return generateTokens({ id: decoded.id, email: decoded.email, role: decoded.role });
  } catch {
    const err = new Error('Invalid or expired refresh token.');
    err.statusCode = 401;
    throw err;
  }
};

module.exports = { register, login, refreshTokens, generateTokens };
