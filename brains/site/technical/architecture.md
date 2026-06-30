---
type: Technical Note
title: "Architecture & Stack"
description: "How the site is built: Astro + MDX, static output, content collections, near-zero client JavaScript."
tags: [architecture, astro, stack]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The site is Astro 5 with the MDX integration, built to static output — there is no SSR adapter, so `astro build` emits a `dist/` of plain files that deploy anywhere. Writing and projects are [content collections](./content-model.md) defined in `src/content.config.ts` and loaded from MDX through Astro's glob loader. Pages ship as HTML and CSS with almost no client JavaScript; the only scripts are the [comet cursor](./liquid-cursor.md) and the [wordmark glitch](./glitch-wordmark.md), both [progressive enhancements](./progressive-enhancement.md).

# Layout of the repo

`src/layouts/` holds the page shells (Base, Article, Project), `src/pages/` holds the index and the `writing/[...slug]` and `projects/[...slug]` routes, `src/components/` holds the header, footer, gallery and cards, and `src/styles/` holds the [tokens](./design-tokens.md), global CSS and the self-hosted [fonts](./typography.md). Lower-level implementation detail lives in the repo's `spec.md` and `DESIGN.md`.

# Core idea

Static, owned and lean — a build that depends on no platform at runtime.

# Related

- [Design Tokens](./design-tokens.md)
- [Content Model & Ordering](./content-model.md)
- [Deployment & Base Path](./deployment.md)
- [Progressive Enhancement](./progressive-enhancement.md)
- [Feasibility](../concepts/feasibility.md)
