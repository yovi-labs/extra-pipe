# Changelog

## 2.0.0 — release candidate

- Expand Sprint 2 to 101 distinct canonical standalone pipes: 67 new text,
  collection, object, dashboard, numeric/localization and UTC calendar APIs,
  with typed reusable functions. Package compatibility aliases are removed.
- All 101 entries have live examples, contracts and copyable standalone imports.
  Structured results and Maps have explicit display adapters; nested playground
  input is bounded. Five recipes compose practical transformations.
- Verify source/public/packed declaration alignment and compile all 101 selectors
  in clean Angular 20.0/20/21/22 consumers; check unused catalogue removal
  in a single-pipe Angular 22 build.

- Eleven additive pure standalone pipes and typed functions: `listFormat`,
  `formatUnit`, `displayName`, `dateRange`, `numberRange`, `byteSize`,
  `truncateMiddle`, `slugify`, `groupBy`, `orderBy`, and `uniqueBy`.
- Unicode grapheme fallback for runtimes without native Intl.Segmenter.
- Angular 22 static documentation website: searchable catalog, copyable standalone
  examples, typed live playground and composable recipes. Angular 20 remains the
  isolated library compiler and compatibility fixture.
- Readable orange identity, responsive reflow, keyboard focus, per-route metadata,
  documentation redirects, preview noindex, real 404 and sitemap generation.
- Angular 20–22 packed-consumer CI, coverage floors, three-run mobile Lighthouse
  gate, package/license checks and static security-policy tests.
- Free Vercel build configuration and deployment runbook; actual hosting awaits
  the owner's connected account and confirmed free-plan eligibility.

- Breaking: require Angular >=20 <23; remove obsolete names/aliases; all 101 pipes
  are pure. `includes`, `removeByKey` and `removeDuplicatesByKey` require replacement
  references. Key selection reads own data fields without invoking getters.
- Organize static pipes, reusable functions, types and tests by domain. Consolidate
  test snapshots and number-word tables; align documentation and playground inputs
  in one typed registry per domain. Compile the actual 101 standalone snippets.
- Modernize library/lint tooling, remove unused vulnerable development dependencies,
  audit both lockfiles, add architecture gates and website coverage reports.

Prepared on `release/2.0.0` for review into `main`; not yet published to npm.
See [the migration guide](docs/MIGRATION-2.0.md) and
[release verification](docs/RELEASE-2.0.md). Publication is separately authorized.

## 1.1.0

### Added

- Locale-aware, pure standalone pipes: `compactNumber`, `formatDuration`, and `relativeTime`.
- Unicode-safe text pipes: `truncate`, `initials`, and `mask`.
- Compatibility selectors for `localized`, `fileSize`, `roundHalfUp`, and `camelCaseToTitleSeparatedCase`.
- Contract coverage for every existing public pipe, the new display pipes, Unicode behavior, invalid values, and locale overrides.

### Changed

- Corrected standalone-component documentation and expanded the runnable demo application.
- Fixed date-only formatting so `formatInstanceofDate` only includes time when requested.
- Made `includes` correctly match falsy values such as `0`.
- Added defensive empty-string handling to selected existing text, file-size, and base64 pipes.
