---
type: Technical Note
title: "Block Layout"
description: "The blocks-on-white system and the responsive exhibition grid."
tags: [layout, css, design]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The page is warm off-white blocks on a white field, documented in `DESIGN.md`. A full-bleed black [header bar](./glitch-wordmark.md) and footer act as structure; the content blocks use the single `--paper` fill and are separated by white `--block-gap` gutters. A centred shell (`--page-max`) frames the header, gallery and footer.

# The exhibition grid

The homepage gallery is a responsive tile grid that steps from four columns to two to one as the viewport narrows. The whitespace around the exhibition header is deliberately equalised — the gap maths in `Gallery.astro` subtracts the landing block-gap so the space above and below the header reads as identical. On mobile the hero lens line (viability // desirability // feasibility) stacks into three rows, while the desktop single-line layout is preserved.

# Core idea

One block colour, white gutters, and a grid that quietly collapses with the viewport.

# Related

- [Design Tokens](./design-tokens.md)
- [Content Model & Ordering](./content-model.md)
- [Typography](./typography.md)
