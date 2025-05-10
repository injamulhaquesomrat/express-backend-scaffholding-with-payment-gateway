const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const getDeviceInfo = require("../utils/getDeviceInfo");
const userActivity = require("../models/userActivity");
const messages = require("../messages/en");

/**
 * Handles user signup by creating a new user and generating a token.
 *
 * @async
 * @function signup
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing user details.
 * @param {string} req.body.name - The name of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with the generated token or an error message.
 */
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);

  try {
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Handles user signin by authenticating the user and generating a token.
 *
 * @async
 * @function signin
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing login credentials.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} req.headers - The request headers.
 * @param {string} [req.headers.user-agent] - The user-agent string of the client.
 * @param {Object} res - Express response object.
 * @returns {void} Sends a JSON response with the token, user details, or an error message.
 */
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ message: messages.auth.invalidCredentials });
    }

    const device = getDeviceInfo(req.headers["user-agent"] || "");
    await userActivity.create({
      userId: user._id,
      action: "Login",
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      device,
    });

    const token = generateToken(user._id);
    res.status(200).json({
      message: messages.auth.loginSuccess,
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

/**
 * Handles the forgot password functionality by generating a reset token
 * and sending a password reset email to the user.
 *
 * @async
 * @function forgotPassword
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The request body containing the user's email.
 * @param {string} req.body.email - The email of the user requesting password reset.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {void} Sends a JSON response indicating success or failure of the email sending process.
 */
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: messages?.user?.notFound });

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
