/**
 * Creates a new user in the database.
 *
 * @async
 * @function createUser
 * @param {string} name - The name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password for the user.
 * @returns {Promise<Object>} The created user object.
 */

/**
 * Finds a user in the database by their email address.
 *
 * @async
 * @function findUserByEmail
 * @param {string} email - The email address of the user to find.
 * @returns {Promise<Object|null>} The user object if found, or null if not found.
 */
const User = require("../models/User");

exports.createUser = async (name, email, password) => {
  return await User.create({ name, email, password });
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
