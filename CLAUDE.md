# Portfolio site: build rules

App portfolio site for Vijay Kumar, a solo indie iOS app maker. The site is about the APPS
(e.g. Morb, Kit, Kwesti), not his corporate career: no CV, no consulting work.
Goal: visitors understand each app in seconds and tap through to the App Store.
Static site, deployed later (GitHub Pages or similar).

Product spec: @PRD.md (what to build, section by section; owner-approved scope).
Design system: @DESIGN.md (single source of truth; never invent colours, fonts or spacing outside it).

## Skills and their roles (do not mix roles)
1. `frontend-design`: use ONLY at the direction stage, to argue the aesthetic before DESIGN.md is locked.
2. `design-taste-frontend` (taste-skill): the builder. Load it before writing any front-end code,
   every session. Treat this site as kind `software` (a studio selling its own software).
3. `unslop-ui`: the auditor. Run its audit after each section and before calling anything done.

## Overrides to the skills (these win)
- Real contact details ARE allowed for the owner: support email, App Store links, socials.
  (taste-skill house rule 9 about `.example` contacts does not apply to this site.)
- App icons and screenshots are the owner's own: use the real files in src/assets/apps/<slug>/ (moved from public/ so the build optimises them).

## References (ref-1-cards, ref-2-hero-arc, ref-3-app-shelf)
- ref-2 drives the hero, ref-3 the app shelf, ref-1 the app cards and Kit family. PRD.md section 7 maps each.
- The hero is centred by design (ref-2), but NEVER follow it with three feature columns or cards: use the app strip from PRD 7.2.

## Reference first
- Read every file in /references before designing. One primary reference drives layout;
  others lend only the single element named in their file name.
- Design the hero first and get it approved before building other sections.

## Images, in priority order
1. Owner's own files in src/assets/apps/<slug>/ (app icons and screenshots).
2. Licensed photographs via taste-skill `scripts/photos.mjs search` (Wikimedia Commons:
   CC0, CC BY, CC BY-SA, public domain). Always run `photos.mjs credits` for the footer line.
3. Generated images only for textures or backgrounds, never fake people or fake products.
No stock photo APIs are configured (Pexels key issuance is paused).

## Banned (the Reddit-ranked AI tells, plus the 2026 one)
- Default shadcn/Tailwind look; purple or indigo primary; purple-to-blue gradients; gradient heading text
- Unprompted neon glow; emoji as icons; Inter or Geist as the default font
- Centered hero followed by three feature cards
- The 2026 house style: warm cream background + serif display (Instrument Serif, Fraunces) + sage/forest green
- Em dashes in any copy

## Verification loop (mandatory)
After every section: start a local server, then use Playwright MCP to screenshot at 1440, 768 and 390
wide, read the screenshots, list what is off against DESIGN.md and the reference, fix, re-shoot.
Nothing is "done" until the taste-skill gate passes and unslop-ui audit is clean.

## Copy
Plain, specific, first person (an indie maker talking about his apps). No buzzwords ("leverage", "synergy", "cutting-edge", "seamless").
