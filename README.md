# David J Crawford — Portfolio

A small, curated site for writing about how product gets crafted in the age of generative and agentic AI. It's built to be read, not scrolled: a handful of articles and projects, each given its own page, with no feed and nothing nudging you to publish on a schedule.

**Live:** <https://davidjcrawford.github.io/Portfolio/>

The site is also an example of the thing it writes about, so the implementation is documented here in detail. The product thinking lives in [spec.md](spec.md), the design system in [DESIGN.md](DESIGN.md), and the ideas the whole thing rests on in portable knowledge bundles under [`brains/`](brains/).

## Stack

- **Astro 5** with the **MDX** integration, built to **static output** — there's no SSR adapter, so `astro build` emits a `dist/` of plain files that deploy anywhere.
- **Self-hosted, Latin-subset type**: Inter Variable (display), Newsreader Variable (serif body and the italic monogram), IBM Plex Mono (labels).
- **Design tokens** in plain CSS as the single source of truth. Content pages ship **near-zero client JavaScript** (two small progressive enhancements); the one JS-heavy page is the interactive **Brain graph**.
- **GitHub Pages** via GitHub Actions, served from the `/Portfolio` subpath.

## How it works

### Content model

Writing and projects are two equal content collections ([`src/content.config.ts`](src/content.config.ts)) with separate Zod schemas and shared language. [`src/lib/pieces.ts`](src/lib/pieces.ts) assembles them into one exhibition and keeps two orderings apart on purpose:

- **Catalogue number** — the chronological rank within a kind (the oldest article is `001`), so a piece's number never shifts as new work is added.
- **Display order** — newest first, with an optional `order` field to pin a piece to the front.

`featured` controls what appears on the homepage; `draft` keeps a piece out of the build.

### Design tokens

[`src/styles/tokens.css`](src/styles/tokens.css) is the single source of truth for colour, type and space. Components never hard-code a value; they reach for a token. Type is a fluid `clamp()` scale that tracks the viewport without breakpoints, motion is deliberately minimal (one easing curve, a 170ms duration), and the palette is ink on white with one warm block fill and a single accent.

### Typography

All three families are self-hosted and Latin-subset, for weight and for speed. The Inter and Newsreader `woff2` files sit in `src/styles/fonts/` rather than `public/`, so Vite fingerprints them and rewrites their URLs under the base path; [`src/styles/fonts.css`](src/styles/fonts.css) declares them by hand with a `unicode-range` that already covers the em-dashes and curly quotes the prose uses.

### The two interactions

The site ships almost no JavaScript. The two exceptions are deliberate flourishes, each a progressive enhancement:

- **A liquid comet cursor** ([`src/components/Cursor.astro`](src/components/Cursor.astro)) — a chain of seven SVG circles rendered through an SVG goo filter (a Gaussian blur followed by an `feColorMatrix` alpha threshold) that fuses overlapping circles into one liquid shape. The lead eases toward the pointer, each circle chases the one ahead, and an inter-circle gap clamp stops the comet splitting on fast moves. It's black over light areas, white over the black header and footer (their positions are re-measured on scroll and resize), and morphs to the accent with a subtle wobble once the pointer has rested for ~500ms.
- **A glitch wordmark** ([`src/components/HeaderBar.astro`](src/components/HeaderBar.astro)) — the `DJC` monogram with two ghost copies behind it, drawn as `::before`/`::after` pseudo-elements. JavaScript can't style a pseudo-element directly, so a `requestAnimationFrame` loop sets CSS custom properties the ghosts read for their offset and clip band, producing an erratic chromatic-split glitch while the pointer is over the header.

### The Brain graph

