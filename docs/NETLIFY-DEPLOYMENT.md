# Extra Pipe documentation on Netlify

Production: https://extra-pipe.netlify.app/

This is the original Angular documentation website and interactive playground from `projects/test-app`. It replaces the npm consumer test app that was initially deployed to this domain by mistake.

- Team: Anas Masti (`anasmasti`), Free.
- Site ID: `864f1024-2fe8-4e97-a2b3-41d24b67514e`.
- Deploy ID: `6adf9a1390c266be1f947cb7`.
- Deploy permalink: https://6adf9a1390c266be1f947cb7--extra-pipe.netlify.app/
- Dashboard: https://app.netlify.com/projects/extra-pipe
- Source: repository root at `a1501c3`, with the root Netlify configuration added.
- Build: `npm run build:vercel` (the existing static website verification/build pipeline).
- Publish: `projects/test-app/dist/extra-pipe-website/browser`.
- Public build metadata: `SITE_URL=https://extra-pipe.netlify.app`, `SITE_INDEXABLE=true`.

The root `netlify.toml` preserves compatibility redirects and static response security headers. Canonical links, sitemap and robots use the Netlify origin. Missing routes return the prerendered 404 page rather than an SPA success fallback.

Deployment used a clean source snapshot in `.artifacts/netlify-documentation-source`, excluding the npm consumer and local dependencies. The MCP uploader only excludes top-level dependency folders, so do not upload the working repository directly when it contains nested node_modules. Local Netlify metadata and staging artifacts are gitignored. Git continuous deployment is not connected.

## Verification

- Deployment reached production `ready` without an error.
- Homepage, `/pipes`, `/pipes/compactNumber`, `/recipes`, robots and sitemap return HTTP 200 with correct documentation titles and Netlify canonicals.
- An unknown route returns HTTP 404.
- Browser navigation from the homepage into compactNumber works; changing input from 12500 to 25000 updates output from 12.5K to 25K.
- A Netlify toolbar script reports a TrustedHTML assignment error under the site's strict policy. The documentation app and playground continue to work; the security policy was preserved.
