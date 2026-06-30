---
type: Technical Note
title: "Liquid Comet Cursor"
description: "The comet cursor: an SVG goo filter over a lagging chain of circles, with colour states."
tags: [interaction, svg, animation]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The site's one interactive flourish lives in `Cursor.astro`. A chain of seven SVG circles is rendered through a goo filter — a Gaussian blur followed by an `feColorMatrix` alpha threshold that fuses overlapping circles into a single liquid shape. The lead circle eases toward the pointer and each following circle chases the one ahead, which produces a lagging comet.

# The details that make it feel right

An inter-circle gap clamp (12px) pulls links back in on fast moves, so the goo never visibly splits apart. Colour is stateful: black while chasing over light areas, white while passing over the black header or footer (their on-screen positions are re-measured on scroll and resize), then a morph to #ff4b33 with a subtle idle wobble once the pointer has been still for about 500ms. The animation loop pauses while the tab is hidden.

# Core idea

A lagging chain plus a goo filter reads as a single liquid comet.

# Related

- [Glitch Wordmark](./glitch-wordmark.md)
- [Progressive Enhancement](./progressive-enhancement.md)
- [Design Tokens](./design-tokens.md)
