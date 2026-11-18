// Share images (PRD 10/11): public/og/home.png and public/og/<slug>.png for each app page on this
// site, 1200x630. Each is a small HTML card in the site's own fonts and colours with the real app
// icons, captured with the taste-skill's headless screenshot script. Also writes the PNG favicons
// from public/favicon.svg. Run: npm run og (after npm run tiles / breakouts if those changed).
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';

const root = new URL('../', import.meta.url).pathname;
const out = `${root}public/og/`;
const tmp = `${root}scripts/og-build/`;
await mkdir(out, { recursive: true });
await mkdir(tmp, { recursive: true });

const apps = readdirSync(`${root}src/data/apps`)
  .filter((f) => f.endsWith('.json'))
  .map((f) => JSON.parse(String(execFileSync('cat', [`${root}src/data/apps/${f}`]))))
  .sort((a, b) => a.order - b.order);

const fonts = `
<link rel="stylesheet" href="../../node_modules/@fontsource-variable/newsreader/opsz.css">
<link rel="stylesheet" href="../../node_modules/@fontsource-variable/hanken-grotesk/wght.css">`;
const css = `
*{margin:0;box-sizing:border-box}
html,body{width:1200px;height:630px;overflow:hidden}
body{background:#F3F3F5;color:#11121A;font-family:'Hanken Grotesk Variable',system-ui,sans-serif;display:grid;grid-template-columns:1fr 420px;align-items:center;padding:0 80px;gap:40px}
.mark{font-weight:700;font-size:30px;letter-spacing:-.02em}
h1{font-family:'Newsreader Variable',Georgia,serif;font-weight:400;letter-spacing:-.015em;font-size:76px;line-height:1.02;margin:28px 0 22px}
p{font-size:24px;color:#5C5E6A;max-width:30ch;line-height:1.4}
.dot{display:inline-block;width:10px;height:10px;border-radius:50%;background:#E5322D;margin-left:6px;vertical-align:middle}
.art{position:relative;height:460px}
.ic{position:absolute;width:150px;height:150px;border-radius:34px;box-shadow:0 30px 50px -24px rgba(14,16,32,.45);object-fit:cover}
.big{width:300px;height:300px;border-radius:66px;left:60px;top:80px}
`;
const icon = (slug) => `../../src/assets/apps/${slug}/icon.png`;

async function shot(name, html) {
  const file = `${tmp}${name}.html`;
  await writeFile(file, html);
  execFileSync('node', [
    `${root}.claude/skills/design-taste-frontend/scripts/shoot.mjs`,
    '--url', file, '--w', '1200', '--h', '630', '--no-tiles', '--wait', '900',
    '--out', `${out}${name}.png`, '--profile', `${root}.taste-skill/chrome-og`,
  ], { stdio: 'inherit' });
}

// Home: the headline beside a small arc of the real icons
const withIcons = apps.filter((a) => a.icon);
const spots = [[40, 150, -14], [160, 40, -5], [290, 60, 6], [250, 220, 12], [110, 290, -8]];
await shot('home', `<!doctype html><meta charset="utf-8">${fonts}<style>${css}</style>
<div><div class="mark">victoir<span class="dot"></span></div>
<h1>Apps that stay quiet until they help.</h1>
<p>iOS apps by Vijay Kumar: ${withIcons.map((a) => a.name).join(', ')}.</p></div>
<div class="art">${withIcons.slice(0, spots.length).map((a, i) => `<img class="ic" src="${icon(a.slug)}" style="left:${spots[i][0]}px;top:${spots[i][1]}px;transform:rotate(${spots[i][2]}deg)">`).join('')}</div>`);

// One per app page on this site
for (const a of apps.filter((x) => x.siteUrl === `/${x.slug}` && x.icon)) {
  await shot(a.slug, `<!doctype html><meta charset="utf-8">${fonts}<style>${css}</style>
<div><div class="mark">victoir<span class="dot"></span></div>
<h1>${a.name}, ${a.kind ?? 'an iOS app'}</h1>
<p>${a.oneLiner}</p></div>
<div class="art"><img class="ic big" src="${icon(a.slug)}"></div>`);
}

// Favicons from the SVG
const svg = await readFile(`${root}public/favicon.svg`);
await sharp(svg).resize(32, 32).png().toFile(`${root}public/favicon.png`);
await sharp(svg).resize(180, 180).flatten({ background: '#11121A' }).png().toFile(`${root}public/apple-touch-icon.png`);

await rm(tmp, { recursive: true, force: true });
console.log('og images and favicons written');
