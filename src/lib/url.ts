// Join a path onto the configured base (`/Portfolio`). Slash-agnostic: works whether
// import.meta.env.BASE_URL has a trailing slash or not, and whether `path` has a leading one.
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** withBase('writing/x') → '/Portfolio/writing/x'; withBase() → '/Portfolio/' */
export const withBase = (path = ''): string => `${BASE}/${String(path).replace(/^\/+/, '')}`;
