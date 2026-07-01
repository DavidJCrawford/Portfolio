// Copy the brain Markdown into public/ so every note is served as a static file
// (e.g. /Portfolio/brain/site/concepts/product.md) and write a manifest the /brain
// page fetches at load to build the graph live. Wired into the build via an Astro
// integration in astro.config.mjs (so it runs however the build is invoked), and
// runnable directly (`npm run sync-brain`).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('../brains', import.meta.url));
const OUT = fileURLToPath(new URL('../public/brain', import.meta.url));

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(fp));
    else if (e.name.endsWith('.md')) out.push(fp);
  }
  return out;
}

export function syncBrain() {
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const files = walk(ROOT)
    .map((fp) => path.relative(ROOT, fp).split(path.sep).join('/'))
    .sort();
  for (const rel of files) {
    const dest = path.join(OUT, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(ROOT, rel.split('/').join(path.sep)), dest);
  }
  fs.writeFileSync(path.join(OUT, 'manifest.json'), JSON.stringify({ files }));
  return files.length;
}

// Run directly (CLI): node scripts/sync-brain.mjs
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const n = syncBrain();
  console.log(`sync-brain: ${n} markdown files → public/brain/ (+ manifest.json)`);
}
