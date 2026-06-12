const FORBIDDEN_PREFIXES = ['/.git/', '/.wrangler/', '/artifacts/'];
const FORBIDDEN_PATHS = new Set(['/README.md', '/site-spec.json', '/artifacts/internal/site-spec.json']);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (FORBIDDEN_PATHS.has(url.pathname) || FORBIDDEN_PREFIXES.some((prefix) => url.pathname.startsWith(prefix))) {
      return new Response('Not found', {
        status: 404,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
