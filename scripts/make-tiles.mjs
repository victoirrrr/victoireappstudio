// Cuts the hero arc's square tiles from the owner's real screenshots.
// Input: src/data/hero-tiles.json. Output: src/assets/tiles/<id>.png (720px square).
// The build then converts these to AVIF/WebP like any other image.
import { readFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const { tiles } = JSON.parse(await readFile(new URL('src/data/hero-tiles.json', root), 'utf8'));
const out = new URL('src/assets/tiles/', root);
await mkdir(out, { recursive: true });

for (const t of tiles.filter((t) => t.type === 'crop')) {
  const [left, top, size] = t.box;
  const src = new URL(`src/assets/apps/${t.app}/${t.src}`, root).pathname;
  const meta = await sharp(src).metadata();
  if (left + size > meta.width || top + size > meta.height) {
    throw new Error(`${t.id}: box ${t.box} is outside ${meta.width}x${meta.height}`);
  }
  await sharp(src)
    .extract({ left, top, width: size, height: size })
    .resize(720, 720)
    .png({ compressionLevel: 9 })
    .toFile(new URL(`${t.id}.png`, out).pathname);
  console.log(`tile ${t.id}`);
}
