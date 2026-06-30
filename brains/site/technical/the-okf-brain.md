---
type: Technical Note
title: "The Brain (OKF Bundle)"
description: "The brain itself: a portable Open Knowledge Format bundle people and agents can read."
tags: [knowledge, okf, brain]
timestamp: 2026-07-01T00:00:00Z
---

# Summary

This site brain — the `brains/site/` bundle — is itself a technical artefact, an [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) (OKF v0.1) bundle. Each note is markdown with a YAML frontmatter `type`, relationships are ordinary relative links, and `index.md`/`log.md` are reserved. The directory is the graph: no database, and nothing to build before you can read it. Each subject gets its own bundle under `brains/` (an article can have its own), and bundles cross-link with relative paths instead of repeating each other.

# Why it ships with the site

It's the project's own instance of [knowledge as leverage](../concepts/knowledge-as-leverage.md): a portable, public context source that both people and agents can read to understand how the project thinks. Publishing it is a [deliberate decision](../decisions/publish-the-brain-publicly.md), with third-party PII and employer-roadmap specifics kept out.

# Core idea

The knowledge that drives the work, written in a portable format and shipped alongside it.

# Related

- [Knowledge as Leverage](../concepts/knowledge-as-leverage.md)
- [Publish the Brain Publicly](../decisions/publish-the-brain-publicly.md)
- [Portfolio Site](../situations/portfolio-site.md)
