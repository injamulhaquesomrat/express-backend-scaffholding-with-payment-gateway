/**
 * Mongoose schema for tracking user activities.
 * 
 * This schema is used to log user actions along with metadata such as IP address,
 * user agent, and device information. Each activity is associated with a specific user.
 * 
 * @module models/userActivity
 * 
 * @requires mongoose
 */

const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: String,
  ip: String,
  userAgent: String,
  device: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserActivity", userActivitySchema);
