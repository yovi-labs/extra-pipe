# Sprint 2 verification evidence

Status: implementation verified locally; review, current-head CI and deployment
remain release gates. Package versions intentionally remain unchanged until
release readiness. Do not publish this feature branch as 1.1.0.

## Automated checks (2026-10-01)

- Library lint passed.
- Chrome Headless 154: 89/89 unit tests passed; lines 93.71%, branches 86.48%,
  functions 100%. CI enforces at least 90% lines / 80% branches.
- Angular 17 library partial-compilation build and compatibility demo build passed.
- Angular 22 website: 17/17 tests passed; static production build passed.
- Static response/security tests: 5/5 passed.
- Package surface check: 86 files, approximately 81.5kB compressed; includes the
  unchanged MIT copyright/license and changelog. No website, tests, environment
  files or development dependencies are included. Angular peers remain >=17 <23.
- Clean standalone consumer builds passed for CLI 17.3.17, 18.2.21, 19.2.27,
  20.3.37, 21.2.24 and 22.2.1 using the packed library, eleven new pipes, the six
  1.1 display pipes and four aliases. Local runtime was Node 24.21; CI tests
  older Angular generations with their supported Node 20/22 runtimes.
- Website dependency audit: zero runtime/development advisories. Legacy Angular
  17 workspace findings are disclosed in WEBSITE-SECURITY.md; compatibility
  does not imply security support.

## Mobile performance

Three independent Lighthouse 13.5 runs against the same compressed, prerendered
production homepage and security headers, using Chrome headless 154 and default
simulated mobile throttling. Scores: performance 99/99/99 (median 99),
accessibility 100/100/100, best practices 100/100/100. LCP ~1.66s and TBT ~1–2ms.
These are local lab results, not deployed-site or real-user measurements.

SEO scores 69 because the local/preview site deliberately has noindex and no
claimed production origin. Confirm canonical URLs, sitemap and crawlability on
the real domain before production promotion. Do not remove preview noindex just
to increase a lab score.

Initial assets are ~279.89kB raw / ~76.88kB estimated transfer. This stays below
the 350kB hard budget but exceeds the 250kB warning budget. The warning is retained
and documented, not silently relaxed. Lazy routes keep catalog/playground data
and adapters outside the homepage initial chunk.

## Informational pure-function baseline

Warm-up plus five batches of 200 calls, median time per call on this machine:
groupBy (1000 records) 0.0112ms; uniqueBy 0.0243ms; orderBy 0.1339ms;
Unicode slugify 0.0485ms; grapheme truncation 0.0930ms; listFormat 0.0093ms;
byteSize 0.0193ms. This is not a portable speed promise. No global formatter cache
was introduced without evidence that its state/memory tradeoff is justified.

## Reproduce

1. Install root dependencies; run library lint, test:ci, build:lib, build:demo17.
   Supply CHROME_BIN when Chrome is not installed in the default location.
2. With Node 24.15+, run prepare:website, test:website and build:website.
3. Run check:package and check:security.
4. Run check:compat with each Angular major 17 through 22.
5. Install tools/quality with npm ci; run preview:website; set CHROME_PATH if
   needed, then run check:performance. It saves three JSON reports and fails when
   median performance is below 90. Run the benchmark-pipes script for the
   informational function baseline.

CI builds one package, uses it in six consumer jobs and the website, verifies
static security, and uploads the packed artifact, static website and Lighthouse
reports. It has read-only repository permissions and cancels obsolete runs.

## Browser smoke tests

Homepage, catalog search, examples, French/Arabic locale selection, null input,
keyboard route focus and mobile reflow were tested. Production navigation,
hydration and live formatting work under CSP with no observed console errors.
Immutable interaction and each of the 34 canonical adapters have unit coverage.
Free Vercel account access and an identified destination are still required;
local testing does not prove deployed redirects, cache or TLS behavior.

