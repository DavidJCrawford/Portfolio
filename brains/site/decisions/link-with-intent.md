---
type: Decision
title: "Link with Intent"
description: "Every edge in the brain is a claim: five link relations, curated Related lists, inline links for softer context."
tags: [decision, brain, okf, curation]
timestamp: 2026-07-02T00:00:00Z
---

# Summary

The [brain graph](../technical/brain-graph.md) draws its edges from each note's `# Related` section only — inline body links create no edges. So a Related list is a claim about structure, and it deserves the same [curation](../concepts/curation.md) as anything else here: every edge should mean something, and be explainable from the note's body.

# Decision

An edge asserts one of five relations:

1. **Frame ↔ member** *(mutual)* — a framework and the concepts inside it, e.g. the [3 Lenses](../concepts/the-3-lenses-of-innovation.md) and each lens.
2. **Sibling ↔ sibling** *(mutual)* — members of one frame that define each other by contrast, e.g. [desirability](../concepts/desirability.md) / [feasibility](../concepts/feasibility.md) / [viability](../concepts/viability.md), or the strategy trio.
3. **Person ↔ their idea** *(mutual)* — a thinker and the concept they originated.
4. **Builds-on / uses** *(one-way)* — the using note points at the used one; hubs don't point back. The asymmetry is deliberate: the graph is undirected, so the edge exists either way, and hub notes stay short.
5. **Enacts** *(one-way)* — a decision points at the concepts it enacts; a technical note points at the decision it implements.

Guardrails: Related lists stay roughly 3–8 entries ([less, but better](../concepts/less-but-better.md)); weaker or contextual connections stay inline in the body, deliberately edge-free; and an edge that can't be explained from the body is removed — or the body earns it.

# Rationale

Without semantics, links accrete until the graph is a hairball rather than a map. A small vocabulary of relations keeps it legible — for people exploring the graph and for agents reading the bundle — and gives every future note a checklist instead of a vibe.

# Related

- [The Brain Graph](../technical/brain-graph.md)
- [The Brain (OKF Bundle)](../technical/the-okf-brain.md)
- [Curation](../concepts/curation.md)
- [Less, but Better](../concepts/less-but-better.md)
