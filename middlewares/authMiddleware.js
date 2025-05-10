/**
 * Middleware to protect routes by verifying the JWT token.
 * 
 * @async
 * @function protect
 * @param {Object} req - Express request object.
 * @param {Object} req.headers - The headers of the request.
 * @param {string} [req.headers.authorization] - The authorization header containing the Bearer token.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {Error} Returns a 401 status with a message if the token is missing or invalid.
 * 
 * @description
 * This middleware checks for a JWT token in the `Authorization` header of the request.
 * If the token is valid, it decodes the token, retrieves the user from the database,
 * and attaches the user object to the `req` object. If the token is missing or invalid,
 * it responds with a 401 status and an appropriate error message.
 */
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = protect;
