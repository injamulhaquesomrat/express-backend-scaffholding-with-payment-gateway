/**
 * Middleware for paginating results from a Mongoose model.
 *
 * @param {Object} model - The Mongoose model to query.
 * @returns {Function} Express middleware function.
 *
 * @description
 * This middleware extracts pagination parameters (`page` and `limit`) from the request query,
 * calculates the appropriate skip and limit values, and queries the provided Mongoose model
 * for paginated results. It also calculates the total number of documents and total pages.
 * The paginated results are attached to the `res.paginatedResults` object.
 *
 * @example
 * // Usage in an Express route
 * const paginationMiddleware = require('./middlewares/paginationMiddleware');
 * const User = require('./models/User');
 * app.get('/users', paginationMiddleware(User), (req, res) => {
 *   res.json(res.paginatedResults);
 * });
 *
 * @throws {Error} Passes any errors encountered during the database query to the next middleware.
 *
 * @property {number} req.query.page - The current page number (default: 1).
 * @property {number} req.query.limit - The number of items per page (default: 10).
 * @property {Object} res.paginatedResults - The paginated results object.
 * @property {number} res.paginatedResults.total - The total number of documents.
 * @property {number} res.paginatedResults.page - The current page number.
 * @property {number} res.paginatedResults.totalPages - The total number of pages.
 * @property {Array} res.paginatedResults.data - The array of paginated documents.
 */

module.exports = (model) => async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const results = await model.find().skip(skip).limit(limit);
    const total = await model.countDocuments();
    res.paginatedResults = {
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: results,
    };
    next();
  } catch (err) {
    next(err);
  }
};
