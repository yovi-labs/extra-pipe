# Changelog

## 1.1.0 - 2026-09-30

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
