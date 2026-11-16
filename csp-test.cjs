const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();

  const cspViolations = [];
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('requestfailed', (req) => {
    if (req.failure()) consoleErrors.push(`Request failed: ${req.url()} — ${req.failure().errorText}`);
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });

  // Confirm the theme-init script actually ran (it sets data-theme from
  // localStorage; set a value, reload, and check it was applied).
  await page.evaluate(() => localStorage.setItem('a11y-site-theme', 'light'));
  await page.reload({ waitUntil: 'networkidle0' });
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

  console.log('data-theme after reload with stored "light":', theme);
  console.log('console errors / CSP violations:', consoleErrors.length ? consoleErrors : 'none');

  await browser.close();
  if (theme !== 'light' || consoleErrors.length > 0) process.exitCode = 1;
})();
