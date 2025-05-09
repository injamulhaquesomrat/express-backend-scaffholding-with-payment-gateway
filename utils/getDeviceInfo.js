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
