import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './url';

export type Kind = 'article' | 'project';

export type Piece =
  | { kind: 'article'; entry: CollectionEntry<'articles'>; num: number; href: string }
  | { kind: 'project'; entry: CollectionEntry<'projects'>; num: number; href: string };

/** The exhibition: articles + projects, interleaved as equals, in curatorial order. */
export async function getExhibition(opts?: { featuredOnly?: boolean }): Promise<Piece[]> {
  const [articles, projects] = await Promise.all([
    getCollection('articles', ({ data }) => !data.draft),
    getCollection('projects', ({ data }) => !data.draft),
  ]);

  const items: Omit<Piece, 'num'>[] = [
    ...articles.map((entry) => ({
      kind: 'article' as const,
      entry,
      href: withBase(`writing/${entry.id}`),
    })),
    ...projects.map((entry) => ({
      kind: 'project' as const,
      entry,
      href: withBase(`projects/${entry.id}`),
    })),
  ];

  const filtered = opts?.featuredOnly ? items.filter((i) => i.entry.data.featured) : items;

  // Catalogue number = chronological rank within kind (oldest = 001). Independent of display.
  const numbers = new Map<(typeof filtered)[number], number>();
  const counters: Record<Kind, number> = { article: 0, project: 0 };
  for (const item of [...filtered].sort((a, b) => +a.entry.data.date - +b.entry.data.date)) {
    numbers.set(item, (counters[item.kind] += 1));
  }

  // Display order = newest first (most recent leads, top-left). `order` pins an item to the front.
  filtered.sort((a, b) => {
    const ao = a.entry.data.order ?? Number.POSITIVE_INFINITY;
    const bo = b.entry.data.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    return +b.entry.data.date - +a.entry.data.date;
  });

  return filtered.map((item) => ({ ...item, num: numbers.get(item)! })) as Piece[];
}

export const pad = (n: number) => String(n).padStart(3, '0');
