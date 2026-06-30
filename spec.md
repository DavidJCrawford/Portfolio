# Portfolio — Master Spec

> A **curated exhibition** — a personal site for David J Crawford presenting a small,
> deliberately chosen set of articles and projects, each as its own beautifully
> designed object. Gallery, not feed. The site is itself a craft showcase: for an
> audience of technical peers in the AI/product community, the quality of the build
> *is* the strongest argument. Built on Astro + MDX, static, fast, owned outright.

**Status:** Spec v0.1 — pre-scaffold; design locked, building the shell + 3 page types.
**Last updated:** 2026-06-29

This file is the **master entry point** for the project. It ties the design system
([DESIGN.md](DESIGN.md)) to the implementation under `src/`. Read this for *what* the
site is and *why*; read `DESIGN.md` for *how* it looks and the rules that keep it
disciplined.

---

## 0. Where everything lives

```
Portfolio/
├── spec.md             ← you are here (master entry point: what & why)
├── DESIGN.md           ← the design system (aesthetic, palette, type, components)
├── brain/              ← the IDEAS behind the site (Open Knowledge Format v0.1 bundle; see brain/index.md)
│   ├── index.md          bundle index (declares okf_version) + log.md (change history)
│   ├── concepts/         the through-line, 3 lenses, transdisciplinary design, AI, safe/secure, …
│   ├── situations/       Portfolio Site · School of Transdisciplinary Design
│   └── decisions/        positioning decisions
├── astro.config.mjs    ← Astro + MDX config
├── package.json
├── public/             ← static assets served as-is (fonts, favicon, og images)
│   └── fonts/            self-hosted open-source typefaces
├── src/
│   ├── content/          ← THE CONTENT — authored as files, the source of truth
│   │   ├── config.ts       content collection schemas (articles, projects)
│   │   ├── articles/       *.mdx — one file per article
│   │   └── projects/       *.mdx — one file per project
│   ├── content.config.ts   (Astro ≥5 location for collection schemas, if used)
│   ├── layouts/
│   │   ├── BaseLayout.astro    <head>, fonts, header bar, footer, the shell
│   │   ├── ArticleLayout.astro the article-as-designed-object frame
│   │   └── ProjectLayout.astro the project-as-designed-object frame
│   ├── components/
│   │   ├── HeaderBar.astro     the blocky black header bar
│   │   ├── Footer.astro
│   │   ├── PieceCard.astro     a gallery card (article OR project — equals)
│   │   ├── Gallery.astro       the homepage exhibition grid
│   │   ├── Eyebrow.astro       mono kicker/label (e.g. "ARTICLE · 001")
│   │   ├── Prose.astro         the reading-measure wrapper for MDX bodies
│   │   └── Cursor.astro        the liquid "comet" cursor follower (one small inline island)
│   ├── styles/
│   │   ├── tokens.css          design tokens — the single source of palette/type/space
│   │   └── global.css          resets + base element styling
│   ├── lib/
│   │   └── pieces.ts           merge articles+projects into one sorted exhibition list
│   └── pages/
│       ├── index.astro         the gallery homepage
│       ├── writing/[...slug].astro   article pages
│       └── projects/[...slug].astro  project pages
└── README.md
```

The `src/content/` tree is the **content source of truth**. Everything else renders
it. Adding a piece = adding one `.mdx` file with frontmatter; nothing else to touch.

---

## 1. Positioning — the single idea

Everything on the site ladders up to one through-line. The full thinking lives in the
brain (`brain/concepts/the-through-line.md` and its links); in short:

> **Product is a craft — practised at the intersection of desirability, feasibility, and
> viability. The interesting question isn't how capable the models are (they're remarkable);
> it's how product gets *crafted* — through transdisciplinary design and generative/agentic
> AI — to keep people safe and secure, and help them thrive, in a world beset with change.**

