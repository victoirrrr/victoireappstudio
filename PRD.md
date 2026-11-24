# PRD: victoirappstudio.com

Version 1.0 · 18 Nov 2026 · Owner: Vijay Kumar · Status: DRAFT (awaiting owner approval)

Build rules live in @CLAUDE.md. Visual tokens get extracted from this PRD into @DESIGN.md before any build starts.

---

> **v2 update (22 Nov 2026, owner direction).** The home page is rebuilt on truetapp.com's structure.
> DESIGN.md v2 is the source of truth for sections, type (SF Pro system stack) and motion (bouncy springs, cursor ripple).
> Kwesti and Morb are the live, featured apps. Kit, Kit Pouch and GLP-1 appear only as anonymous "Coming soon" slots, and their app pages are not built.
> Sections 7 to 9 below describe v1 and are kept for history. Sections 1 to 6 and 10 to 12 still apply, except where DESIGN.md v2 differs.
> Owner-confirmed figures: 500+ downloads and a 4.8 average rating. Showing them supersedes the v1 non-goal on ratings.

## 1. Summary

victoirappstudio.com is the single studio site for Vijay Kumar's iOS apps. It presents every app in one place, sends visitors to the right App Store page, and hosts the legal and support pages that unlaunched apps (Kit, Kit Pouch, GLP-1) need for App Store submission.

The look is defined by three owner-supplied references (in `/references`): a light, airy canvas; tall rounded app cards with photo-to-colour fades; an arc of image tiles framing the hero; and a "store shelf" row where the focused card grows and an object breaks out of its frame.

## 2. Goals and non-goals

**Goals**
1. A visitor understands what each app does within 5 seconds of seeing its card.
2. Every live app is one tap from its App Store page.
3. The site reads as a deliberate, crafted studio, not an AI template.
4. Adding a new app (GLP-1 next) takes one data file plus assets, with no layout redesign.
5. Kit and Kit Pouch get the privacy policy and support URLs App Store Connect requires.

**Non-goals (v1)**
- No CV, consulting career or corporate content.
- No blog, newsletter backend, accounts or payments.
- No ratings, review counts or download numbers until they are real and visible on the App Store (both live apps currently show none).
- No replacement of kwesti.co or morbapp.com; those stay as each app's own site.

## 3. Audience

| Visitor | Arrives from | Needs |
|---|---|---|
| Potential user | App Store "Developer Website" link, social, Reddit, Product Hunt | See the app, trust it, tap Download |
| Existing user | App Store support link, settings screen of an app | Support email, privacy policy |
| Press / curators / partners | Search, referral | Who makes these, contact, assets |

## 4. Brand

- **Name:** victoir app studio (lowercase wordmark). Domain: victoirappstudio.com. Seller on the App Store: Vijay Kumar.
- **Voice:** plain, warm, first person singular ("I make..."). Short sentences. No hype words (stunning, seamless, cutting-edge, leverage, unlock, revolutionary). No exclamation marks. No em dashes.
- **Cross-app thread:** midnight ink plus crimson red, shared by all four app icons.

## 5. App roster and content

Order on the page: **Kwesti > Morb > Kit family (Kit, Kit Pouch, GLP-1).**

| | Kwesti | Morb | Kit | Kit Pouch | GLP-1 (later) |
|---|---|---|---|---|---|
| App Store name | Kwesti - Weekly Side Quests | Morb: One Touch Audio Enhancer | Kit (TBC) | Kit Pouch (TBC) | TBC |
| Subtitle | Mindful moments, photo journal | Studio sound for voice & video | TBC | TBC | TBC |
| Status | Live, v3.0 | Live, v2.1 | Launching before New Year | In progress | Planned 2027 |
| Price | Free | Free, Pro $4.99/mo or $29.99/yr | TBC | TBC | TBC |
| Category | Health & Fitness | Music | TBC | TBC | TBC |
| App Store URL | apps.apple.com/us/app/kwesti-weekly-side-quests/id6770004221 | apps.apple.com/us/app/morb-one-touch-audio-enhancer/id6784659337 | none yet | none yet | none |
| Own site | kwesti.co | morbapp.com | victoirappstudio.com/kit | victoirappstudio.com/kit-pouch | later |
| Privacy | kwesti.co/privacy | morbapp.com/privacy | /kit/privacy (new) | /kit-pouch/privacy (new) | later |
| Support | via kwesti.co | hello@victoirappstudio.com | /kit/support (new) | /kit-pouch/support (new) | later |
| Assets in repo | icon + 8 screens | icon + 8 screens | icon + 7 screens | icon only | none |

