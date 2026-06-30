# Portfolio

A curated exhibition — David Crawford's personal site. Gallery, not feed.

- **What & why:** [spec.md](spec.md)
- **How it looks (design system):** [DESIGN.md](DESIGN.md)

## Develop

```bash
npm install
npm run dev      # local dev server, hot reload
npm run build    # static site → dist/
npm run preview  # serve the built site
```

## Add a piece

Drop one `.mdx` file into `src/content/articles/` or `src/content/projects/`
with the frontmatter from the schemas in [src/content.config.ts](src/content.config.ts).
Set `featured: true` and an `order:` to place it in the homepage exhibition.
Nothing else to wire up.

Stack: Astro + MDX, self-hosted Newsreader + IBM Plex Mono, design tokens in
`src/styles/tokens.css`. Static, fast, owned.
