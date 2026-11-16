const { join } = require('path');

/** @type {import('puppeteer').Configuration} */
module.exports = {
  // Keep Chromium downloads inside the project, and stop Puppeteer's config
  // loader from searching upward through parent directories (which can hit
  // permission errors in sandboxed environments).
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
