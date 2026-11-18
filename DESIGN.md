# DESIGN.md: victoir app studio (victoirappstudio.com)

Status: LOCKED (approved by owner, 18 Nov 2026)

Source: PRD.md v1.0, sections 7 to 9. If this file and the PRD disagree, this file wins after LOCKED.
Scope: iOS app studio only. No CV, consulting or career content.

## Primary reference

- **Primary (drives layout and mood):** `references/ref-2-hero-arc.png`. Light airy canvas, serif display headline, half-ring of rounded image tiles, one dark pill CTA.
- **Lends card anatomy only:** `references/ref-1-cards.png`. Tall rounded card, image fading into a sampled tint, title + status pill, 2-line body, chips, full-width white pill.
- **Lends the shelf only:** `references/ref-3-app-shelf.png`. Rounded panel, tabs, coverflow row where the focused card grows, one object breaking out of its card, detail strip below.
- Not taken from the references: fake window dots, star ratings, review counts, prices as numbers, the three-column feature row under the hero, any purple or multicolour gradients.

## Colour (hex, with roles)

Site chrome (neutral, quiet; the apps supply the colour):

| Token | Hex | Role |
|---|---|---|
| canvas | #F3F3F5 | Page background |
| surface | #FFFFFF | Shelf panel (at 72% opacity), white pills |
| ink | #11121A | Headlines, body, dark pill fill |
| ink-2 | #5C5E6A | Secondary text (contrast 5.6:1 on canvas) |
| line | #E3E3E9 | 1px rules and borders |
| crimson | #E5322D | The studio thread. Small marks only: active-tab dot, focus ring, status dot, link underline on hover. Never a large fill, never body text |
| crimson-text | #C42620 | Crimson when used as small text (passes 4.5:1 on canvas) |

App palettes (sampled from the real icons and screens; each app card is made in its own colours):

| App | bg | tint (card fade) | accent | ink |
|---|---|---|---|---|
| Kwesti | #0C0A0E | #1A1418 | #FF4A38 | #ECE6DA |
| Morb | #000000 | #1C0A12 | #FF4046 | #FFFFFF |
| Kit | #1E1E2E | #1E1E2E | #E8352B (companion), #F09A3E (button) | #FFFFFF |
| Kit Pouch | #0F0E0D | #1A0F0D | #E8483C | #FFFFFF |
| GLP-1 (placeholder) | #2A0F12 | #2A0F12 | #E5322D | #FFFFFF |

Rules:
- Tints are re-sampled from the real image's lower edge at build time; the values above are the fallback.
- Any tint under white text must keep 4.5:1. If a sample is too light, darken it until it passes.
- Banned: purple or indigo as a primary, purple-to-blue gradients, gradient text, neon glow, cream background with sage or forest green. Kit's night-sky indigo only ever appears inside Kit's own screenshots, never as site chrome.
- Dark mode for the site is out of scope for v1. The canvas stays light.

## Typography (families, scale, weights, line heights)

- **Display (hero headline, H2):** Newsreader, optical size Display, weight 400, tracking -1.5%. Self-hosted WOFF2, `font-display: swap`. Not Instrument Serif, not Fraunces.
- **UI and body:** `-apple-system, "SF Pro Text", "Hanken Grotesk", system-ui, sans-serif`. Hanken Grotesk is self-hosted as the non-Apple fallback. Weights 400, 600, 700. Not Inter, not Geist.
- **Wordmark:** `victoir` in Hanken Grotesk 700, lowercase, tracking -2%.

Scale at 1440 (size / line height):

| Style | Desktop | Mobile (390) | Weight | Family |
|---|---|---|---|---|
| Hero | 76 / 1.02 | 44 / 1.05 | 400 | Display |
| H2 | 48 / 1.08 | 34 / 1.1 | 400 | Display |
| H3 | 24 / 1.2 | 22 / 1.2 | 600 | Sans |
| Body | 17 / 1.5 | 16 / 1.5 | 400 | Sans |
| Card title | 22 / 1.2 | 22 / 1.2 | 600 | Sans |
| Card body | 15 / 1.45 | 15 / 1.45 | 400 | Sans |
| Pill, chip | 13 / 1.4 | 13 / 1.4 | 600 | Sans |
| Small | 13 / 1.4 | 13 / 1.4 | 400 | Sans |

