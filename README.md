# Accessible by Design

A single-page personal site offering front-end accessibility consultancy
services. Static site built with Vite, Handlebars (for templating/partials),
SCSS and vanilla JS, served via Express once compiled.

## Stack

- **Vite** — dev server + build
- **Handlebars** (`vite-plugin-handlebars`) — partials/templating, compiled to
  static HTML at build time
- **SCSS** — styling (dark blue/light themes, yellowish-white text)
- **Vanilla JS** — progressive enhancement only (mobile nav toggle, theme
  toggle, scroll parallax, footer year)
- **Express** — serves the pre-compiled `dist/` output for deployment

## Edit your content

All copy (name, years of experience, services, laws, contact info) lives in
one place: `vite.config.js` → `siteData`. Update it and rebuild.

## Scripts

```bash
npm install

# Development with hot reload
npm run watch      # alias for `npm run dev`
npm run dev

# Production build (outputs a precompiled static site to dist/)
npm run build

# Preview the production build locally via Vite
npm run preview

# Build + serve the compiled site with Express (deployment entrypoint)
npm run deploy

# Serve an already-built dist/ with Express
npm start
```

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Skip link to main content
- Visible focus indicators (`:focus-visible`)
- `prefers-reduced-motion` respected
- Keyboard-operable navigation menu with `aria-expanded`/`aria-controls`
- Colour palette checked for WCAG AA/AAA contrast (both the dark and light
  theme)

## Automated accessibility testing

Five complementary checks, each catching a different class of bug — no
single tool covers everything:

| Command                 | Tool                                   | Catches                                                                 |
| ------------------------ | --------------------------------------- | ------------------------------------------------------------------------ |
| `npm run test:contrast`  | Custom script reading `_theme.scss`     | Real contrast ratios for every theme colour pairing (closes the gap axe leaves as "needs review" because of the background photo) |
| `npm run test:html`      | `html-validate`                         | Invalid markup/ARIA that indirectly causes a11y bugs                     |
| `npm run test:a11y`      | `pa11y-ci` (axe-core + HTML_CodeSniffer) | WCAG 2.2 AA violations, across dark theme, light theme, and the mobile nav |
| `npm run test:keyboard`  | Puppeteer script (`test/keyboard-nav.test.cjs`) | Things static scanners can't catch: tab order, focus visibility, and real mouse/keyboard interaction — this is what would have caught the `pointer-events: none` hero-button bug |
| `npm run test:lighthouse`| Lighthouse CI                           | A second, independent audit engine + an accessibility score              |

Run everything with:

```bash
npm test
```

Each of these builds the site first, so they always test the real compiled
`dist/` output, not just the source.

