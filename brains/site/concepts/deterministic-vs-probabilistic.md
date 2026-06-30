---
type: Concept
title: "Deterministic vs Probabilistic"
description: "Generative AI is probabilistic; control systems are deterministic — design for both."
aliases: ["AI Proposes, the Engine Disposes"]
tags: [ai, security, safety]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

A distinction that should anchor AI decisions, especially where stakes are high. Today's generative AI is *probabilistic* — extraordinary at interpreting intent, but occasionally wrong in ways you can't fully predict. Traditional control systems are *deterministic* — the same inputs always produce the same auditable output. That predictability is a feature, not something to modernise away: it's why a system can be trusted with people's safety.

# The design principle

Don't replace deterministic guarantees with probabilistic ones. Instead: **the AI proposes; the deterministic engine disposes.** Intelligence sits on top of guarantees, never underneath them. An agent can reason about a situation and recommend an action in seconds — but the action runs through the same hardened, auditable rules a human operator's would. This is the spine of using AI to keep people [safe](./safe.md) and [secure](./secure.md).

# Core idea

Use probabilistic AI for intent and judgement; keep deterministic systems for guarantees.

# Related

- [Agentic AI](./agentic-ai.md)
- [Secure](./secure.md)
- [Safe](./safe.md)
- [Feasibility](./feasibility.md)