Rules: headline max 2 lines, `text-wrap: balance`. Body line length 60 to 70 characters. Fluid sizing with `clamp()` between the two columns. No em dashes in any copy.

## Spacing and grid

- Base unit 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 72, 120.
- Section padding: 120px vertical desktop, 72px mobile.
- Content max width 1200px, centred, equal left and right edges. Page gutter 24px (mobile 16px).
- Each home section is one or two screens tall at 1440x900. No section taller than two screens.
- Grid: 12 columns, 24px gap at desktop; 4 columns, 16px gap at mobile.
- Breakpoints: 1440 (design), 1024, 768, 390.
- Radius scale: tiles 28, cards 32, panel 40, shelf cards 44, pills 999.
- Shadows:
  - card: `0 40px 80px -30px rgba(14,16,32,.35)`
  - tile: `0 20px 40px -20px rgba(0,0,0,.25)`
  - panel: `0 30px 80px -40px rgba(14,16,32,.18)`

## Components (buttons, links, cards, nav)

**Nav**
- Left: `victoir` wordmark. Right: `Apps`, `Kit family`, `Support`. No CTA button in the nav.
- Transparent over the hero. After 40px of scroll: canvas fill plus a 1px `line` bottom border.
- Mobile: the same three links in a simple sheet. No hamburger animation.

**Primary button (dark pill)**
- ink fill, white 15px/600, 48px tall, 24px horizontal padding, arrow icon on the right. Hover: arrow moves 3px right. Focus: 2px crimson ring, 2px offset.

**White pill (on tinted cards only)**
- white fill, ink text 16px/600, 48px tall, full card width minus 16px edges.

**App Store button rules**
- Use only the official black "Download on the App Store" SVG from Apple Marketing Tools, unmodified: no recolour, crop, rotate or animation. Clear space around it at least one quarter of its height. Minimum height 40px.
- Exactly one badge per layout. On the home page it lives in the shelf detail strip only.
- Everywhere else, a live app uses a text pill labelled "View on the App Store" (white or ink pill, never styled like the badge).
- Unlaunched apps show "Coming soon" as plain text, no badge, no disabled badge.
- Links carry `?pt=<provider token>&ct=vas-<section>` once the provider token exists. Open in the same tab with `rel="noopener"`.

**App card (ref 1)**
- 300 x 470 at 1440 (ratio about 0.64), radius 32.
- Top 55%: image, `object-fit: cover`. Bottom 45%: gradient from transparent to the app tint, solid tint under the text.
- Title 22/600 white. Status pill top right of the title row: 13/600, black at 40% fill, white text, radius 999.
- Body 15/1.45, white at 72%, 2 lines max. Chips: 13/600, white at 14% fill, radius 999, padding 8x12, max 2 on cards (3 in spotlights).
- White pill button, 48px tall, 16px from the card edges. Hover: lift 2px, image scale 1.02.
- Pagination dots only on cards that cycle screenshots.

