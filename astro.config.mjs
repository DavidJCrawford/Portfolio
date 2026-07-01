import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { syncBrain } from './scripts/sync-brain.mjs';

// Regenerate public/brain/ (served notes + manifest) as part of the Astro lifecycle,
// so it runs for both `astro dev` and `astro build` no matter how they're invoked
// (npm script, CI action, or `astro build` directly) — the /brain graph depends on it.
const brainSync = {
  name: 'brain-sync',
  hooks: { 'astro:config:setup': () => { syncBrain(); } },
};

// Static, fast, owned. No adapter — `dist/` deploys anywhere.
// See spec.md §5.
export default defineConfig({
  site: 'https://davidjcrawford.github.io',
  base: '/Portfolio', // project Pages subpath; BASE_URL is '/Portfolio/'
  devToolbar: { enabled: false }, // no dev-only overlay; it never shipped to prod anyway
  integrations: [mdx(), brainSync],
  markdown: {
    // Restrained, readable code blocks that fit the paper aesthetic.
    shikiConfig: { theme: 'github-light', wrap: true },
  },
  vite: {
    // This environment's native file events don't reach the dev watcher, so edits
    // never hot-reloaded (every change looked stale until a server restart). Poll
    // instead so HMR actually fires. Dev-only; has no effect on the production build.
    server: { watch: { usePolling: true, interval: 200 } },
  },
});
