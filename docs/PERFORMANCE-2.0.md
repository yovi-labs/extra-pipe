# 2.0 performance and accessibility verification

## Architecture choices

All 101 pipes are pure standalone classes. Collection changes must replace the input reference; an Angular host regression test proves in-place mutation does not recompute and a replacement does. Pipe classes remain static exports so Angular can compile them and bundlers can remove unused domains.

The website uses OnPush components, signals and computed derived state. Route components are lazy-loaded. Executable adapters are imported only by the pipe-detail playground, not by the homepage or catalog. Catalog search normalizes its stable search index once, then filters it without rebuilding 101 descriptions on every keypress. No unbounded global locale/formatter cache or automatic relative-time timer is introduced.

`removeByKey` uses a Set for exclusions, reducing key membership from O(n × m) to O(n + m). Deduplication uses an insertion-ordered Map, preserving the last item in first-key order. Large reporting transforms still belong in component/application state rather than repeated template expressions.

## Repeatable evidence

`node scripts/benchmark-pipes.mjs` runs warmups and five timed batches of 200 calls. On this Windows Node 24.21 machine (2026-10-02), medians were 0.0229 ms for removing from 1,000 records with 500 exclusions, 0.0172 ms for deduplicating 1,000 records, 0.0062 ms for a 1,000-value moving average, and 0.1299 ms for sorting 1,000 records. These are informational local results, not portable SLA thresholds. CI uploads its own benchmark JSON.

The production website retains the 250 kB initial-bundle warning and 350 kB hard error cap. The Angular 22 single-pipe consumer verifies unused text, metric and date selectors disappear from the bundle. CI runs three mobile Lighthouse measurements against the built static artifact and requires median performance ≥90; it uploads every run, not only the best score. Accessibility, best-practices and SEO scores are reported too. Production hosting needs a separate measurement; preview noindex is intentional.

PR #98 head `da6aabf` passed all seven Linux CI jobs, including 25 website tests, the Angular 20.0/20/21/22 consumers, static security tests and three-run Lighthouse. This is prerequisite evidence, not a substitute for this branch's current-head run.

## Accessibility and usability

The bright orange brand is decorative. Readable dark-orange text/buttons, visible focus, semantic landmarks, skip navigation, reduced-motion support, 44 px controls and independent code-block scrolling are retained. Copy success/failure is announced without rendering code as HTML. Parameter help now lists each pipe's actual ordered arguments, while locale stays a separate control. Invalid fields point to a shared announced error, and their invalid state clears after recovery.

Before release, manually check current-head artifacts at desktop and 320 px widths, keyboard navigation and focus, Arabic output direction, null/error/reset states, copy feedback and immutable add-item behavior. Check the console for runtime errors and security-policy violations. Automated scores and contrast ratios are not a WCAG certification.

The local Angular 22 build is blocked by Windows Application Control's native-parser policy. Use approved CI-generated static assets for browser checks; do not bypass that policy. At this checkpoint GitHub API rate limiting also prevents artifact retrieval. Current-head manual browser evidence must be recorded once artifacts are accessible, not inferred from historical builds.
