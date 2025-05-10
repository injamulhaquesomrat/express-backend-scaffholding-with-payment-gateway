/**
 * Extracts device information from a user agent string.
 *
 * @param {string} userAgent - The user agent string to parse.
 * @returns {Object} An object containing device information.
 * @returns {string} [return.browser] - The name of the browser (e.g., Chrome, Firefox, etc.) or "Unknown" if not detected.
 * @returns {string} [return.version] - The version of the browser or "Unknown" if not detected.
 * @returns {string} [return.os] - The name of the operating system (e.g., Windows, macOS, etc.) or "Unknown" if not detected.
 * @returns {string} [return.platform] - The type of device platform (e.g., mobile, tablet, desktop) or "desktop" if not detected.
 */

const parser = require("ua-parser-js");

const getDeviceInfo = (userAgent) => {
  const ua = parser(userAgent);
  return {
    browser: ua.browser.name || "Unknown",
    version: ua.browser.version || "Unknown",
    os: ua.os.name || "Unknown",
    platform: ua.device.type || "desktop",
  };
};

module.exports = getDeviceInfo;
