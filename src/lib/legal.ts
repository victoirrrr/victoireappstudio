import { getCollection } from 'astro:content';

/** Every privacy/support path that has a Markdown file, e.g. "/kit/privacy". */
export async function legalPaths(): Promise<Set<string>> {
  const docs = await getCollection('legal');
  return new Set(docs.map((d) => `/${d.data.app}/${d.data.kind}`));
}
