const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

/**
 * User Schema for MongoDB using Mongoose.
 * This schema defines the structure of the User document, including fields for
 * name, email, password, role, reset token, and reset token expiration.
 * It also includes middleware and instance methods for password hashing,
 * password comparison, and generating a password reset token.
 */

/**
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The email of the user. Must be unique.
 * @property {string} password - The hashed password of the user.
 * @property {string} role - The role of the user. Can be 'user' or 'admin'. Defaults to 'user'.
 * @property {string} resetToken - The hashed reset token for password recovery.
 * @property {Date} resetTokenExpire - The expiration time of the reset token.
 */

/**
 * Middleware that hashes the user's password before saving it to the database.
 * This middleware only runs if the password field has been modified.
 *
 * @function preSave
 * @param {Function} next - Callback to proceed to the next middleware.
 * @returns {void}
 */

/**
 * Compares a candidate password with the user's hashed password.
 *
 * @function comparePassword
 * @param {string} candidatePassword - The password to compare.
 * @returns {Promise<boolean>} - Resolves to true if the passwords match, otherwise false.
 */

/**
 * Generates a password reset token and sets the resetToken and resetTokenExpire fields.
 * The token is hashed and stored in the database, while the plain token is returned.
 *
 * @function getResetPasswordToken
 * @returns {string} - The plain reset token.
 */

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["user", "admin"], default: "user" },
  resetToken: String,
  resetTokenExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetToken = crypto.createHash("sha256").update(token).digest("hex");
  this.resetTokenExpire = Date.now() + 10 * 60 * 1000;
  return token;
};

module.exports = mongoose.model("User", userSchema);
