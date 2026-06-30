---
type: Technical Note
title: "Typography"
description: "Three self-hosted, Latin-subset families: Inter display, Newsreader serif, IBM Plex Mono labels."
tags: [typography, fonts, performance]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

Three families do the work. Inter Variable is the bold, blocky display face for headings, the hero and card titles. Newsreader Variable is the serif for body prose and deks, in normal and italic, and it supplies the italic `DJC` monogram in the header. IBM Plex Mono sets the small uppercase, letter-spaced labels and eyebrows.

# Self-hosting

All three are self-hosted and Latin-subset, for both weight and speed. The Inter and Newsreader woff2 files sit in `src/styles/fonts/` rather than `public/`, so Vite fingerprints them and rewrites their URLs under the [base path](./deployment.md); `fonts.css` declares them by hand with a `unicode-range` that already covers the em-dashes and curly quotes the prose uses. Everything loads with `font-display: swap`.

# Core idea

Own the type, ship only Latin, and let the display face carry the personality.

# Related

- [Design Tokens](./design-tokens.md)
- [Architecture & Stack](./architecture.md)
- [Deployment & Base Path](./deployment.md)
