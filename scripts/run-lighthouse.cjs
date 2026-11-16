// Resolves the Chromium binary Puppeteer already downloaded (since no
// system Chrome/Chromium is reliably available in every environment this
// runs in) and runs `lhci autorun` with it, so Lighthouse doesn't need its
// own separate browser install.

const { spawnSync } = require('child_process');
const path = require('path');
const puppeteer = require('puppeteer');

async function main() {
  const chromePath = await puppeteer.executablePath();

  const result = spawnSync(
    'npx',
    ['lhci', 'autorun', '--config=./lighthouserc.cjs'],
    {
      stdio: 'inherit',
      env: { ...process.env, CHROME_PATH: chromePath },
      cwd: path.join(__dirname, '..'),
    }
  );

  process.exit(result.status ?? 1);
}

main();
