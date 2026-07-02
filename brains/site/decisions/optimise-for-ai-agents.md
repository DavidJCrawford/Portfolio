---
type: Decision
title: "Optimise the Site for AI Agents"
description: "Make the site legible and actionable for AI agents acting on behalf of humans — not just for human readers."
tags: [decision, ai, agents, geo]
timestamp: 2026-07-02T00:00:00Z
---

# Summary

Design the site for a world where [agents act on people's behalf](../concepts/agents-acting-for-humans.md). When a human asks their agent "what does David think about moats after AI?", the agent should be able to fetch a clean, accurate answer — so the site publishes the machine-readable surfaces that make that possible (see [Agent Legibility](../technical/agent-legibility.md) for the how).

# Decision

Ship the standard, dependency-free legibility surfaces, all generated at build time from the content collections so they never drift from the site: a `robots.txt` that welcomes reputable AI crawlers and points to the sitemap; a `sitemap.xml`; an `llms.txt` curated map plus an `llms-full.txt` full-text corpus; JSON-LD (`Person` / `WebSite`, and `BlogPosting` / `CreativeWork` per page); and a raw-Markdown twin of every article. No new dependencies — the same build-time pattern already used to serve the [brain](../technical/the-okf-brain.md).

# Rationale

It walks the talk. The site argues that [knowledge is the leverage point](../concepts/knowledge-as-leverage.md), so the site's own knowledge is made legible — the exact move as [reading the brain live](./read-the-brain-live.md) and [publishing it](./publish-the-brain-publicly.md): *the site reads its own brain, and so can an agent.* Being answered accurately, with attribution, beats being paraphrased from a stale cache. And it is a small, honest instance of the broader thesis — if agents are going to act for people, the things they act on should be legible and truthful.

One honest limit: `robots.txt` and `llms.txt` are root-domain conventions, so they are only fully authoritative once the site lives on its own root domain (davidjcrawford.com); the sitemap, JSON-LD and Markdown twins work fully at the current `/Portfolio` subpath today.

# Related

- [Agents Acting on Behalf of Humans](../concepts/agents-acting-for-humans.md)
- [Agent Legibility](../technical/agent-legibility.md)
- [Knowledge as Leverage](../concepts/knowledge-as-leverage.md)
- [Read the Brain Live](./read-the-brain-live.md)
- [Publish the Brain Publicly](./publish-the-brain-publicly.md)
