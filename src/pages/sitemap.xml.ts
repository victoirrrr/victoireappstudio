// sitemap.xml (PRD 11): the home page, each app page on this site, and every privacy/support page.
// Built from the same data as the pages, so a new app or policy appears here with no code change.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getApps } from '../lib/apps';

export const GET: APIRoute = async ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const apps = await getApps();
  const legal = await getCollection('legal');
  const paths = [
    '/',
    ...apps.filter((a) => a.siteUrl === `/${a.slug}`).map((a) => a.siteUrl!),
    ...legal.map((d) => `/${d.data.app}/${d.data.kind}`),
  ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
