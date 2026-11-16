// Keyboard-only navigation smoke test.
//
// Static scanners like axe/pa11y never press a key or click a mouse button,
// so they cannot catch bugs like an element being present, visible, and
// correctly labelled, but still unusable (e.g. `pointer-events: none`
// accidentally applied to an entire section — exactly the bug this test
// is designed to catch a regression of).

const puppeteer = require('puppeteer');
const assert = require('assert');

const URL = process.env.TEST_URL || 'http://localhost:3000/';

async function main() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(URL, { waitUntil: 'networkidle0' });

  const failures = [];
  const check = (condition, message) => {
    if (!condition) failures.push(message);
  };

  // 1. Tab through the whole page, recording what gets focused.
  const focusLog = [];
  for (let i = 0; i < 40; i += 1) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        tag: el.tagName,
        text: (el.textContent || '').trim().slice(0, 40),
        href: el.getAttribute('href'),
        id: el.id,
        visible: rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden',
        pointerEvents: style.pointerEvents,
      };
    });
    if (!info) break;
    focusLog.push(info);
  }

  check(focusLog.length > 0, 'Tab key never focused anything on the page.');

  // 2. The skip link must be the very first stop, and must be visible once focused.
  check(
    focusLog[0] && focusLog[0].href === '#main-content',
    `Expected the skip link to be focused first, got: ${JSON.stringify(focusLog[0])}`
  );
  check(focusLog[0] && focusLog[0].visible, 'Skip link is not visible once focused.');

  // 3. Every focusable element must actually be interactable (not display:none'd
  //    or accidentally made unclickable via pointer-events: none).
  for (const el of focusLog) {
    check(el.visible, `Focused element is not visible: ${JSON.stringify(el)}`);
    check(
      el.pointerEvents !== 'none',
      `Focused element has pointer-events: none (would be unusable with a mouse): ${JSON.stringify(el)}`
    );
  }

  // 4. The two hero buttons must be reachable by keyboard at all — this is the
  //    specific bug class we're regression-testing.
  const heroHrefs = focusLog.map((el) => el.href).filter(Boolean);
  check(heroHrefs.includes('#contact'), 'Hero "Get in touch" button was not reachable by keyboard.');
  check(heroHrefs.includes('#services'), 'Hero "See services" button was not reachable by keyboard.');

  // 5. Activating the skip link with the keyboard must move focus to main content.
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  const hashAfterSkip = await page.evaluate(() => window.location.hash);
  check(hashAfterSkip === '#main-content', `Skip link did not move focus/hash to #main-content (got "${hashAfterSkip}").`);

  // 6. Mouse clicks on every focusable link/button must actually work (not
  //    just be keyboard-focusable) — this is what directly caught the
  //    pointer-events bug, since that bug didn't affect keyboard activation.
  await page.goto(URL, { waitUntil: 'networkidle0' });
  const clickTargets = [
    { selector: '.hero__actions a.button--primary', expectedHash: '#contact' },
    { selector: '.hero__actions a.button--ghost', expectedHash: '#services' },
  ];
  for (const target of clickTargets) {
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.click(target.selector);
    await new Promise((resolve) => setTimeout(resolve, 150));
    const hash = await page.evaluate(() => window.location.hash);
    check(
      hash === target.expectedHash,
      `Mouse click on "${target.selector}" did not navigate to ${target.expectedHash} (got "${hash}").`
    );
  }

  // 7. The theme toggle must be operable by keyboard (Enter) as well as mouse.
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await page.focus('#theme-toggle');
  await page.keyboard.press('Enter');
  const themeAfterToggle = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  check(themeAfterToggle === 'light', `Theme toggle did not switch to light theme via keyboard (got "${themeAfterToggle}").`);

  await browser.close();

  console.log(`Keyboard/interaction audit: tabbed through ${focusLog.length} focusable elements.\n`);
  focusLog.forEach((el, i) => {
    console.log(`  ${i + 1}. <${el.tag.toLowerCase()}> "${el.text}" ${el.href ? `(${el.href})` : ''}`);
  });
  console.log('');

  if (failures.length > 0) {
    console.error(`${failures.length} failure(s):\n`);
    failures.forEach((f) => console.error(` - ${f}`));
    process.exitCode = 1;
  } else {
    console.log('All keyboard/interaction checks passed.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
