// STOPGAP break-out cut-outs for the shelf (PRD 10: "Claude cuts them from icons as a stopgap").
// Replace any of these with a real transparent export: drop src/assets/apps/<slug>/breakout.png in place.
// Each recipe crops a region of one of the owner's own files and keys out its plain background.
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const p = (rel) => new URL(rel, root).pathname;
const clamp = (v) => Math.max(0, Math.min(1, v));

async function cut({ src, box, alpha, unmatte, fill, out }) {
  let img = sharp(p(src));
  if (box) img = img.extract({ left: box[0], top: box[1], width: box[2], height: box[3] });
  const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const a = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) a[i] = alpha(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
  if (fill) fill(a, w, h);
  for (let i = 0; i < w * h; i++) {
    const k = i * 4;
    if (unmatte && a[i] > 0) for (let c = 0; c < 3; c++) data[k + c] = Math.round(Math.max(0, Math.min(255, unmatte(data[k + c], a[i]))));
    data[k + 3] = Math.round(a[i] * 255);
  }
  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 })
    .resize({ width: 900, height: 900, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(p(out));
  console.log(`breakout ${out}`);
}

// Morb: the glossy M from its icon, white keyed out.
await cut({
  src: 'src/assets/apps/morb/icon.png',
  alpha: (r, g, b) => clamp((255 - Math.min(r, g, b)) / 70),
  unmatte: (c, a) => (c - (1 - a) * 255) / a,
  out: 'src/assets/apps/morb/breakout.png',
});

// Kit Pouch: the red 0 from its icon, near-black keyed out.
await cut({
  src: 'src/assets/apps/kit-pouch/icon.png',
  alpha: (r, g, b) => clamp((Math.max(r, g, b) - 24) / 50),
  unmatte: (c, a) => c / a,
  out: 'src/assets/apps/kit-pouch/breakout.png',
});

// Only background that touches the image edge is removed; enclosed low-alpha pixels
// (the companion's eyes and its white highlight) are holes and get filled back in.
function fillHoles(a, w, h) {
  const bg = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    const i = y * w + x;
    if (!bg[i] && a[i] < 0.5) { bg[i] = 1; stack.push(i); }
  };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const i = stack.pop(), x = i % w, y = (i / w) | 0;
    if (x > 0) push(x - 1, y); if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1); if (y < h - 1) push(x, y + 1);
  }
  for (let i = 0; i < w * h; i++) if (!bg[i] && a[i] < 0.5) a[i] = 1;
}

// Kit: the red companion from the Today screen, midnight keyed out by redness.
await cut({
  src: 'src/assets/apps/kit/screens/2-today.png',
  box: [370, 740, 570, 560],
  alpha: (r, g, b) => clamp((r - Math.max(g, b) - 40) / 60),
  fill: fillHoles,
  out: 'src/assets/apps/kit/breakout.png',
});

// Kwesti: the polaroid print from the scrapbook screen (a rectangle, so it needs no keying).
await cut({
  src: 'src/assets/apps/kwesti/screens/04_scrapbook.png',
  box: [262, 1176, 434, 432],
  alpha: () => 1,
  out: 'src/assets/apps/kwesti/breakout.png',
});
