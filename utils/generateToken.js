/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 *
 * @param {string} userId - The unique identifier of the user for whom the token is being generated.
 * @returns {string} A signed JWT token with the user ID payload and a 7-day expiration.
 */

const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
module.exports = generateToken;
