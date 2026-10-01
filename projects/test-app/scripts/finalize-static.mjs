import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';

const output = resolve('dist/extra-pipe-website/browser');
if (!existsSync(resolve(output, 'index.html')))
  throw new Error('Build the static Angular website first.');
const notFound = resolve(output, '404/index.html');
if (!existsSync(notFound)) throw new Error('Missing prerendered 404 route.');
// Angular's prerendered hydration bootstrap is executable inline JavaScript.
// Externalize trusted build output so static hosting can enforce script-src self.
function externalizeScripts(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) externalizeScripts(path);
    else if (entry.name.endsWith('.html')) {
      const html = readFileSync(path, 'utf8');
      const finalized = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/g, (tag, attributes, body) => {
        if (/\bsrc=/.test(attributes) || /type="application\/(?:json|ld\+json)"/.test(attributes)) return tag;
        const hash = createHash('sha256').update(body).digest('hex').slice(0, 16);
        const filename = 'bootstrap-' + hash + '.js';
        writeFileSync(resolve(output, filename), body);
        return '<script' + attributes + ' src="/' + filename + '"></script>';
      });
      if (finalized !== html) writeFileSync(path, finalized);
    }
  }
}
externalizeScripts(output);
copyFileSync(notFound, resolve(output, '404.html'));
const configured =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : '');
const indexable = process.env.VERCEL_ENV === 'production' || process.env.SITE_INDEXABLE === 'true';
const xmlEscape = (text) =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
if (configured) {
  const url = new URL(configured);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  )
    throw new Error('SITE_URL must be a plain HTTPS origin.');
  const pages = new Set();
  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) scan(path);
      else if (entry.name === 'index.html') {
        const route = relative(output, directory).split(sep).join('/');
        const canonical = readFileSync(path, 'utf8')
          .match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0]
          ?.match(/href="([^"]+)"/)?.[1];
        if (route !== '404' && canonical?.startsWith(url.origin + '/')) pages.add(canonical);
      }
    }
  }
  scan(output);
  writeFileSync(
    resolve(output, 'sitemap.xml'),
    '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
      Array.from(pages)
        .sort()
        .map((page) => '<url><loc>' + xmlEscape(page) + '</loc></url>')
        .join('') +
      '</urlset>',
  );
  writeFileSync(
    resolve(output, 'robots.txt'),
    indexable
      ? 'User-agent: *\nAllow: /\nSitemap: ' + url.origin + '/sitemap.xml\n'
      : 'User-agent: *\nDisallow: /\n',
  );
} else {
  writeFileSync(resolve(output, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
  console.warn(
    'SITE_URL is unset: no sitemap/canonical production origin claimed. Indexing is disabled.',
  );
}
