// Minimal Express server to serve the pre-compiled static site produced by `npm run build`.
import express from 'express';
import helmet from 'helmet';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');

const app = express();
const port = process.env.PORT || 3000;

/**
 * Compute CSP sha256-<hash> sources for every inline, non-JSON-LD <script>
 * block across all built HTML pages. This lets the CSP allow exactly the
 * scripts we actually ship — no 'unsafe-inline', no manual hash to keep in
 * sync by hand (it's recomputed from the real built files every time the
 * server starts).
 */
function getInlineScriptHashes() {
  if (!fs.existsSync(distDir)) return [];

  const htmlFiles = fs.readdirSync(distDir).filter((file) => file.endsWith('.html'));
  const scriptRegex = /<script(?![^>]*\ssrc=)(?![^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi;
  const hashes = new Set();

  for (const file of htmlFiles) {
    const html = fs.readFileSync(path.join(distDir, file), 'utf8');
    let match;
    while ((match = scriptRegex.exec(html))) {
      const body = match[1];
      if (!body.trim()) continue;
      const hash = crypto.createHash('sha256').update(body, 'utf8').digest('base64');
      hashes.add(`'sha256-${hash}'`);
    }
  }

  return [...hashes];
}

const inlineScriptHashes = getInlineScriptHashes();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", ...inlineScriptHashes],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'none'"],
        frameAncestors: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    // This is a static informational site with no cross-origin embedding
    // use case, so a strict same-origin policy is safe here.
    crossOriginEmbedderPolicy: false
  })
);

app.use(
  express.static(distDir, {
    extensions: ['html'],
    index: 'index.html',
    setHeaders(res, filePath) {
      // Hashed, content-addressed build assets (dist/assets/*) never
      // change contents under the same filename, so they can be cached
      // for a long time. The HTML entry point itself is not hashed and
      // must always be revalidated.
      if (filePath.includes(`${path.sep}assets${path.sep}`)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  })
);

// Single-page site: any unmatched route falls back to the compiled index.
app.use((req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log(`Site running at http://localhost:${port}`);
});
