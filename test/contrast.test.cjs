// Automated contrast audit, run directly against the real theme source
// (src/scss/_theme.scss) so it can never drift from what's actually shipped.
//
// This exists specifically to cover the gap axe-core/pa11y can't: axe marks
// every element as "needs review" instead of pass/fail when a
// background-image sits anywhere in the ancestor chain (our full-page
// .page-bg), because it can't be certain what's actually behind the text.
// This script computes real contrast ratios directly from the theme's
// colour tokens and asserts WCAG thresholds, closing that gap.

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const THEME_PATH = path.join(__dirname, '..', 'src', 'scss', '_theme.scss');

function hexToRgb(hex) {
  const n = hex.replace('#', '');
  const bigint = parseInt(n, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function parseThemeBlock(source) {
  const colors = {};
  const propRegex = /--([\w-]+):\s*([^;]+);/g;
  let match;
  while ((match = propRegex.exec(source))) {
    const [, name, rawValue] = match;
    const value = rawValue.trim();
    if (/^#[0-9a-f]{3,8}$/i.test(value)) {
      colors[name] = hexToRgb(value);
    } else if (/^\d+\s*,\s*\d+\s*,\s*\d+$/.test(value)) {
      colors[name] = value.split(',').map((n) => parseInt(n.trim(), 10));
    }
  }
  return colors;
}

function loadThemes() {
  const source = fs.readFileSync(THEME_PATH, 'utf8');
  const lightMarker = source.indexOf("[data-theme='light']");
  assert(lightMarker !== -1, 'Could not find the light theme block in _theme.scss');

  const darkSource = source.slice(0, lightMarker);
  const lightSource = source.slice(lightMarker);

  return {
    dark: parseThemeBlock(darkSource),
    light: parseThemeBlock(lightSource),
  };
}

function relativeLuminance([r, g, b]) {
  const channel = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [rl, gl, bl] = [channel(r), channel(g), channel(b)];
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

function contrastRatio(a, b) {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbKey(prefix) {
  return `color-${prefix}-rgb`;
}

const themes = loadThemes();

/** @type {{theme: string, label: string, fg: number[], bg: number[], min: number}[]} */
const pairs = [];

for (const [themeName, colors] of Object.entries(themes)) {
  const text = colors[rgbKey('text')];
  const textMuted = colors[rgbKey('text-muted')];
  const bg = colors[rgbKey('bg')];
  const bgAlt = colors[rgbKey('bg-alt')];
  const bgElevated = colors[rgbKey('bg-elevated')];
  const accent = colors['color-accent'];
  const accentDark = colors['color-accent-dark'];
  const focus = colors['color-focus'];

  pairs.push(
    { theme: themeName, label: 'body text on page background', fg: text, bg, min: 4.5 },
    { theme: themeName, label: 'headings on page background', fg: text, bg, min: 4.5 },
    { theme: themeName, label: 'muted text on alt panel (about/services)', fg: textMuted, bg: bgAlt, min: 4.5 },
    { theme: themeName, label: 'muted text on elevated card', fg: textMuted, bg: bgElevated, min: 4.5 },
    { theme: themeName, label: 'body text on alt panel', fg: text, bg: bgAlt, min: 4.5 },
    { theme: themeName, label: 'body text on elevated card', fg: text, bg: bgElevated, min: 4.5 },
    { theme: themeName, label: 'accent links/headings on page background', fg: accent, bg, min: 4.5 },
    { theme: themeName, label: 'accent on alt panel', fg: accent, bg: bgAlt, min: 4.5 },
    { theme: themeName, label: 'primary button text on accent background', fg: bg, bg: accent, min: 4.5 },
    { theme: themeName, label: 'primary button hover text on accent-dark background', fg: bg, bg: accentDark, min: 4.5 },
    { theme: themeName, label: 'focus outline on page background (non-text, 3:1)', fg: focus, bg, min: 3 }
  );
}

let failures = 0;

console.log('Contrast audit (WCAG 2.2 AA thresholds)\n');

for (const pair of pairs) {
  const ratio = contrastRatio(pair.fg, pair.bg);
  const pass = ratio >= pair.min;
  if (!pass) failures += 1;
  const status = pass ? 'PASS' : 'FAIL';
  console.log(
    `[${status}] (${pair.theme}) ${pair.label}: ${ratio.toFixed(2)}:1 (needs ${pair.min}:1)`
  );
}

console.log('');

if (failures > 0) {
  console.error(`${failures} contrast pairing(s) failed WCAG 2.2 AA.`);
  process.exitCode = 1;
} else {
  console.log(`All ${pairs.length} contrast pairings pass.`);
}
