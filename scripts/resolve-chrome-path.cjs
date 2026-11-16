const puppeteer = require('puppeteer');

puppeteer
  .executablePath()
  .then((p) => process.stdout.write(p))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
