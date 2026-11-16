// Vanilla JS: progressive enhancement only — the page works without this file.

function initNavToggle() {
  const toggle = document.querySelector('.site-nav__toggle');
  const list = document.querySelector('.site-nav__list');

  if (!toggle || !list) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    list.setAttribute('data-open', String(open));
  };

  setOpen(false);

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isOpen);
  });

  // Close the menu after a link is activated (mobile) and return focus sensibly.
  list.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setOpen(false);
    }
  });

  // Close on Escape for keyboard users.
  list.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      toggle.focus();
    }
  });
}

const THEME_STORAGE_KEY = 'a11y-site-theme';

function applyTheme(theme, toggle) {
  document.documentElement.setAttribute('data-theme', theme);

  if (!toggle) return;

  const isLight = theme === 'light';
  toggle.setAttribute('aria-pressed', String(isLight));

  const icon = toggle.querySelector('.theme-toggle__icon');
  const label = toggle.querySelector('.theme-toggle__label');

  if (icon) icon.textContent = isLight ? '☀️' : '🌙';
  if (label) label.textContent = isLight ? 'Light mode' : 'Dark mode';
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  const current = document.documentElement.getAttribute('data-theme') || stored || 'dark';
  applyTheme(current, toggle);

  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next, toggle);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private browsing, disabled cookies) — fail silently.
    }
  });
}

function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function initBackgroundParallax() {
  const bg = document.querySelector('.page-bg');
  if (!bg) return;

  const bufferPx = 120; // keep in sync with $parallax-buffer in _variables.scss

  // CSS alone can't size this to the full page (percentage heights against
  // an auto-height body don't resolve), so measure the real document
  // height in JS and keep it in sync as content/layout changes.
  const resizePageBg = () => {
    const fullHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight);
    bg.style.height = `${fullHeight + bufferPx}px`;
  };

  resizePageBg();
  window.addEventListener('resize', resizePageBg);

  if ('ResizeObserver' in window) {
    new ResizeObserver(resizePageBg).observe(document.body);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const maxShiftPx = bufferPx / 2 - 5; // stay safely within the buffer so no edge is ever exposed
  const scrollDivisor = 6; // higher = slower, more subtle movement
  let ticking = false;

  const updateShift = () => {
    const shift = Math.min(window.scrollY / scrollDivisor, maxShiftPx);
    document.documentElement.style.setProperty('--hero-scroll-shift', `${shift}px`);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateShift);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateShift();
}

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initThemeToggle();
  initFooterYear();
  initBackgroundParallax();
});
