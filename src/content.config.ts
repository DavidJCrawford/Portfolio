import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One quiet, disciplined set of panel tints (see DESIGN.md §2).
const accent = z.enum(['paper', 'clay', 'sage', 'mist', 'blush']).optional();

// Articles and projects are EQUALS (spec.md §3) — separate schemas, shared language.

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(), // ordering + <time> only — never a feed
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().optional(), // curatorial exhibition order (asc)
    readingTime: z.string().optional(),
    accent,
    canonicalUrl: z.string().url().optional(), // Substack migration (spec.md §6)
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    year: z.string(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    accent,
    links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
  }),
});

export const collections = { articles, projects };
