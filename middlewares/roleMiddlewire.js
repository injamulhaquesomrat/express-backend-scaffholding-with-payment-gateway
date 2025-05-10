/**
 * Middleware to restrict access based on user roles.
 *
 * @param {...string} roles - The roles that are allowed to access the route.
 * @returns {Function} Middleware function to check user role.
 *
 * @example
 * // Allow only 'admin' and 'editor' roles
 * app.use('/admin', roleMiddleware('admin', 'editor'));
 *
 * @throws {Error} Responds with a 403 Forbidden status if the user's role is not allowed.
 */

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
