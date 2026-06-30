# Portfolio — Design System

> Aesthetic direction **A: The Quiet Journal** — editorial monochrome. The beauty
> lives in typography that's been agonised over, generous whitespace, a tiny
> disciplined palette, and precise rhythm. Restraint, not decoration: this audience
> is suspicious of ornament. Editorial confidence over flourishes. **One genuinely
> tasteful interactive moment beats a dozen animations.**
>
> Two borrowed structural moves: a **blocky black header bar** (teenage.engineering
> EP-133) and the page composed as **discrete uniform blocks** — warm off-white
> `rgb(251, 250, 247)` panels floating on a **pure-white** field (the EP-133 panel
> rhythm, reduced to a single tone). Landing-page *structure* echoes turborepo.dev
> (confident hero → modular sections → footer).

> See also: [spec.md](spec.md) (what & why), [src/styles/tokens.css](src/styles/tokens.css)
> (the tokens this document defines, in code).

`tokens.css` is the **single source of truth** for colour, type, and space. This file
explains the *intent*; the CSS is the *implementation*. Never hard-code a colour or a
size in a component — reach for a token, and if one doesn't exist, add it here first.

---

## 1. Principles (the rules that keep it disciplined)

1. **Restraint is the aesthetic.** If a flourish doesn't carry meaning, cut it. White
   space is a design element, not emptiness to fill.
2. **Typography does the work.** Hierarchy comes from size, weight, optical size, and
   space — almost never from colour or boxes.
3. **A tiny palette, used surgically.** Ink on a white page. Content lives in uniform
   warm off-white *blocks* floating on that white. Black for structure. One accent, for
   emphasis only. That's the whole kit — no decorative colour, no multi-tint.
4. **Rhythm and alignment are non-negotiable.** Everything sits on a consistent vertical
   rhythm and a shared measure. Misalignment is the most visible failure here.
5. **Articles and projects are equals.** Same card language, same dignity.
6. **The build is the argument.** Fast, accessible, near-zero JS, clean markup. A peer
   who views source should be impressed by the restraint there too.

---

## 2. Colour — blocks on white

The page background is **pure white `#FFFFFF`**. Content sits in **uniform blocks of warm
off-white `rgb(251, 250, 247)` (`#FBFAF7`)** — *every* block is the same colour; the white
shows through as the gutters between them (the EP-133 panel rhythm, reduced to one tone).
Black is reserved for *structure* (the header bar, footer). The accent (vivid red-orange) appears
only for emphasis. The block↔page contrast is deliberately whisper-quiet (~2%); the blocks
are felt more than seen, and **the white gutter (`--block-gap`) is what reads them apart**.

| Token | Value | Role |
|-------|-------|------|
| `--bg` | `#FFFFFF` | the page background — pure white |
| `--paper` | `#FBFAF7` | the single block / panel fill (hero, every card, about) |
| `--paper-hover` | `#F4F1EA` | block hover — a hair warmer/darker than `--paper` |
| `--ink` | `#1A1A18` | primary text |
| `--ink-soft` | `#615C52` | secondary text, captions, metadata |
| `--rule` | `rgba(26,26,24,0.14)` | hairline rules (dividers within blocks) |
| `--rule-strong` | `rgba(26,26,24,0.28)` | stronger hairlines |
| `--black` | `#0B0B0A` | the header bar, footer, blocky structure |
| `--on-black` | `#FBFAF7` | text on black structures |
| `--accent` | `#FF4B33` | vivid red-orange — links, emphasis marks, the one accent |
| `--accent-hover` | `#E63A22` | accent hover/active |

No multi-tint palette: the earlier clay/sage/mist/blush washes are retired. If a block ever
needs to stand apart, do it with the **gutter and alignment**, not a second colour. (The
`accent` frontmatter field is currently inert; kept optional for possible future use.)

---

## 3. Typography

Three voices, each with one job. **Bold, blocky, modern sans for display** (the dd.nyc
influence); a characterful serif for reading; a mono for small labels. The contrast —
heavy sans headline → serif body — is the look.

