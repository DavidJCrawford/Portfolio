import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// The full text of every article concatenated into one file, so an agent can ingest
// the whole corpus in a single fetch. Generated at build time.
const SITE = import.meta.env.SITE ?? 'https://davidjcrawford.github.io';
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');
const abs = (p: string) => `${SITE}${BASE}${p}`;

export const GET: APIRoute = async () => {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  articles.sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));

  const L: string[] = [];
  L.push('# David J Crawford — writing (full text)');
  L.push('');
  L.push(
    'Every article, newest first. Curated map and per-article Markdown: ' + abs('/llms.txt') + '.'
  );
  for (const a of articles) {
    const iso = new Date(a.data.date).toISOString().slice(0, 10);
    L.push('');
    L.push('---');
    L.push('');
    L.push(`# ${a.data.title}`);
    L.push('');
    L.push(`> ${a.data.dek}`);
    L.push('');
    L.push(`_${iso} · ${abs(`/writing/${a.id}/`)}_`);
    L.push('');
    L.push(a.body ?? '');
  }
  L.push('');

  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
