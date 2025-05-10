/**
 * Middleware to generate a unique request ID for each incoming request.
 *
 * This middleware uses the `uuid` library to generate a version 4 UUID and attaches it
 * to the `req` object as `req.id`. It also sets the generated UUID as the value of the
 * `X-Request-Id` response header, allowing the request to be tracked across systems.
 *
 * @module utils/requestId
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 */
const { v4: uuidv4 } = require("uuid");

module.exports = (req, res, next) => {
  req.id = uuidv4();
  res.setHeader("X-Request-Id", req.id);
  next();
};
