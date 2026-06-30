---
type: Concept
title: "Specifying AI for Security"
description: "A practical checklist for putting AI into a security system — the do's and don'ts."
aliases: ["The Do's and Don'ts"]
tags: [security, ai, practice, checklist]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The article's practical guidance for anyone specifying AI in a security system today. It follows directly from the [two-layer architecture](./two-layer-architecture.md): use AI for intent and judgement, and keep deterministic systems for the guarantees.

# Do

- **Build the deterministic spine first** — every access, alarm and life-safety decision runs through auditable rules that behave identically every time; AI sits on top, never underneath.
- **Keep a human in the loop where the stakes are highest** — confident AI for low and medium-risk work, stronger review and lower autonomy on the security-critical paths.
- **Demand transparency** — if you can't answer “why did the system do that?”, you have a guess, not a security system. Every AI-assisted decision should be explainable and logged.
- **Own your deployment model** — cloud, on-premise or at the edge on the controller, set by your risk profile rather than a vendor's billing model.
- **Treat your data as an asset and a liability** — be deliberate about what you capture, where it lives, who can see it, and how long you keep it.

# Don't

- **Don't buy “AI” as a feature** — a clever camera is a gadget; a [platform](./future-proof-architecture.md) is what lasts a decade.
- **Don't expect AI to fix a weak operation** — it accelerates whatever you already have, so a messy operation with AI bolted on is just a faster mess.
- **Don't normalise invasiveness** — that a model *can* watch, score and profile everyone in your lobby does not mean it should.
- **Don't let the probabilistic layer make deterministic promises** — if a decision must be right every time, it belongs to the engine, not the AI.

# Core idea

Use AI for judgement, keep the guarantees deterministic, and stay honest about deployment, data and explainability.

# Related

- [The Two-Layer Architecture](./two-layer-architecture.md)
- [Future-Proof Architecture](./future-proof-architecture.md)
- [Deterministic vs Probabilistic](../../site/concepts/deterministic-vs-probabilistic.md)
- [Safe](../../site/concepts/safe.md)
- [Secure](../../site/concepts/secure.md)