**Shelf (ref 3)**
- One large rounded panel: radius 40, white at 72% over the canvas, 1px `line` border, panel shadow, inset from the page edges. No window dots.
- Header tabs `All apps` / `Kit family`. Selected tab: ink text with a 6px crimson dot beneath.
- Shelf cards: 220 x 260 default, 300 x 340 focused, radius 44. The focused card is slightly organic (taller right edge) via an SVG mask. Colour field is the app's palette with a soft radial highlight.
- Each shelf card: name lockup (the app's own display style where it has one, else Hanken Grotesk 700), meta row (`Free · Music`), status pill (`Free`, `Soon`, `2027`).
- Break-out object rises out of the focused card's top edge: Kwesti polaroid, Morb glossy M, Kit companion, Kit Pouch red 0. Transparent PNG, rendered as a cut-out with no outline.
- Detail strip below: icon 56px, name, facts line (`Free · Health & Fitness · 4+ · v3.0`), one-liner, App Store badge (or "Coming soon").
- Interaction: click, swipe, arrow keys or tab change the focus. Detail strip crossfades 200ms. Touch uses snap scroll. Deep links `/#kwesti`, `/#morb`, `/#kit`.

**Tiles (ref 2)**
- Square, radius 28, inner 1px white border at 30%, tile shadow. About 180px at 1440, rotated to follow the arc.

**Chips and status pills**
- Chip: white at 14% fill on tinted cards, `line` border on the canvas. Status pill: black at 40% on cards, ink on canvas with white text.
- Status words: `Live`, `Soon`, `In the works`, `2027`. Pills never carry ratings or counts.

**Links**
- Text links ink with a 1px underline in `line`; hover turns the underline crimson. Footer links ink-2.

**Kit family group**
- Always rendered as one group titled "The Kit family", three ref-1 cards side by side (Kit, Kit Pouch, GLP-1). Kit Pouch with no screenshots: icon centred on a tinted field. GLP-1: blurred crimson field with a plain pill shape, pill "2027", button disabled.
- Each family card links to the others through a small "Also in the family" row on the app pages.

**Adding a new app**
1. Add `src/data/apps/<slug>.json` with: `name, slug, order, status, appStoreUrl, appStoreId, subtitle, oneLiner, description, chips[], category, price, palette{bg,tint,accent,ink}, icon, screens[], breakout, family, siteUrl, privacyUrl, supportUrl`.
2. Drop `icon.png` and `screens/` into `src/assets/apps/<slug>/` (under `src/` so the build converts them to AVIF/WebP; raw PNGs never ship). Optional `breakout.png`. List the screen file names in the JSON `screens` array.
3. Set `family: "kit"` to join the Kit family row; leave empty to stand alone.
4. Nothing else. The hero tiles, chips strip, shelf, spotlight (if `status: live`) and family row all render from the data. If the 5th app has no screenshots it uses the Kit Pouch placeholder treatment.

## Motion

- Duration 200 to 600ms. Easing `cubic-bezier(.2,.7,.2,1)`. Animate only `transform` and `opacity`.
- Hero: tiles fan in from the centre on load (stagger 40ms, 600ms each). On scroll the ring rotates up to 8 degrees and drifts up slightly.
- Shelf: focus change scales the card over 400ms; detail strip crossfade 200ms.
- Cards: hover lift 2px over 200ms. Buttons: arrow nudge 3px over 200ms.
- Nav: background change at 40px scroll, 200ms.
- `prefers-reduced-motion`: static ring, no scale or crossfade, instant state changes.
- Banned: parallax tricks beyond the ring, scroll-jacking, looping decorative animation, glow pulses, bounce easing.

## Imagery rules

- Only the owner's real files: `src/assets/apps/<app>/icon.png` and `screens/*`. No stock photos, no AI-generated people, no fake product shots.
- Hero tiles and spotlight tiles are crops of real screenshots and icons. Never invent a screen.
- Break-out cut-outs are transparent PNGs about 1200px, exported from Xcode assets or design files. Stopgap: cut from the icons.
- Kit Pouch has no screenshots yet. Treatment: icon on its tinted field, status pill "In the works". Replace when 3 real screens exist.
- Convert every PNG to AVIF and WebP at 1x and 2x at build. Raw screenshots (about 33 MB) never ship. Home page weight under 1.5 MB.
- Every image has alt text describing what it shows. Decorative tiles use `alt=""`.
- Licensed photographs are not planned. If one is ever used, add the credits line to the footer.
- No ratings, review counts, download numbers, testimonials or press logos until they are real and visible on the App Store.

## Signature element (the one thing someone remembers)

**The arc of real app tiles in the hero:** a half-ring of 9 to 11 rotated rounded tiles cut from the owner's own screenshots and icons, framing the headline and clipped by the bottom of the first screen. The shelf's break-out object is a supporting detail and must stay smaller in visual weight than the arc. Nothing else on the page competes with it.

## Anti-references (what this must NOT look like)

- A generic SaaS landing page, or a centred hero followed by three feature cards.
- Glassmorphism dashboards, Dribbble shots with fake ratings, star rows or "1.5K reviews" blocks.
- Default shadcn or Tailwind look, any UI kit.
- Purple or indigo primary, purple-to-blue gradients, gradient heading text, neon glow, emoji as icons.
- The 2026 house style: cream background, Instrument Serif or Fraunces display, sage or forest green.
- Inter or Geist as the default font.
- Copy with buzzwords (stunning, seamless, cutting-edge, leverage, unlock, revolutionary), exclamation marks or em dashes.
- A career or consulting portfolio. This site is only about the apps.
