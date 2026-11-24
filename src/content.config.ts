import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'use a 6-digit hex like #E5322D');

// One JSON file per app in src/data/apps/<slug>.json.
// Images live in src/assets/apps/<slug>/ (icon.png, screens/*.png, optional breakout.png).
// Adding an app = one JSON + its image folder. See DESIGN.md "Adding a new app".
const apps = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/data/apps' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    order: z.number().int(),
    status: z.enum(['live', 'soon', 'in-progress', 'planned']),
    statusLabel: z.string(), // the pill text: Live, Soon, In the works, 2027
    appStoreName: z.string().nullable(),
    appStoreUrl: z.string().url().nullable(),
    appStoreId: z.string().nullable(),
    subtitle: z.string().nullable(),
    oneLiner: z.string(),
    // The plain category noun the app's own page uses in its H1 ("drink tracker"), when it has a page here.
    kind: z.string().optional(),
    spotlightTitle: z.string().nullable(), // H2 for the spotlight section (live apps)
    description: z.string().optional(), // 1 to 2 sentences under the spotlight H2
    // Spotlight (PRD 7.4): three screens beside a ref-1 card whose image is a crop of `card`
    // at `cardFocus` (object-position). A live app with spotlightTitle and this block gets a spotlight.
    spotlight: z
      .object({ screens: z.array(z.string()).length(3), card: z.string(), cardFocus: z.string().default('50% 50%') })
      .optional(),
    chips: z.array(z.string()).max(3),
    // Home v2 (DESIGN.md): a 2 to 5 word tag for the ticker and the app list.
    tagline: z.string().optional(),
    // App Store marketing screenshots in src/assets/apps/<slug>/promo/, by slot on the home page.
    promo: z.object({ hero: z.string(), list: z.string(), feature: z.string(), extra: z.string() }).optional(),
    // The featured-app section: headline, body and three rows (title + short note).
    feature: z
      .object({
        title: z.string(),
        body: z.string(),
        rowsTitle: z.string(),
        rows: z.array(z.object({ title: z.string(), note: z.string() })).max(4),
      })
      .optional(),
    // Average App Store star rating (owner-confirmed) and 3 or 4 real App Store reviews, quoted as written.
    // No review or rating count is shown on the site.
    rating: z.number().min(1).max(5).optional(),
    reviews: z
      .array(
        z.object({
          stars: z.number().int().min(1).max(5),
          title: z.string().optional(),
          text: z.string(),
          author: z.string().optional(),
          country: z.string().optional(),
        }),
      )
      .max(4)
      .optional(),
    category: z.string().nullable(),
    price: z.string().nullable(), // "Free", or null when unknown
    priceNote: z.string().nullable(),
    ageRating: z.string().nullable(),
    version: z.string().nullable(),
    palette: z.object({ bg: hex, tint: hex, accent: hex, ink: hex }),
    // Shelf card (PRD 7.3). field defaults to palette.bg, ink to palette.ink; lockup 'display'
    // sets the name in Newsreader for apps whose own name style is a serif (Kwesti).
    shelf: z
      .object({ field: hex.optional(), ink: hex.optional(), lockup: z.enum(['display', 'sans']).optional() })
      .optional(),
    icon: z.boolean(), // true when src/assets/apps/<slug>/icon.png exists
    screens: z.array(z.string()), // file names inside screens/, in display order
    breakout: z.string().nullable(), // file name of the transparent cut-out, when it exists
    family: z.enum(['kit']).nullable(),
    siteUrl: z.string().nullable(),
    privacyUrl: z.string().nullable(),
    supportUrl: z.string().nullable(),
    supportEmail: z.string().email().nullable(),
  }),
});

// Privacy and support text for apps whose pages live on this site: one Markdown file per app and
// kind, src/data/legal/<slug>-<kind>.md. /<slug>/privacy and /<slug>/support render from these.
const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/data/legal' }),
  schema: z.object({
    app: z.string(),
    kind: z.enum(['privacy', 'support']),
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { apps, legal };
