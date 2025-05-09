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
