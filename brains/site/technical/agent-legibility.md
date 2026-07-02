---
type: Technical Note
title: "Agent Legibility"
description: "The machine-readable surfaces — llms.txt, robots.txt, sitemap, JSON-LD and Markdown twins — that let AI agents read the site accurately."
tags: [ai, agents, geo, seo, build]
timestamp: 2026-07-02T00:00:00Z
---

# Summary

The concrete surfaces that make the site legible to AI crawlers and agents — the *how* behind the [decision to optimise for agents](../decisions/optimise-for-ai-agents.md). All are generated at build time from the content collections (Astro endpoints and `public/`), with no new dependencies, so they stay in sync with the content the same way the [brain](./the-okf-brain.md) does.

# What's served

- **`robots.txt`** (`public/robots.txt`) — allows reputable AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Google-Extended, Applebot-Extended, and the rest) and points to the sitemap.
- **`sitemap.xml`** — a build-time endpoint listing every page, with `lastmod` on articles.
- **`llms.txt`** — the [llms.txt convention](https://llmstxt.org): a curated Markdown map of the site (writing, projects, the brain) with a one-line summary of each, linking articles to their raw `.md`.
- **`llms-full.txt`** — the full text of every article concatenated into one file, so an agent can ingest the whole corpus in a single fetch.
- **JSON-LD** — a schema.org `@graph` in `BaseLayout` (`Person` + `WebSite` sitewide), extended per page with `BlogPosting` (articles) and `CreativeWork` (projects), so an agent extracts accurate, attributed metadata.
- **Markdown twins** — every article is also served as raw Markdown at `/writing/<slug>.md`. This is the static stand-in for content negotiation (`Accept: text/markdown`), which a static GitHub Pages host can't do.

# Notes

Because the site is static, the content is already in the HTML — which matters, as most AI crawlers don't execute JavaScript. `robots.txt` and `llms.txt` are root-domain conventions: a crawler reads them at the domain root, so they are only fully authoritative once the site is on its own root domain (see the caveat in [Deployment & Base Path](./deployment.md)); the sitemap, JSON-LD and Markdown twins work fully at the `/Portfolio` subpath now.

# Related

- [Optimise the Site for AI Agents](../decisions/optimise-for-ai-agents.md)
- [Agents Acting on Behalf of Humans](../concepts/agents-acting-for-humans.md)
- [The Brain (OKF Bundle)](./the-okf-brain.md)
- [Read the Brain Live](../decisions/read-the-brain-live.md)
- [Knowledge as Leverage](../concepts/knowledge-as-leverage.md)
- [Deployment & Base Path](./deployment.md)