**One-liners (draft, owner to confirm):**
- **Kwesti:** Three small real-world side quests every Monday. Live one, snap a photo, keep it as a print. No streaks.
- **Morb:** Make a phone recording sound studio-made in one tap. Clean up hum, lift your voice, pick a sound, share.
- **Kit:** A quiet drink tracker with a small companion who never judges. Fewer drinks, better mornings.
- **Kit Pouch:** A calm plan to quit nicotine pouches, one day at a time.
- **GLP-1:** A simple tracker for GLP-1 pills. Coming 2027.

**Feature chips (max 3 per app, 1 to 2 words each):**
- Kwesti: Weekly quests · Photo prints · No streaks
- Morb: One tap · Studio sounds · Share to Reels
- Kit: Gentle tracking · Mornings · Private
- Kit Pouch: Quit plan · Cravings help · Progress

**Kit family rule:** Kit, Kit Pouch and GLP-1 always appear together as one group and link to each other. GLP-1 shows as a "Coming 2027" card until it has assets.

## 6. Information architecture

```
/                       Home (all sections below)
/kit                    Kit app page
/kit/privacy            Kit privacy policy
/kit/support            Kit support + FAQ
/kit-pouch              Kit Pouch app page
/kit-pouch/privacy
/kit-pouch/support
/about                  Short studio note + press kit download (optional in v1)
/404
```
Kwesti and Morb cards link out to the App Store (primary) and their own sites (secondary). They get no duplicate pages here.

## 7. Page spec: Home

Every section is exactly one or two screens tall at 1440x900 (taste-skill rule). Section order and behaviour:

### 7.1 Nav
- Left: `victoir` wordmark. Right: `Apps`, `Kit family`, `Support`. No CTA button in the nav.
- Transparent over the hero, becomes canvas-coloured with a 1px bottom line after 40px of scroll.
- Mobile: same three links in a simple sheet; no hamburger animation tricks.

### 7.2 Hero (from ref-2-hero-arc)
- **Layout:** a half-ring of 9 to 11 rounded-square tiles arcs over and around a centred text block, exactly like ref 2. The ring is clipped by the bottom of the first screen.
- **Tiles:** real crops from the app screenshots and icons only (Kwesti polaroid card, Morb sound picker, Kit companion, Kit Pouch icon, icons). Each tile ~180px square at 1440, radius 28px, rotated to follow the arc, soft shadow. Never stock or AI imagery.
- **Headline (serif display, 2 lines max). Options, owner picks one:**
  - A: "Small apps for real life."
  - B: "Apps that stay quiet until they help."
  - C: "Made slowly, by one person."
