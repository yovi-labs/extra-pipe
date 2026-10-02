# Changelog

## Unreleased — planned 1.2.0

- Expand Sprint 2 to 101 distinct canonical standalone pipes: 67 new text,
  collection, object, dashboard, numeric/localization and UTC calendar APIs,
  with typed reusable functions. Four compatibility aliases remain separate.
- All 101 entries have live examples, contracts and copyable standalone imports.
  Structured results and Maps have explicit display adapters; nested playground
  input is bounded. Five recipes compose practical transformations.
- Verify source/public/packed declaration alignment and compile all 101 selectors
  plus aliases in clean Angular 17–22 consumers; check unused catalogue removal
  in a single-pipe Angular 22 build.

- Eleven additive pure standalone pipes and typed functions: `listFormat`,
  `formatUnit`, `displayName`, `dateRange`, `numberRange`, `byteSize`,
  `truncateMiddle`, `slugify`, `groupBy`, `orderBy`, and `uniqueBy`.
- Unicode grapheme fallback for runtimes without native Intl.Segmenter.
- Angular 22 static documentation website: searchable catalog, copyable standalone
  examples, safe live playground and composable recipes. Angular 17 remains the
  isolated library compiler and compatibility fixture.
- Readable orange identity, responsive reflow, keyboard focus, per-route metadata,
  canonical aliases, preview noindex, real 404 and sitemap generation.
- Angular 17–22 packed-consumer CI, coverage floors, three-run mobile Lighthouse
  gate, package/license checks and static security-policy tests.
- Free Vercel build configuration and deployment runbook; actual hosting awaits
  the owner's connected account and confirmed free-plan eligibility.

This is review-stage work, not a published release. Existing APIs and aliases are
preserved. Versions remain unchanged until the approved release branch is created.

## 1.1.0

### Added

- Locale-aware, pure standalone pipes: `compactNumber`, `formatDuration`, and `relativeTime`.
- Unicode-safe text pipes: `truncate`, `initials`, and `mask`.
- Compatibility selectors for `localized`, `fileSize`, `roundHalfUp`, and `camelCaseToTitleSeparatedCase`.
- Contract coverage for every existing public pipe, the new display pipes, Unicode behavior, invalid values, and locale overrides.

### Changed

- Corrected standalone-component documentation and expanded the runnable demo application.
- Fixed date-only formatting so `formatDateTime` only includes time when requested.
- Made `includes` correctly match falsy values such as `0`.
- Added defensive empty-string handling to selected existing text, file-size, and base64 pipes.
