import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// A curated map of the site for AI agents (the llms.txt convention). Generated at
// build time from the content collections, so it never drifts.
const SITE = import.meta.env.SITE ?? 'https://davidjcrawford.github.io';
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');
const abs = (p: string) => `${SITE}${BASE}${p}`;

export const GET: APIRoute = async () => {
  const [articles, projects] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('projects', ({ data }) => !data.draft),
  ]);
  articles.sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));
  projects.sort((a, b) => +new Date(b.data.date) - +new Date(a.data.date));

  const L: string[] = [];
  L.push('# David J Crawford');
  L.push('');
  L.push(
    '> Writing on crafting product that keeps people safe and helps them thrive in the ever-changing world of generative and agentic AI. Three careers — software engineering, UX/design leadership, and now AI product — brought to bear on how product gets crafted at the intersection of desirability, feasibility and viability.'
  );
  L.push('');
  L.push(
    `A curated map for AI agents. Most content is also available as raw Markdown: append \`.md\` to any writing URL, or fetch brain notes directly. Site: ${abs('/')}`
  );
  L.push('');
  L.push('## Writing');
  for (const a of articles) L.push(`- [${a.data.title}](${abs(`/writing/${a.id}.md`)}): ${a.data.dek}`);
  L.push('');
  L.push('## Projects');
  for (const p of projects) L.push(`- [${p.data.title}](${abs(`/projects/${p.id}/`)}): ${p.data.dek}`);
  L.push('');
  L.push('## The Brain (knowledge base)');
  L.push(
    `- [Brain manifest](${abs('/brain/manifest.json')}): a JSON index of every note; each note is served as raw Markdown at \`/brain/<path>.md\`.`
  );
  L.push(
    `- [Site brain](${abs('/brain/site/index.md')}): the ideas, decisions and technical design behind the site (Open Knowledge Format).`
  );
  L.push(`- [Explorable graph](${abs('/brain/')}): the same notes as an interactive node graph.`);
  L.push('');
  L.push('## Full text');
  L.push(`- [llms-full.txt](${abs('/llms-full.txt')}): the full text of every article in one file.`);
  L.push('');

  return new Response(L.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