- **Subline (sans, 1 line):** "I'm Vijay. I make iOS apps for side quests, better-sounding covers and drinking less."
- **CTA:** one dark pill, "See the apps" + arrow, scrolls to the shelf.
- **Below the CTA (replaces ref 2's three feature columns):** a "Now on the App Store" strip of app chips (icon 28px + name + status), separated by 1px vertical rules. This keeps ref 2's rhythm without the banned "centred hero + three feature cards" pattern.
- **Motion:** tiles fan in from the centre on load (stagger 40ms, 600ms, ease-out); on scroll the ring rotates up to 8 degrees and drifts up slightly. Reduced motion: static ring.

### 7.3 App shelf (from ref-3-app-shelf)
- **Container:** one large rounded panel (radius 40px, white at 72% over the canvas, 1px line border, very soft shadow), inset from the page edges. No fake window dots.
- **Panel header:** left tabs `All apps` / `Kit family` (ref 3's Games/Experiences tabs). Selected tab: ink with a small crimson dot under it.
- **Card row:** one card per app, in roster order. The focused card is ~1.35x the size of the others and sits centred (coverflow). Cards use a squircle shape, with the focused card slightly organic (taller right edge, as in ref 3) via an SVG mask.
- **Each card shows:** the app's own colour field, app name lockup, a meta row (`Free · Music`), and a status pill where ref 3 shows the price (`Free`, `Soon`, `2027`).
- **Break-out object:** the focused card has one object rising out of its top edge, like ref 3's astronaut: Kwesti a tilted polaroid, Morb the glossy M, Kit the red companion blob, Kit Pouch the red 0. Transparent PNG cut-outs (see section 10).
- **Detail strip under the panel (ref 3's bottom row):** app icon (56px), app name, facts line (`Free · Health & Fitness · 4+ · v3.0`), the one-liner, and the **official black "Download on the App Store" badge**. This is the page's only badge (Apple: one per layout). Unlaunched apps show "Coming soon" text instead of a badge.
- **Interaction:** click, swipe, arrow keys or tab change the focus; detail strip crossfades (200ms). Snap scroll on touch. Deep links: `/#kwesti`, `/#morb`, `/#kit`.

### 7.4 App spotlights (one per live app: Kwesti, then Morb)
- One screen each. Left: an **app card in the ref-1 style** (section 8.1). Right: 3 screenshots as rounded tiles in a gentle arc (echo of the hero), the middle one raised.
- Copy: H2 = the app's outcome in plain words (e.g. Kwesti: "Three small things, every Monday."; Morb: "Your phone recording, studio-made."), 2-line paragraph, chips, then a white pill "View on the App Store" (text link, not a badge) and a quiet text link to the app's own site.

### 7.5 Kit family (from ref-1-cards)
- Title: "The Kit family". One line: "Small tools to drink less, quit pouches and stay on track. They work alone and better together."
- **Exactly the ref-1 layout:** three tall cards side by side on the light canvas: Kit, Kit Pouch, GLP-1.
- Each card: screenshot or visual top half, fading into a tint sampled from that image; name + status pill top right; 2-line description; 2 chips; full-width white pill button.
  - Kit: "Get Kit" when live, "Coming soon" before.
  - Kit Pouch: icon on a tinted field (no screenshots yet), pill "In the works".
  - GLP-1: blurred crimson field with a simple pill shape, pill "2027", button disabled.
- Pagination dots on each card image only if the card cycles screenshots (Kit only).

### 7.6 Studio note
- Left-aligned short note in first person, max 60 words, with a small signature-style wordmark. Example tone: "I build these apps in the evenings. Each one solves something I wanted fixed in my own week. If one helps you, that's the whole point." No career history.

### 7.7 Footer
- Wordmark, `hello@victoirappstudio.com`, links: each app's privacy and support, `Press kit` (later). One credits line if any licensed photos are used. `© 2026 victoir app studio`. Apple trademark line: "App Store is a service mark of Apple Inc."

## 8. Components

### 8.1 App card (ref 1)
- Size: 300 x 470 at 1440 (ratio ~0.64), radius 32px.
- Top 55%: image (screenshot crop or app visual), object-fit cover.
- Bottom 45%: gradient from transparent to the app tint (sampled from the image's lower edge), solid tint under the text.
- Title: sans 22px/600, white. Status pill: 13px/600, dark 40% fill, white text, radius 999px, top right of the title row.
- Body: 15px/1.45, white at 72%, 2 lines max.
- Chips: 13px/600, white at 14% fill, radius 999px, 8px x 12px padding.
- Button: full-width white pill, 48px tall, ink text 16px/600, 16px from card edges.
- Shadow: `0 40px 80px -30px rgba(14,16,32,.35)`. Hover: lift 2px, image zoom 1.02.

### 8.2 Shelf card (ref 3)
- Default 220 x 260, focused 300 x 340, radius 44px. Colour field = the app's palette, with a soft radial highlight. Name lockup in the app's own display style where it has one, else the site sans at 700.

### 8.3 Tiles (ref 2)
- Square, radius 28px, 1px inner white border at 30%, shadow `0 20px 40px -20px rgba(0,0,0,.25)`.

### 8.4 Buttons
- Primary dark pill (ref 2): ink fill, white 15px/600, 48px tall, arrow icon. Hover: arrow nudges 3px.
- White pill (ref 1): white fill, ink text, used on tinted cards only.
- App Store badge: official SVG from Apple Marketing Tools, black, unmodified, never rotated or animated.

## 9. Visual system (to be copied into DESIGN.md)

**Colour (provisional; sample exact app tints from `icon.png` and screenshots during build):**
| Token | Hex | Use |
|---|---|---|
| canvas | #F3F3F5 | page background (all 3 references) |
| surface | #FFFFFF | shelf panel, cards on canvas |
| ink | #11121A | text, dark pill |
| ink-2 | #5C5E6A | secondary text |
| line | #E3E3E9 | rules, borders |
| crimson | #E5322D | the studio thread: active states, small marks, never large fills |
| kwesti | #0C0A0E bg, #FF4A38 signal, #ECE6DA ink | Kwesti card and shelf field |
| morb | #000000 bg, red from icon | Morb |
| kit | midnight from screenshots, #E8352B companion red | Kit |
| kit-pouch | light card look, red 0 from icon | Kit Pouch |

Banned: purple/indigo, purple-to-blue gradients, gradient text, neon glow, cream + sage combos.

**Type:**
- Display (hero headline, H2s): a condensed high-contrast serif in the spirit of ref 2. First choice **Newsreader** (Display optical size, 400, tracking -1.5%). Do not use Instrument Serif or Fraunces (flagged 2026 tells; Fraunces is also Kwesti's in-app face).
- UI/body: the Apple system stack (`-apple-system, "SF Pro Text", ...`) with **Hanken Grotesk** as the web fallback. Not Inter, not Geist.
- Scale (1440): hero 76/1.02, H2 48/1.08, H3 24/1.2, body 17/1.5, small 13/1.4. Mobile hero 44.

**Spacing:** 4px base; section padding 120px desktop / 72px mobile; content max width 1200px; equal left and right edges.

**Radius:** tiles 28, cards 32, shelf cards 44, panel 40, pills 999.

**Motion:** 200 to 600ms, ease-out `cubic-bezier(.2,.7,.2,1)`. Hero fan-in, shelf focus, card hover lift. Everything respects `prefers-reduced-motion`.

**Signature element:** the arc of real app tiles in the hero. It must be the one thing people remember; nothing else competes with it.

**Anti-references:** generic SaaS landing pages, centred hero + three feature cards, glassmorphism dashboards, Dribbble shots with fake ratings.

## 10. Assets

| Need | Status | Owner action |
|---|---|---|
| App icons 1024px (4) | Done, in `public/assets/images/*/icon.png` | none |
| Screenshots Kwesti, Morb, Kit | Done | none |
| Kit Pouch screenshots (3) | Missing | Export from simulator when screens are final |
| Break-out cut-outs (transparent PNG, ~1200px): Kwesti polaroid, Morb "M", Kit companion, Kit Pouch "0" | Missing | Export from Xcode assets / design files, or Claude cuts them from icons as a stopgap |
| Official App Store badge SVG | Missing | Download from Apple's App Store Marketing Tools |
| OG share images 1200x630 (home + each app) | To generate in build | none |
| Favicon / touch icon | To generate from the wordmark | none |

All PNGs must be converted to AVIF/WebP at 1x and 2x during build; the raw screenshots total ~33 MB and must never ship as-is.

## 11. Tech

- **Framework:** Astro (static output), vanilla CSS with custom properties. No Tailwind, no shadcn or UI kits. Minimal vanilla JS for the shelf and hero motion only.
- **Data:** one file per app in `src/data/apps/<slug>.json`: `name, slug, order, status, appStoreUrl, appStoreId, subtitle, oneLiner, description, chips[], category, price, palette{bg,tint,accent,ink}, icon, screens[], breakout, family, siteUrl, privacyUrl, supportUrl`. Every section renders from these files. **Adding GLP-1 = add one JSON + assets.**
- **Hosting:** Cloudflare Pages from a GitHub repo, custom domain victoirappstudio.com. Email via Cloudflare Email Routing to hello@victoirappstudio.com.
- **Analytics:** Cloudflare Web Analytics (cookie-free, no banner needed). App Store links carry App Analytics campaign tokens (`?pt=<provider token>&ct=vas-<section>`) so App Store Connect shows which section drove each download.
- **SEO:** unique title and description per page; OG images; `sitemap.xml`; JSON-LD `SoftwareApplication` per app (name, iOS, category, price) **without** aggregateRating; Apple Smart App Banner meta (`apple-itunes-app`) on app pages of live apps.

## 12. Quality bars (acceptance criteria)

1. Matches the three references in layout, spacing feel, radius, shadow softness and card anatomy (checked side by side with Playwright screenshots).
2. Taste-skill gate passes; unslop-ui audit reports no tells; no em dashes anywhere in copy.
3. Screenshots reviewed at 1440, 1024, 768 and 390 wide after every section.
4. Mobile Lighthouse: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95. LCP < 2.5s on 4G. Home page weight < 1.5 MB.
5. WCAG 2.1 AA contrast, full keyboard use of the shelf, visible focus, alt text on every image, reduced-motion path.
6. No invented data: no ratings, review counts, download numbers, testimonials or press logos.
7. Exactly one official App Store badge per layout, unmodified.
8. Adding a test app JSON makes it appear in the shelf, chips strip and (if `family: "kit"`) the Kit family row with no code changes.

## 13. Build phases (one at a time, owner approves each)

1. **Design lock:** extract section 9 into DESIGN.md, confirm fonts and sampled tints, mark LOCKED.
2. **Scaffold:** Astro project, data files, image pipeline, deploy a blank page to Cloudflare Pages.
3. **Hero** (arc of tiles + headline + app strip).
4. **App shelf** (panel, coverflow, break-out object, detail strip).
5. **Spotlights** (Kwesti, Morb).
6. **Kit family** cards.
7. **Studio note + footer.**
8. **Kit / Kit Pouch pages + privacy + support.**
9. **QA pass** against section 12, then go live on victoirappstudio.com.

## 14. Open questions for the owner

1. Hero headline: A, B or C (or your own)?
2. Kit and Kit Pouch final App Store names, and Kit's launch date?
3. Should the privacy policies for Kit and Kit Pouch be written now (Claude drafts from what each app actually collects)?
4. Do you want a "Notify me" email capture for Kit before launch? (Needs a free form service; v1 currently says "Coming soon" only.)
5. Is the App Store provider token available (App Store Connect > App Analytics > Campaigns) for link tracking?
