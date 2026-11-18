// Post-build: delete raw originals that Astro copied into dist/_astro but no page uses.
// src/lib/apps.ts imports every PNG so any app can use any screen; Astro then copies
// each original even when only its AVIF/WebP versions are referenced. PRD 10: the raw
// screenshots (~33 MB) must never ship.
import { readdir, readFile, rm, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const assets = join(dist, '_astro');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const all = await walk(dist);
const textFiles = all.filter((f) => ['.html', '.css', '.js', '.xml', '.json', '.webmanifest'].includes(extname(f)));
let corpus = '';
for (const f of textFiles) corpus += await readFile(f, 'utf8');

let removed = 0;
let bytes = 0;
for (const f of await readdir(assets)) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  if (corpus.includes(f)) continue;
  const p = join(assets, f);
  bytes += (await stat(p)).size;
  await rm(p);
  removed++;
}
console.log(`[prune-originals] removed ${removed} unreferenced originals (${(bytes / 1e6).toFixed(1)} MB)`);
