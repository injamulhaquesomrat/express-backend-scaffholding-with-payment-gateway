/**
 * Middleware to log HTTP request details including method, URL, IP address, 
 * user agent, and device information.
 *
 * @module middlewares/loggerMiddleware
 * @requires ../config/logger
 * @requires ../utils/getDeviceInfo
 *
 * @param {Object} req - Express request object.
 * @param {Object} req.headers - Headers of the incoming request.
 * @param {string} [req.headers.user-agent] - User agent string from the request headers.
 * @param {string} req.method - HTTP method of the request (e.g., GET, POST).
 * @param {string} req.originalUrl - Original URL of the request.
 * @param {string} req.ip - IP address of the client making the request.
 * @param {Object} res - Express response object.
 * @param {Function} next - Callback function to pass control to the next middleware.
 */
const logger = require("../config/logger");
const getDeviceInfo = require("../utils/getDeviceInfo");

const loggerMiddleware = (req, res, next) => {
  const deviceInfo = getDeviceInfo(req.headers["user-agent"] || "");
  logger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    device: deviceInfo,
  });
  next();
};

module.exports = loggerMiddleware;
