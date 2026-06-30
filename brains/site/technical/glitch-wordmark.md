---
type: Technical Note
title: "Glitch Wordmark"
description: "The DJC monogram's chromatic-split glitch, driven by JS-set CSS custom properties."
tags: [interaction, css, animation]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The `DJC` monogram in `HeaderBar.astro` is a serif-italic near-twin of the favicon. Behind the crisp white text sit two ghost copies, drawn as `::before` and `::after` pseudo-elements — one light grey, one accent. While the pointer is over the black header, the ghosts jitter into a chromatic-split glitch.

# How JS drives the pseudo-elements

JavaScript can't style a pseudo-element directly, so a `requestAnimationFrame` loop sets CSS custom properties on the wordmark (`--ax`/`--ay`/`--aclip`, and the matching `b` set) that the ghosts read for their offset and clip band. The cadence is irregular — occasional larger bursts and brief calm stutters — so it never looks like a tidy loop. Reduced-motion users get a faint static split with no animation.

# Core idea

Two offset ghost layers behind the text, nudged erratically, read as a glitch.

# Related

- [Liquid Comet Cursor](./liquid-cursor.md)
- [Typography](./typography.md)
- [Progressive Enhancement](./progressive-enhancement.md)
