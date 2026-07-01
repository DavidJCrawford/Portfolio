---
type: Technical Note
title: "The Brain Graph"
description: "The /brain page: an Obsidian-style node graph that reads the brain live from the Markdown."
tags: [brain, visualisation, svg, interaction]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The `/brain` page renders the OKF bundles as an interactive, force-directed node graph — one node per note, edges from each note's `# Related` links. It reads the [brain](./the-okf-brain.md) *live*: a build step (an Astro integration) copies every `brains/**/*.md` into `public/brain/` with a `manifest.json`, and the page fetches and parses them in the browser at load. So the graph is the same source agents read — add a note, rebuild, and it appears with no code changes (see [Read the Brain Live](../decisions/read-the-brain-live.md)).

# How it's built

A hand-rolled force simulation (repulsion + link springs + centring, with alpha cooling) lays out ~60 nodes in SVG — no graph library. Nodes reveal one at a time on load; hovering or selecting a node morphs it into a goo blob, dims everything more than one link away, and turns its neighbours into small blobs. The blobs reuse the same SVG goo filter as the [comet cursor](./liquid-cursor.md), which also gains a magnetic pull over the canvas. Clicking a node opens a drawer that renders the note's Markdown body, with the in-body links clickable to jump between nodes.

# Static-friendly

It stays static: the sync runs at build time, the fetches are same-origin, and it works on GitHub Pages with no server. There's a no-JS fallback that lists every note, and the page is a dark, single-viewport exception to the site's light theme.

# Core idea

The site reads its own brain: the graph, the served notes, and the agent-readable source are one and the same.

# Related

- [The Brain (OKF Bundle)](./the-okf-brain.md)
- [Read the Brain Live](../decisions/read-the-brain-live.md)
- [Knowledge as Leverage](../concepts/knowledge-as-leverage.md)
- [Liquid Comet Cursor](./liquid-cursor.md)
- [Design Tokens](./design-tokens.md)
