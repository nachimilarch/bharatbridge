const jwt    = require('jsonwebtoken');
const prisma = require('../config/database');
const { config } = require('../config/env');
const { error }  = require('../utils/apiResponse');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return error(res, 'No token provided. Please log in.', 401);
    }

    const token   = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwt.secret);

    // Never select passwordHash
    const user = await prisma.user.findUnique({
      where:  { id: decoded.id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) return error(res, 'User no longer exists.', 401);

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return error(res, 'Session expired. Please log in again.', 401);
    if (err.name === 'JsonWebTokenError')  return error(res, 'Invalid token. Please log in again.',  401);
    next(err);
  }
};

module.exports = { authenticate };
