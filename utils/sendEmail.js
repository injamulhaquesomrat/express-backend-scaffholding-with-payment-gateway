/**
 * Sends an email using the Nodemailer library.
 *
 * @async
 * @function sendEmail
 * @param {Object} options - The email options.
 * @param {string} options.email - The recipient's email address.
 * @param {string} options.subject - The subject of the email.
 * @param {string} options.message - The plain text message to be sent in the email.
 * @returns {Promise<void>} Resolves when the email is successfully sent.
 *
 * @throws {Error} Throws an error if the email fails to send.
 *
 * @requires nodemailer
 * @requires process.env.EMAIL_USER - The email address used for authentication.
 * @requires process.env.EMAIL_PASS - The password for the email address used for authentication.
 */
const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "noreply@example.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
