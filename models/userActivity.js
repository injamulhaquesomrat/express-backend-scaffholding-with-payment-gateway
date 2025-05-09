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
