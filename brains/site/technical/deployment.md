---
type: Technical Note
title: "Deployment & Base Path"
description: "GitHub Pages via Actions, served from the /Portfolio subpath with a base-aware URL helper."
tags: [deployment, github-pages, ci]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The site deploys to GitHub Pages through a GitHub Actions workflow (`.github/workflows/deploy.yml`, using `withastro/action` and `actions/deploy-pages`) that runs on every push to `main`.

# The base path

Pages serves the site from the `/Portfolio` subpath, so `astro.config.mjs` sets `base: '/Portfolio'` and a small `withBase()` helper (`src/lib/url.ts`) prefixes every internal link. Imported assets such as the [fonts](./typography.md) are fingerprinted and base-rewritten by Vite automatically. One dev-only note: this environment's native file events don't reach Astro's watcher, so the config turns on watch polling — it has no effect on the production build.

# Core idea

Push to main, Actions builds, Pages serves it from a subpath every link is aware of.

# Related

- [Architecture & Stack](./architecture.md)
- [Typography](./typography.md)
- [Progressive Enhancement](./progressive-enhancement.md)
