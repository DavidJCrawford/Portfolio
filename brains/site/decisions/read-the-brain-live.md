---
type: Decision
title: "Read the Brain Live"
description: "Serve each brain note as its own route and build the graph from those files at load, so the graph is the agent-readable source."
tags: [decision, brain, architecture]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The [brain graph](../technical/brain-graph.md) reads the Markdown live in the browser rather than embedding a pre-built graph: a build step serves every note at `/brain/<path>.md` with a manifest, and the page fetches and parses them at load.

# Decision

Serve each note as its own static route and build the graph from those exact files. Keep it static (works on GitHub Pages, no server); regenerate the served copy and manifest as part of the build so adding a note needs no code change; keep a no-JS fallback listing every note.

# Rationale

It makes the graph and the agent-readable source one and the same — no embedded copy that can drift from the notes — which is the point of [knowledge as leverage](../concepts/knowledge-as-leverage.md): the site reads its own brain, and so can an agent. The one cost is that discovering new files still needs a rebuild (a static host has no directory listing), which the normal push-to-deploy flow covers.

# Related

- [The Brain Graph](../technical/brain-graph.md)
- [The Brain (OKF Bundle)](../technical/the-okf-brain.md)
- [Knowledge as Leverage](../concepts/knowledge-as-leverage.md)
- [Publish the Brain Publicly](./publish-the-brain-publicly.md)