The [`/brain`](src/pages/brain.astro) page renders the knowledge bundles as an interactive, force-directed node graph (one node per note, edges from each note's `# Related` links) — and it reads them **live**. A build step ([`scripts/sync-brain.mjs`](scripts/sync-brain.mjs), wired in as an Astro integration in [`astro.config.mjs`](astro.config.mjs)) copies every `brains/**/*.md` into `public/brain/` with a `manifest.json`; the page fetches and parses those files in the browser at load and builds the graph — so the graph *is* the served source, and each note is also reachable at its own URL (`/brain/<path>.md`) for agents to read. The layout is a hand-rolled force simulation in SVG (no graph library); hovering or selecting a node morphs it into a goo blob (the same SVG filter as the cursor) and dims the rest, and a drawer renders the note's Markdown. It stays static (works on GitHub Pages, no server), degrades to a plain index without JS, and honours reduced motion. See [`src/lib/brainGraph.ts`](src/lib/brainGraph.ts) for the build-time parser behind the no-JS fallback.

### Progressive enhancement & accessibility

Content pages work with no JavaScript at all. Both interactions are gated on a fine pointer and `prefers-reduced-motion`, so touch and reduced-motion users never load them. The markup is semantic, there's a skip link, the cursor is `aria-hidden`, and the wordmark carries an `aria-label`. One knowing tradeoff: the brand accent on white sits around 3.2:1, below WCAG AA for small text, so it's used for emphasis and never for body copy.

### Deployment

A GitHub Actions workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) builds and deploys to GitHub Pages on every push to `main`. Pages serves the site from the `/Portfolio` subpath, so [`astro.config.mjs`](astro.config.mjs) sets `base: '/Portfolio'` and a small `withBase()` helper ([`src/lib/url.ts`](src/lib/url.ts)) prefixes every internal link; Vite rewrites the imported asset URLs.

## Project structure

```text
src/
  content/            articles + projects (MDX), validated by content.config.ts
  content.config.ts   collection schemas (Zod)
  layouts/            Base, Article, Project shells
  pages/              index + writing/[...slug] + projects/[...slug] + brain
  components/         HeaderBar, Footer, Gallery, PieceCard, Cursor, …
  lib/                pieces.ts (the exhibition), url.ts, brainGraph.ts (fallback graph)
  styles/             tokens.css, global.css, fonts.css, fonts/
scripts/
  sync-brain.mjs      copies brains/ → public/brain/ + manifest (Astro integration)
public/brain/         generated: served notes + manifest for the live graph (gitignored)
brains/               OKF v0.1 knowledge bundles — one per subject
  site/               the thinking behind the site itself
  ai-in-security/     backs "The Right People, at the Right Time"
spec.md               what it is and why
DESIGN.md             the design system
```

## Develop

```bash
npm install
npm run dev      # dev server with hot reload
npm run build    # static site → dist/
npm run preview  # serve the built output
```

Requires a current Node LTS.

## Add a piece

Drop one `.mdx` file into `src/content/articles/` or `src/content/projects/` with the frontmatter from the schemas in [`src/content.config.ts`](src/content.config.ts). Set `featured: true` and an `order:` to place it in the homepage exhibition. Nothing else to wire up.

## The brains

[`brains/`](brains/) holds the project's knowledge in [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) (OKF v0.1): markdown with YAML frontmatter, relationships as ordinary relative links, and the directory itself as the graph. Each subject is its own bundle:

- [`brains/site/`](brains/site/index.md) — the ideas, decisions and technical design behind the site itself.
- [`brains/ai-in-security/`](brains/ai-in-security/index.md) — the deeper context behind ["The Right People, at the Right Time"](src/content/articles/the-right-people-at-the-right-time.mdx).

An article points at a bundle and a bundle can back more than one article, so a brain is shared simply by being referenced more than once. Bundles cross-link with relative paths rather than duplicating shared concepts. Start at [`brains/site/index.md`](brains/site/index.md) — or explore it as an interactive graph at [`/brain`](https://davidjcrawford.github.io/Portfolio/brain/), which reads these same files live (each is also served at `/brain/<path>.md` for agents to read).
