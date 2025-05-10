/**
 * Error-handling middleware for Express applications.
 *
 * This middleware captures any errors that occur during the request-response cycle
 * and sends a JSON response with a status code of 500 (Internal Server Error).
 * It also logs the error stack trace to the console for debugging purposes.
 *
 * @param {Error} err - The error object representing the issue that occurred.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function in the stack.
 */

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Server Error" });
};
