import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

// Every PNG and WebP under src/assets/apps/<slug>/ is imported here so Astro can turn it into
// AVIF/WebP at 1x and 2x. Raw PNGs never reach dist/.
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/apps/**/*.{png,webp}', {
  eager: true,
});

function img(slug: string, path: string): ImageMetadata {
  const key = `/src/assets/apps/${slug}/${path}`;
  const mod = files[key];
  if (!mod) {
    throw new Error(`[apps] ${slug}: missing image ${key}. Add the file or fix ${slug}.json.`);
  }
  return mod.default;
}

export type AppData = CollectionEntry<'apps'>['data'];

export interface App extends AppData {
  iconImage: ImageMetadata | null;
  screenImages: ImageMetadata[];
  breakoutImage: ImageMetadata | null;
  /** App Store marketing screenshots by home-page slot, when the app has them. */
  /** The lifestyle photo for the home showcase (the app in use), when the app has one. */
  sceneImage: ImageMetadata | null;
  promoImages: { hero: ImageMetadata; list: ImageMetadata; feature: ImageMetadata; extra: ImageMetadata } | null;
  /** Present when the app is live and has spotlightTitle + spotlight in its JSON. */
  spot: { screens: ImageMetadata[]; card: ImageMetadata; cardFocus: string } | null;
  isLive: boolean;
  /** "Free · Health & Fitness · 4+ · v3.0", only from facts that exist. */
  facts: string;
}

export async function getApps(): Promise<App[]> {
  const entries = await getCollection('apps');
  const apps = entries.map(({ data }) => {
    if (data.slug !== data.slug.toLowerCase()) {
      throw new Error(`[apps] slug must be lowercase: ${data.slug}`);
    }
    return {
      ...data,
      iconImage: data.icon ? img(data.slug, 'icon.png') : null,
      screenImages: data.screens.map((s) => img(data.slug, `screens/${s}`)),
      breakoutImage: data.breakout ? img(data.slug, data.breakout) : null,
      sceneImage: data.scene ? img(data.slug, data.scene.file) : null,
      promoImages: data.promo
        ? {
            hero: img(data.slug, `promo/${data.promo.hero}`),
            list: img(data.slug, `promo/${data.promo.list}`),
            feature: img(data.slug, `promo/${data.promo.feature}`),
            extra: img(data.slug, `promo/${data.promo.extra}`),
          }
        : null,
      spot:
        data.status === 'live' && data.spotlightTitle && data.spotlight
          ? {
              screens: data.spotlight.screens.map((s) => img(data.slug, `screens/${s}`)),
              card: img(data.slug, `screens/${data.spotlight.card}`),
              cardFocus: data.spotlight.cardFocus,
            }
          : null,
      isLive: data.status === 'live' && Boolean(data.appStoreUrl),
      facts: [
        data.price,
        data.category,
        data.ageRating,
        data.version ? `v${data.version}` : null,
      ]
        .filter(Boolean)
        .join(' · '),
    } satisfies App;
  });

  const orders = new Set<number>();
  for (const a of apps) {
    if (orders.has(a.order)) throw new Error(`[apps] two apps share order ${a.order}`);
    orders.add(a.order);
  }
  return apps.sort((a, b) => a.order - b.order);
}

export async function getFamily(family: 'kit'): Promise<App[]> {
  return (await getApps()).filter((a) => a.family === family);
}

/** App Store link with App Analytics campaign tokens, once the provider token exists. */
export function storeLink(app: App, section: string): string | null {
  if (!app.appStoreUrl) return null;
  const pt = import.meta.env.PUBLIC_APPSTORE_PROVIDER_TOKEN as string | undefined;
  if (!pt) return app.appStoreUrl;
  const url = new URL(app.appStoreUrl);
  url.searchParams.set('pt', pt);
  url.searchParams.set('ct', `vas-${section}`);
  return url.toString();
}
