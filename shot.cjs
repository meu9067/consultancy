const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/privacy.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/home/meu9067/.cache/opencode/tmp/opencode/privacy.png' });
  await page.goto('http://localhost:3000/accessibility-statement.html', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '/home/meu9067/.cache/opencode/tmp/opencode/a11y-statement.png' });
  await browser.close();
})();
