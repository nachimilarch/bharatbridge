const authService = require('../services/auth.service');
const prisma = require('../config/database');
const { success, error } = require('../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    return success(res, user, 'Registration successful. Please complete your vendor profile.', 201);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    return success(res, result, 'Login successful');
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return error(res, 'Refresh token required', 400);
    const tokens = authService.refreshTokens(refreshToken);
    return success(res, tokens, 'Tokens refreshed');
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        vendor: {
          select: {
            id: true,
            companyName: true,
            kycStatus: true,
            isApproved: true,
            logoUrl: true,
          },
        },
      },
    });
    if (!user) return error(res, 'User not found', 404);
    return success(res, user);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh, me };
