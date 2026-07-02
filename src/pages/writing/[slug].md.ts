import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// A raw-Markdown twin of each article at /writing/<slug>.md — the static-host
// equivalent of Accept-header content negotiation, so agents can read a clean,
// low-token version of any article (same pattern as the served brain notes).
export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export const GET: APIRoute = async ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getCollection>>[number] };
  const { title, dek } = entry.data as { title: string; dek: string };
  const md = `# ${title}\n\n> ${dek}\n\n${entry.body ?? ''}`;
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
