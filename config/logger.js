/**
 * Logger configuration using Winston library.
 * 
 * This module sets up a Winston logger with the following features:
 * - Logs messages with a default level of "info".
 * - Formats logs to include timestamps and outputs them in JSON format.
 * - Writes error-level logs to "logs/error.log".
 * - Writes all logs to "logs/combined.log".
 * - Provides a writable stream interface for integrating with other logging systems (e.g., HTTP request logging).
 * 
 * @module logger
 * @requires winston
 * 
 * @property {Object} logger.stream - A writable stream interface for logging.
 * @property {Function} logger.stream.write - Writes a log message to the logger.
 * 
 * @example
 * const logger = require('./config/logger');
 * logger.info('This is an info message');
 * logger.error('This is an error message');
 * 
 * @example
 * // Using the logger stream with morgan for HTTP request logging
 * const morgan = require('morgan');
 * app.use(morgan('combined', { stream: logger.stream }));
 */
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

logger.stream = {
  write: function (message) {
    logger.info(message.trim());
  },
};

module.exports = logger;
