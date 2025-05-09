const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const getDeviceInfo = require("../utils/getDeviceInfo");
const userActivity = require("../models/userActivity");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const device = getDeviceInfo(req.headers["user-agent"] || "");
    await UserActivity.create({
      userId: user._id,
      action: "Login",
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      device,
    });

    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message: `Reset your password here: ${resetUrl}`,
    });
    res.json({ message: "Email sent" });
  } catch (err) {
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();
    res.status(500).json({ message: "Email could not be sent" });
  }
};
