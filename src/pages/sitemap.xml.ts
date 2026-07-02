import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Build-time sitemap of the HTML pages (dependency-free; respects the /Portfolio base).
const SITE = import.meta.env.SITE ?? 'https://davidjcrawford.github.io';
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');
const abs = (p: string) => `${SITE}${BASE}${p}`;
const day = (d?: Date) => (d ? new Date(d).toISOString().slice(0, 10) : undefined);

export const GET: APIRoute = async () => {
  const [articles, projects] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('projects', ({ data }) => !data.draft),
  ]);
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: abs('/') },
    { loc: abs('/brain/') },
    ...articles.map((e) => ({ loc: abs(`/writing/${e.id}/`), lastmod: day(e.data.date) })),
    ...projects.map((e) => ({ loc: abs(`/projects/${e.id}/`), lastmod: day(e.data.date) })),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
