# DESIGN.md: Victoir App Studio (victoirappstudio.com)

Status: v2, owner direction of 22 and 23 Nov 2026. Replaces v1 (hero arc, Newsreader, shelf, Kit family).

Scope: the studio's iOS apps only. No CV, consulting or career content.

## Structure reference

- **Structural reference:** truetapp.com (an indie iOS studio site). We take its section order and layout ideas only, never its copy, pictures, colours or code.
- **The taste-skill gate:** on 23 Nov 2026 the owner tried the gate's stricter layout, then chose this bouncy version ("Go back to bouncy").
  The gate's rules on tilt, scroll entrances, loops, marquees, alternating splits and screen heights do not apply to this site.
- Home, top to bottom:
  1. **Nav:** the logo left; Apps, Studio, Contact right. Transparent at the top, frosted canvas and a 1px line after 40px.
  2. **Hero, split:** eyebrow, headline with a crimson second half, a short first-person line, a dark pill and a ghost pill, and three facts.
     On the right, the two live apps' App Store screenshots, tilted and overlapping, with their icons and one blank "coming soon" tile floating round them.
  3. **Ticker:** a tilted crimson band looping each live app and its tag, then "More apps · Coming soon". It pauses on hover.
  4. **Apps (dark):** an H2 counting the apps out and on the way.
     - Right: a numbered tab list, live apps first, then blank "Coming soon" rows.
     - Left: the picked app's screenshot, then its number and category, name, one-liner, App Store link and own site.
  5. **Featured app, one per live app:** the screenshot on a slowly turning record-style disc, and beside it the icon, eyebrow, headline, paragraph, three numbered rows and the official App Store badge. Sides alternate.
  6. **Studio:** the light logo on a dark tile, a first-person note, and three facts.
  7. **Contact:** a crimson gradient panel with the email.
  8. **Footer (dark):** the light logo and a line, then Apps, Help and Studio columns, then © and the Apple service-mark line.

## App roster rules

- Live apps, in this order: **Kwesti (01), Morb (02).** Kit joins as a main app when it ships.
- **Unlaunched apps are anonymous.** Kit, Kit Pouch and GLP-1 show only as blank tiles (the logo's star on a dark squircle) labelled "Coming soon".
  No name, icon, screenshot or description of them appears anywhere on the public site, its sitemap or its footer.
  Their privacy and support pages stay at their URLs for App Store review, unlinked.
- The coming-soon count comes from the data: every app that is not live is one blank slot.

## Colour

| Token | Hex | Role |
|---|---|---|
| canvas | #F6F5F6 | Page background |
| canvas-2 | #EEECEE | Studio band |
| surface | #FFFFFF | Ghost pill, cards |
| ink | #1D1519 | Text, dark pill (sampled from the logo's wordmark) |
| ink-2 | #4A4246 | Secondary text (7:1 or more on both light grounds) |
| line / line-strong | #E4E0E3 / #C9C1C6 | Rules |
| night / night-2 / night-line | #110D10 / #1B1519 / #2C2429 | Dark sections |
| night-ink / night-ink-2 | #F6F2F4 / #A99FA5 | Text on dark |
| crimson | #E2453F | Logo ribbon, light end: ticker, contact panel, cursor ring, dots |
| crimson-deep | #A61E2E | Logo ribbon, dark end: the contact gradient |
| crimson-text | #C42620 | Crimson as text on light |
| crimson-night | #FF6B5E | Crimson as text on dark |

Banned: purple or indigo, purple-to-blue gradients, gradient text, neon glow, cream with sage.

## Type

- **One family: Apple's SF Pro, through the system stack.**
  `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", Roboto, Arial, sans-serif`.
  Apple's licence does not allow hosting SF on the web, so Apple devices show SF and others their system sans.
- Mono for eyebrows, numbers and notes: `ui-monospace, "SF Mono", Menlo`.
- Headings 700, tracking -0.035em, `text-wrap: balance`.

| Style | Size (390 to 1440) | Line height |
|---|---|---|
| Hero | 44 to 88 | 0.98 |
| H2 | 36 to 68 | 1.02 |
| H3 | 28 to 40 | 1.05 |
| Lead | 17 to 20 | 1.55 |
| Body | 17 | 1.55 |
| Small | 14 | |
| Eyebrow | 12 mono, uppercase, +0.14em | |

## Spacing, radius, shadow

- 4px base: 4, 8, 12, 16, 24, 32, 48, 72, 120. Section padding 120 desktop, 72 mobile. Content max 1200, gutter 24 (16 mobile).
- Radius: icons 22.5% (iOS squircle), small 14, cards and screenshots 28, panels 40, pills 999.
- Shadows: phone `0 50px 90px -40px rgba(29,10,18,.55)`, icon `0 18px 30px -14px rgba(29,10,18,.45)`, soft `0 24px 60px -30px rgba(29,10,18,.30)`.

## Motion (bouncy by owner request)

- **Springs:** `--spring` is a damped spring (stiffness 170, damping 12) as CSS `linear()`, and `--spring-soft` a gentler one. Hovers use 700ms springs; entrances 900ms.
- **Entrances:** every `[data-pop]` rises 28px from 94% scale with a spring overshoot as it reaches the screen, staggered 70ms by `--d`.
- **Hovers:** buttons lift and grow (press: squish to 94%), icons wiggle, rows nudge, screenshots straighten, logos tilt.
- **Loops:** the hero icons bob, the featured discs turn (40s), the ticker runs (40s, pauses on hover), the studio rings breathe, and the contact star twinkles.
- **Cursor ripple (fine pointers only):** a 28px crimson ring that trails the pointer and grows over links, faint rings left every 140ms of movement, and a bigger ripple on click.
- **Reduced motion:** no entrances, loops or cursor. Everything shows at rest.
- Animate `transform`, `rotate`, `scale` and `opacity` only. No scroll-jacking or parallax.

## Imagery

- **Owner files only:**
  - App Store marketing screenshots in `src/assets/apps/<slug>/promo/`
  - icons in `src/assets/apps/<slug>/icon.png`
  - the logo in `src/assets/brand/` (`logo.png`, `logo-light.png` for dark grounds, `mark.png` for favicons)
- The originals live in `/Assets` (gitignored). Every PNG ships as AVIF/WebP.
- **App Store badge:** the official black SVG in `public/badges/`, unmodified, one per featured section.
  Elsewhere the text link reads "View <app> on the App Store".

## Facts the owner has confirmed

Building since 2025 · 500+ downloads · 4.8 average App Store rating. Use nothing else as a figure.

## Adding an app

1. Add `src/data/apps/<slug>.json`.
2. Add its icon and `promo/` screenshots.
3. While it is not live, it is a blank "Coming soon" slot.

When it goes live, set `status: "live"` and `appStoreUrl`, and add `tagline`, `promo {hero, list, feature}` and `feature {title, body, rowsTitle, rows[3]}`.
It then appears in the ticker, the apps list, its own featured section, the footer and the JSON-LD with no code change.
The hero shows the first two live apps.

## Anti-references

Generic SaaS landing pages, centred hero plus three feature cards, default shadcn/Tailwind, glassmorphism dashboards, buzzword copy, em dashes, exclamation marks.
