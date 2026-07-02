---
type: Concept
title: "The Two-Layer Architecture"
description: "A deterministic workflow engine at the foundation, an AI orchestration layer on top — and the order matters."
aliases: ["AI Proposes, the Engine Disposes", "Workflow Engine + Orchestration Layer"]
tags: [security, ai, architecture]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

The load-bearing idea of the article. AI in security works as two layers, and the order matters enormously. At the foundation sits a **deterministic workflow engine** — the rule-bound, auditable spine that actually executes: it decides what is allowed, enforces it identically every time, integrates with the physical estate, and leaves a trail you can prove to an auditor or a court. Above it sits an **AI orchestration layer** — the agentic, intent-driven part that interprets what an operator is trying to do, reasons across messy real-world signals, and orchestrates the workflows beneath it.

# How the layers relate

**The AI proposes; the deterministic engine disposes.** Intelligence sits on top of guarantees, never underneath them. An agent can reason about a 2 a.m. door-forced alarm, correlate it with a contractor schedule, and recommend an action in seconds — but the action runs through the same hardened, deterministic rules that would have governed a human operator. Nothing the AI does escapes the rails. This is the article's expression of [deterministic vs probabilistic](../../site/concepts/deterministic-vs-probabilistic.md) design for [secure](../../site/concepts/secure.md) systems, with [agentic AI](../../site/concepts/agentic-ai.md) as the orchestration layer.

# Build the spine first

Because the order matters, the unglamorous priority is the workflow engine first. You can't safely bolt an orchestration layer onto a building until the deterministic foundation it orchestrates is genuinely robust. Get the order wrong and you've built an expensive way to make confident mistakes at machine speed.

# Core idea

Guarantees underneath, intelligence on top — and build the guarantees first. Explored at length in [The Right People, at the Right Time](https://davidjcrawford.github.io/Portfolio/writing/the-right-people-at-the-right-time/).

# Related

- [Future-Proof Architecture](./future-proof-architecture.md)
- [Specifying AI for Security](./specifying-ai-for-security.md)
- [The Promoted Doorman](./the-promoted-doorman.md)
- [Deterministic vs Probabilistic](../../site/concepts/deterministic-vs-probabilistic.md)
- [Secure](../../site/concepts/secure.md)
- [Agentic AI](../../site/concepts/agentic-ai.md)
