# Migrating to Extra Pipe 2.0

This is an unpublished, breaking Sprint 2 preview. npm still installs the
published 1.x package. Do not publish a preview archive with the unchanged 1.1.0
manifest version; manifests are versioned on the reviewed `release/2.0.0` branch.

## Angular requirements

Angular 20, 21 and 22 are supported (`>=20.0.0 <23.0.0`). Angular 17–19 support
is removed. The compiler uses Angular 20 partial compilation; the public website
uses Angular 22. Contributor tooling uses Node 24.15+. Angular 20 LTS ends
2026-11-28; compatibility is not a promise of upstream maintenance afterward.

## Required template and import changes

| Before | After |
| --- | --- |
| `camelCaseToTitleSeperatedCase` / `CamelCaseToTitleSeperatedCasePipe` | `camelCaseToTitleSeparatedCase` / `CamelCaseToTitleSeparatedCasePipe` |
| `filesize` | `fileSize` / `FileSizePipe` |
| `FileSizeAliasPipe` | `FileSizePipe` |
| `formatInstanceofDate` / `FormatInstanceofDatePipe` | `formatDateTime` / `FormatDateTimePipe` |
| `imgUrlBase64` / `Base64ImgUrlPipe` | `base64ImageUrl` / `Base64ImageUrlPipe` |
| `LocalizedPipe` or `LocalizedLegacyPipe` | `LocalizedDatePipe` |
| `localized` | `localizedDate` |
| `roundHalfUp` / `RoundHalfUpPipe` | `roundHalf: 'up'` / `RoundHalfPipe` |

These old package selectors/classes are removed immediately. Documentation URLs
redirect to canonical pages; URL redirects do not provide compatibility imports.
Import from `extra-pipe`, not internal filesystem paths. The package supports
only its root public export, not undocumented deep imports.

## Pure collection updates

`includes`, `removeByKey` and `removeDuplicatesByKey` are now pure, like the other
98 pipes. In-place array mutations no longer refresh template outputs. Replace
the array: `items = [...items, newItem]`. This is a deliberate 2.0 behavior change.
Selection accepts readonly inputs and never mutates inputs or excluded values.

`removeByKey` uses SameValueZero membership, including NaN, and preserves item
order. `removeDuplicatesByKey` still keeps the last item per key in first-key
insertion order. This differs from `uniqueBy: key: 'last'`, which retains the
last items' positions. Their implementations must not be collapsed into one API.

Both key-selection pipes now read own data fields only: inherited properties and
getters are ignored and treated as missing (`undefined`); getters are never
executed. Materialize legitimate accessor/prototype values into plain own data
records before passing them. Documented non-array passthrough is retained.

## Unchanged behavior

Other valid transformation outputs, parameter order/defaults, legacy invalid
contracts, date/time semantics and locale defaults are retained. Renaming
`formatDateTime` does not expand its existing Date-only/English behavior. Renaming
`base64ImageUrl` does not turn it into a sanitizer: it returns an ordinary string,
not a trusted Angular URL. Bind outputs normally; never bypass sanitization.
Number-to-words still supports its documented English/French legacy vocabulary.
Relative time remains caller-controlled and starts no timer.

The canonical catalog still contains exactly 101 distinct pipes. Helper functions,
public classes and URL redirects never inflate that count. See the root README
for setup and the contributor guide for domain organization.
