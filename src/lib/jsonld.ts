import type { App } from './apps';

/**
 * JSON-LD SoftwareApplication for one app (PRD 11). Only facts in the app's data file: no
 * aggregateRating, no review counts. A price appears only for a live app whose price is "Free".
 */
export function appJsonLd(app: App, site: URL): Record<string, unknown> {
  const page = app.siteUrl
    ? new URL(app.siteUrl, site).toString()
    : new URL(`/#${app.slug}`, site).toString();
  const ld: Record<string, unknown> = {
    '@type': 'SoftwareApplication',
    name: app.appStoreName ?? app.name,
    alternateName: app.appStoreName && app.appStoreName !== app.name ? app.name : undefined,
    description: app.oneLiner,
    operatingSystem: 'iOS',
    applicationCategory: app.category ?? undefined,
    url: page,
    downloadUrl: app.appStoreUrl ?? undefined,
    author: { '@type': 'Person', name: 'Vijay Kumar' },
    publisher: { '@type': 'Organization', name: 'victoir app studio', url: site.toString() },
  };
  if (app.isLive && app.price === 'Free') {
    ld.offers = { '@type': 'Offer', price: '0', priceCurrency: 'USD' };
  }
  return Object.fromEntries(Object.entries(ld).filter(([, v]) => v !== undefined));
}

export function graph(items: Record<string, unknown>[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': items });
}
