const { error } = require('../utils/apiResponse');

/**
 * Role-based access control middleware.
 * Usage: authorize('admin') or authorize('admin', 'vendor')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, 'Authentication required.', 401);
    }

    if (!roles.includes(req.user.role)) {
      return error(
        res,
        `Access denied. Required role: ${roles.join(' or ')}. Your role: ${req.user.role}`,
        403
      );
    }

    next();
  };
};

module.exports = { authorize };