- **Display — [Inter](https://fonts.google.com/specimen/Inter)** (OFL, self-hosted
  variable, Latin). The bold, blocky, modern grotesque: hero statement, all headings
  (`h1`–`h4`, including in prose), and card titles. Set **heavy and tight** — weight 700,
  800 for the hero; negative tracking (`-0.02` to `-0.032em`); near-1.0 line-height on the
  hero. This is where the confidence lives.
- **Serif — [Newsreader](https://fonts.google.com/specimen/Newsreader)** (OFL,
  self-hosted variable, optical sizing). The reading voice: article/project **body**,
  **deks** (italic), the hero **sub-line**. Keeps long-form readable and warm under the
  bold sans. Also the serif-italic **`DJC`** wordmark (a brand mark; matches the favicon).
- **Mono — [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)** (OFL,
  self-hosted, Latin). Eyebrows/kickers, section numbers, metadata, nav. UPPERCASE,
  positive letter-spacing.

> All self-hosted from `public/fonts/` (Inter + Newsreader as variable woff2, declared in
> `src/styles/fonts.css`; IBM Plex Mono via `@fontsource` Latin imports) — no external
> font CDN, Latin subsets only.

### Type scale (fluid, generous)
A modular scale; display sizes are deliberately large (editorial confidence). Defined as
`clamp()` tokens in `tokens.css`:

| Token | Range (min → max) | Use |
|-------|-------------------|-----|
| `--fs-display` | `2.6rem → 4.5rem` | hero through-line statement |
| `--fs-h1` | `2.1rem → 3.1rem` | article/project titles |
| `--fs-h2` | `1.5rem → 2rem` | section headings |
| `--fs-h3` | `1.2rem → 1.4rem` | sub-headings, card titles |
| `--fs-dek` | `1.15rem → 1.4rem` | standfirsts / deks (often italic) |
| `--fs-body` | `1.0625rem → 1.15rem` | reading body |
| `--fs-label` | `0.75rem → 0.8125rem` | mono eyebrows/metadata (uppercase, tracked) |

### Reading rules
- **Measure:** body text capped at `--measure: 66ch` (≈ the comfortable line length).
- **Leading:** body `line-height: 1.65`; display `1.05–1.1`.
- **Headings** are serif, weight ~500–600 (not black); let optical size + space create
  weight, not heaviness.
