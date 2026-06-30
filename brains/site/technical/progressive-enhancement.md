---
type: Technical Note
title: "Progressive Enhancement & Accessibility"
description: "Zero-JS content, enhancements gated on capability, and the one deliberate contrast tradeoff."
tags: [accessibility, performance, progressive-enhancement]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

Content pages work with no JavaScript at all. The two scripted pieces — the [comet cursor](./liquid-cursor.md) and the [wordmark glitch](./glitch-wordmark.md) — are enhancements, each gated on a fine pointer and on `prefers-reduced-motion`, so touch and reduced-motion users never load the behaviour. The markup is semantic, there is a skip link, the cursor is `aria-hidden`, and the wordmark carries an `aria-label`.

# The one knowing tradeoff

The brand accent #ff4b33 on white sits at roughly 3.2:1, below WCAG AA for small text. It's kept as a deliberate brand decision and used for emphasis — rules, hovers, the glitch — never for body copy; primary text is `--ink` on white, which passes comfortably.

# Core idea

The content needs no script; the personality is layered on top and degrades cleanly.

# Related

- [Liquid Comet Cursor](./liquid-cursor.md)
- [Glitch Wordmark](./glitch-wordmark.md)
- [Design Tokens](./design-tokens.md)
- [Deployment & Base Path](./deployment.md)