**Tone: understated confidence.** Idea-first, never a CV. A product person so capable he
doesn't need to sell himself. Model capability matters but isn't *interesting* — the craft
is. (Reframed 2026-06-29 from an earlier "model capability / human experience / engineering
reality" framing — see `brain/decisions/`.)

The three lenses quietly double as three careers — surfaced as where each lens was learned,
never as a sales pitch:

| Lens | The question | Where it was learned |
|------|--------------|----------------------|
| **Desirability** | Does anyone actually want this? | ~10 years leading UX |
| **Feasibility** | Can it be built, and trusted? | ~10 years as a software engineer |
| **Viability** | Should it exist — and will it last? | product & strategy, now for AI |

The *how* is transdisciplinary design; the *leverage* is generative & agentic AI; the *why*
is keeping people safe and helping them thrive amid relentless change — grounded in the
security industry but far broader. The homepage states this in the **first few seconds**.

---

## 2. What this is (and is not)

**Is:** a small, curated exhibition. A handful (4–8 to start) of high-impact pieces.
Articles and projects sit **side by side as equals**. Each piece is presented as a
designed object, not a list row. The site is the portfolio *and* the proof.

**Non-goals (deliberate — do not build these):**
- ❌ No CMS, no newsletter, no subscriber/membership/auth layer.
- ❌ No chasing an audience or a publishing cadence.
- ❌ No chronological archive, no tag clouds, no "X days since last post" pressure.
- ❌ No infinite feed. Curation is the point; scarcity is a feature.

Articles ≠ a blog. Projects ≠ a case-study dump. Both are *exhibits*.

---

## 3. Content model

Two collections, **presented as equals**. Separate schemas (they carry different
metadata) but a shared visual language and a single merged exhibition list on the home
page.

**`articles`** (`src/content/articles/*.mdx`)
```yaml
title: string
dek: string            # one-line standfirst shown on the card and at the top
date: date             # authored/published date (ordering only — never shown as a feed)
draft: boolean         # default false; drafts excluded from build
featured: boolean      # eligible for the homepage exhibition
readingTime: string?   # optional override; else derived
accent: enum?          # which panel tint this piece claims (see DESIGN.md)
canonicalUrl: string?  # for Substack migration: original URL for rel=canonical
```

**`projects`** (`src/content/projects/*.mdx`)
```yaml
title: string
dek: string
year: string           # e.g. "2025" or "2024–25"
role: string           # e.g. "Product · Design · Build"
stack: string[]        # technologies/tools
date: date             # ordering only
draft: boolean
featured: boolean
accent: enum?
links: { label: string, href: string }[]?   # live, repo, writeup, etc.
```

- **URLs:** `/writing/<slug>` and `/projects/<slug>`. Clean, stable, portable.
- **Numbering:** catalogue numbers (`ARTICLE · 001` …) are a **chronological rank** within
  each kind — oldest = `001`. Stable identity, independent of where a piece sits.
- **Display order:** **newest first** (the most recent piece leads, top-left). An optional
  `order` field pins an item to the front; *The Right People* is pinned so it leads rather
  than the slightly-newer *This Portfolio* project.
- **MDX:** bodies are MDX so a single piece can host **one tasteful interactive or
  AI-powered moment** without leaving the writing flow (see DESIGN.md §"The one
  interactive moment"). Default pieces are pure prose.

---

## 4. Pages (v0.1 deliverables)

1. **Homepage** (`index.astro`) — the exhibition.
   - Blocky black **header bar** (TE EP-133 reference).
   - **Hero** that states the through-line in the first few seconds (turborepo-style
     confident landing, but editorial/serif, not SaaS).
   - **The Gallery** — 4–8 selected pieces, articles + projects interleaved as equals,
     each a designed `PieceCard` on its own subtle panel tint.
   - **Footer.** Sections are modular so more can be added later (the turborepo pattern).

2. **Article page** (`/writing/<slug>`) — article as designed object: big serif title,
   mono metadata, generous reading measure, surgical red-orange accents.

3. **Project page** (`/projects/<slug>`) — project as designed object: title + a mono
   masthead of metadata (year / role / stack / links), then content.

All three ship with **placeholder content** that is easy to find and replace.

---

## 5. Tech architecture

- **Astro + MDX**, static output. No server, no database, no client framework by
  default — islands only where an interactive moment genuinely earns it.
- **Content collections** with typed schemas (§3) → content stays clean and portable.
- **Self-hosted open-source fonts** (no external font CDN; speed + privacy + ownership).
- **Design tokens** in `src/styles/tokens.css` are the single source of truth for
  palette, type scale, and spacing — `DESIGN.md` documents them; nothing hard-codes
  colours.
- **Deployment:** static `dist/` — host anywhere (Netlify/Vercel/Cloudflare Pages/GitHub
  Pages). Target chosen at deploy time; nothing in the build assumes a host.
- **Performance budget:** near-zero JS. The only script is the liquid cursor
  (`Cursor.astro`, see DESIGN.md §7) — tiny and **inlined** into the HTML (no extra
  request), progressively enhanced so every page works fully without it. Ship fast,
  score high. The build quality is part of the argument.

### How to run
- `npm install` → `npm run dev` (local dev server, hot reload).
- `npm run build` → static site in `dist/`; `npm run preview` to serve the build.

---

## 6. Substack migration — DONE (content); redirects pending at deploy

The 7 articles were migrated **in full** from the Substack RSS feed (`/feed`, which carries
the complete post HTML for free posts): fetched raw, cleaned of platform chrome, converted
HTML → Markdown, and written as `.mdx` (see §7). One-off, no importer kept in the repo.

This site is **canonical** — articles carry no `canonicalUrl` back to Substack (the schema
field remains, optional, for any future case). All that remains is a **deploy concern**:
- **URL redirects** map old Substack paths `…/p/<slug>` → `/writing/<slug>`. Slugs were kept
  identical on purpose, so this is a 1:1 map (host-level redirect rules / a `_redirects` file
  depending on the host).
- Once redirects are live, retire the Substack publication or point it here.

---

## 7. Status & roadmap

**Now (v0.1 — building):** scaffold Astro + MDX; design tokens; the blocky black header
bar; the gallery homepage stating the through-line; one article page and one project
page as designed objects, all with replaceable placeholder content.

**Migrated (v0.1):** all 7 Substack articles are migrated **in full** from the RSS feed —
real prose, headings normalised so each piece's top section heading is an `<h2>`, external
citations kept, reading times computed from word count. (The Substack YouTube embeds were
dropped.) **No `canonicalUrl` and no Substack references** — this site is
canonical, and platform-coupled CTAs ("subscribe", "drop a comment") were removed to match
the non-goals (§2). Slugs match the old Substack slugs so the redirects are 1:1. Wordmark
is the serif-italic `DJC` monogram.

**Next:**
- At deploy: add **Substack → site redirects** (slugs already align 1:1) to preserve SEO.
- Proofread the migrated prose (migrated close to verbatim; a stray original typo or two
  may survive, e.g. "governanc").
- Curate the homepage: `featured: true` + `order:` control the exhibition (it shows
  featured pieces only). Confirm which pieces lead and in what order.
- One real project (This Portfolio) is in; add further projects as equals.
- Consider whether any single piece earns a bespoke interactive moment beyond the embeds.
- Build the *one* tasteful interactive moment for a single flagship piece.
- About section / colophon (the craft argument, made explicit).
- OG images + favicon + metadata polish; Lighthouse pass.
- Substack migration + redirect map (per §6) when ready.

**Open questions:**
- Site/wordmark name treatment (full name vs. monogram in the header bar).
- Whether projects and articles ever get a dedicated index beyond the homepage gallery.
- Which piece earns the first interactive moment.

---

## 8. Key links
- Design system: [DESIGN.md](DESIGN.md)
- Aesthetic direction: **A — The Quiet Journal** (editorial monochrome serif), with a
  blocky black header bar (teenage.engineering EP-133) and subtly multi-coloured panels
  over an off-white base `rgb(251, 250, 247)`. Structure echoes turborepo.dev.
- Tokens: [src/styles/tokens.css](src/styles/tokens.css)
- Content: `src/content/articles/`, `src/content/projects/`