- **Emphasis** in running text uses *italic* and the accent colour, not bold. (Display
  headings are the deliberate exception — they're heavy by design.)
- **Hanging punctuation / true quotes / ligatures** on. Numbers can use the serif's
  oldstyle figures in prose, tabular/mono in metadata.

---

## 4. Space & rhythm

One spacing scale, used everywhere. Vertical rhythm is consistent; sections breathe.

| Token | Value | |
|-------|-------|--|
| `--space-1` | `0.5rem` | |
| `--space-2` | `0.75rem` | |
| `--space-3` | `1rem` | |
| `--space-4` | `1.5rem` | |
| `--space-5` | `2.5rem` | |
| `--space-6` | `4rem` | section padding (small screens) |
| `--space-7` | `6rem` | section padding (large screens) |
| `--space-8` | `9rem` | major section breaks |

- `--page-max: 1200px` for the shell; content/reading wrappers use `--measure` (66ch).
- Section vertical padding scales `--space-6 → --space-8` with viewport.
- Generosity is the default. When unsure, add space.

---

## 5. The blocky black header bar (EP-133)

A full-width, solid **`--black`** bar pinned to the top — tall and confident, not a thin
SaaS nav.

- Height ≈ `64–72px`; full-bleed black; `--on-black` text; no shadow.
- **Left:** wordmark — **`DJC`**, a *serif-italic monogram* (`--serif`, italic) sized
  ~1.5rem: a near-twin of the "D" favicon. This is the one place serif appears in the
  bar — a small brand mark against the mono chrome. (Professional name: David J Crawford.)
  On **header hover** it does a pure-CSS **chromatic-split glitch**: light-grey + `--accent`
  ghost layers (`::before`/`::after`, blurred) jitter behind the steady white text via
  `clip-path` keyframes. Decorative; disabled under `prefers-reduced-motion`.
- **Right:** nav links stay in **mono**, uppercase, small — e.g. `WRITING · PROJECTS · ABOUT`
  (only those that exist). Active/hover uses underline or the accent, sparingly.
- Optional thin accent or hairline at the very bottom edge of the bar; otherwise the
  contrast against `--paper` is the divider.
- It reads as a piece of **equipment** — blocky, utilitarian, precise — against the soft
  editorial paper below. That tension is the whole point.

The **footer** mirrors it: a `--black` block closing the page, mono links, a colophon
line naming the stack (the craft argument, quietly stated).

---

## 6. Components & layout

- **Block layout (TE EP-133 store).** The landing is a vertical stack on the white field,
  with a consistent white `--block-gap` between everything:
  - The **hero** and **about** are **full-bleed** `--paper` blocks — the colour runs edge to
    edge of the viewport (the TE top banner). Their *content* sits in the `--page-max` shell
    so it aligns with the header bar and the gallery grid.
  - The **gallery** is a grid of `--paper` tiles within the shell — **4 across → 2 → 1**,
    `gap` = `--block-gap`. The white gutter is what reads the tiles apart (block↔page contrast
    is only ~2%).
- **Hero.** Full-bleed block. Mono eyebrow (`PORTFOLIO`), then the through-line as a large
  serif statement (`--fs-display`), then a one-line identity sub-statement. Left-aligned.
  States the single idea in the first few seconds.
- **Gallery.** The exhibition: a light label on the white field, then the tile grid, articles
  and projects interleaved by curatorial order. Every tile is the same `--paper` block.
- **PieceCard (TE tile).** A designed object: **centred**, tall, generous whitespace.
  - Mono **eyebrow**: kind + number, e.g. `ARTICLE · 001` / `PROJECT · 001`.
  - Serif **title** (`--fs-h3`, balanced) + italic **dek** (`--ink-soft`).
  - Pinned to the bottom (where TE puts "add to cart"): a mono **meta** line (year ·
    reading-time / role) and a mono **action** — `READ →` (article) / `VIEW →` (project).
  - Whole tile is the link; hover warms the block (`--paper-hover`) and reveals the title
    underline + accent on the action — no shadows, no scale jumps.
- **Article object.** Centered reading column at `--measure`. Mono metadata line
  (date · reading time) under a serif title and italic dek; a hairline; then prose.
  Drop-cap or raised first line optional (one, tasteful). Links in the accent colour with a subtle
  underline. Pull-quotes and footnotes styled but rare.
- **Project object.** Same frame, but a mono **masthead** block of metadata — `YEAR /
  ROLE / STACK / LINKS` — sits between title and body, like a museum placard.
- **Prose wrapper** (`Prose.astro`) owns all MDX body styling so every article/project
  reads identically: spacing between elements on the rhythm, headings, lists, code,
  blockquotes, figures/captions.

---

## 7. Motion & interaction

- Default: **almost none.** Maybe a 150–200ms ease on link/accent state changes.
  Respect `prefers-reduced-motion` everywhere.
- No parallax, no scroll-jacking, no entrance animations on the gallery.
- **The signature: a liquid "comet" cursor** (`Cursor.astro`). A short chain of lagging
  circles under an SVG goo filter follows the pointer: black and elongated while *chasing*
  (the comet), morphing to an **`#FF4B33`** blob that subtly undulates once it *catches up*.
  Progressive enhancement only — gated on `(hover: hover) and (pointer: fine)` and
  `prefers-reduced-motion`; it sits *under* the native cursor (never replaces it) and is the
  site's one bit of always-on motion. This is the dd.nyc-leaning playful counterweight to the
  otherwise still page.
- **The one (per-piece) interactive moment.** A single flagship piece may host *one* tasteful,
  meaningful interactive or AI-powered moment (an Astro island), authored inline in its
  MDX. It must (a) serve the argument of that piece, (b) degrade gracefully, (c) ship no
  JS to any other page. This is the "show, don't tell" of the through-line — restraint
  makes the one moment land. Document each one in `spec.md` when built.

---

## 8. Accessibility & quality bar

- Colour contrast meets WCAG AA for all text (ink on the `--paper` block and on white;
  on-black in the bar). Re-verify if the block/page tones change.
- Real semantic HTML; one `<h1>` per page; visible focus states (accent ring).
- Keyboard-navigable; reduced-motion honoured; `<time datetime>` for dates.
- Lighthouse: aim 100s. Near-zero JS on content pages. The performance *is* the craft.
