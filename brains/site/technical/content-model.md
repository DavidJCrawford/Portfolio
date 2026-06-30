---
type: Technical Note
title: "Content Model & Ordering"
description: "Articles and projects as equals, with catalogue numbering decoupled from display order."
tags: [content, astro, data]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

Writing and projects are two equal [content collections](./architecture.md) with separate Zod schemas and shared language (`src/content.config.ts`). `src/lib/pieces.ts` assembles them into a single exhibition.

# Numbering vs order

Two orderings are kept apart on purpose. The catalogue number is the chronological rank within a kind — the oldest article is 001 — so a piece's number never shifts as new work is added. The display order is newest-first, and an optional `order` field pins a piece to the front (so The Right People can sit top-left). `featured` controls what appears on the homepage, `draft` keeps a piece out of the build, and articles can carry a `canonicalUrl` left over from the Substack migration.

# Core idea

A stable catalogue number for identity, a separate sort for display.

# Related

- [Architecture & Stack](./architecture.md)
- [Block Layout](./block-layout.md)
