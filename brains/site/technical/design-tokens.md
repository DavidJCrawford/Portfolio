---
type: Technical Note
title: "Design Tokens"
description: "One source of truth for colour, type and space — no hard-coded values in components."
tags: [css, design-system, tokens]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

`src/styles/tokens.css` is the single source of truth for colour, type and space, documented in `DESIGN.md`. The rule is plain: components never hard-code a value, they reach for a token. Colour is ink on white — `--bg` pure white, a single warm block fill `--paper` (#fbfaf7), `--ink` for text, `--black` (#0b0b0a) for structural fills like the [header](./glitch-wordmark.md) and footer, and `--accent` (#ff4b33) for emphasis only.

# The scales

Type is a fluid scale built on `clamp()` (from `--fs-display` down to `--fs-label`) so sizes track the viewport without breakpoints. Space runs `--space-1` through `--space-8`; layout tokens set the shell width (`--page-max`, 1360px), the reading measure (`--measure`, 66ch), the header height and the white `--block-gap` between blocks. Motion is deliberately tiny — one easing curve and a 170ms duration.

# Core idea

Change the system in one file and every block, rule and label follows.

# Related

- [Architecture & Stack](./architecture.md)
- [Typography](./typography.md)
- [Block Layout](./block-layout.md)
- [Progressive Enhancement](./progressive-enhancement.md)
