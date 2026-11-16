// Minimal Express server to serve the pre-compiled static site produced by `npm run build`.
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

const app = express();
const port = process.env.PORT || 3000;

app.use(
  express.static(distDir, {
    extensions: ['html'],
    index: 'index.html'
  })
);

// Single-page site: any unmatched route falls back to the compiled index.
app.use((req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`Site running at http://localhost:${port}`);
});
