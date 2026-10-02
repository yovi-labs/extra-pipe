# extra-pipe

A focused collection of standalone Angular 20–22 pipes for presentation, localization, text, and template-friendly data display. Every pipe is exported from `extra-pipe` and can be imported directly into a standalone component.

## Sprint 2 — 2.0.0 preview: 100+ standalone Angular pipes

This review-stage catalogue implements **101 canonical pipes**, plus four
separate compatibility aliases. The 67 additional APIs are not yet published on
npm. Existing installation instructions describe the published package, not a
promise that preview APIs are available. The approved target is 2.0.0; manifest versioning happens on the reviewed release branch. MIT licensing is unchanged.

| Addition group                | Count | Contracts and examples                           |
| ----------------------------- | ----: | ------------------------------------------------ |
| Text and content              |    12 | [Text](docs/pipes/text-toolbox.md)               |
| Immutable collections         |    17 | [Collections](docs/pipes/collections-toolbox.md) |
| Own-property object utilities |     8 | [Objects](docs/pipes/objects-toolbox.md)         |
| Dashboard metrics             |    12 | [Metrics](docs/pipes/metrics-toolbox.md)         |
| Numbers and localization      |     8 | [Numbers](docs/pipes/numbers-toolbox.md)         |
| Explicit UTC calendars        |    10 | [Dates](docs/pipes/dates-toolbox.md)             |

Each addition exports a pure standalone adapter and a reusable typed function
with the same name as its selector. Read the [shared contracts](docs/PIPE-101-CONTRACTS.md)
for invalid values, Unicode, locale defaults, equality, bounds, rounding and UTC
behavior. Expensive reports should be precomputed outside templates.
The [expanded API reference](docs/API-101.md) includes exact signatures and caveats for all 67 additions.
Run `npm run check:inventory` after building to verify the exported and documented
catalogue against the packed declarations; aliases and functions never inflate
the count.

## Install

```bash
npm install extra-pipe
```

The planned 2.0.0 release supports Angular 20 through 22 (`>=20.0.0 <23.0.0`). The library uses Angular 20 partial compilation; the runnable documentation/playground in `projects/test-app` uses an isolated Angular 22 toolchain and a packed local library. Angular 17–19 are no longer supported by this review branch. npm installation still retrieves the published 1.x package, not this unpublished 2.0 preview.

## Use a pipe in a standalone component

```ts
import { Component } from '@angular/core';
import { CompactNumberPipe, TruncatePipe } from 'extra-pipe';

@Component({
  standalone: true,
  selector: 'app-product-summary',
  imports: [CompactNumberPipe, TruncatePipe],
  template: `
    <p>{{ product.views | compactNumber }}</p>
    <p>{{ product.description | truncate: 80 }}</p>
  `,
})
export class ProductSummaryComponent {
  product = { views: 12500, description: '...' };
}
```

Standalone pipes belong in a component's `imports` array, not an NgModule's `declarations` array.

## Sprint 2 preview — not yet published

The review-stage catalog adds eleven APIs. Do not expect these in the current npm
release; use the local packed preview or wait for the approved 1.2.0 release.

- Localization: listFormat (readable lists), formatUnit (Intl units), displayName
  (localized language/region names), dateRange and numberRange.
- Display/text: byteSize (SI or IEC), truncateMiddle (grapheme budget) and slugify
  (Unicode-preserving text, optional Latin accent folding).
- Collections: groupBy (ordered groups), orderBy (stable display sorting),
  uniqueBy (explicit first/last retention without mutation).

Each pipe has an exported typed function/options, invalid-input tests and a
standalone example. Text-only and non-localized collection pipes do not take a
locale parameter. The full signatures and limitations are in
[the 1.2 API contract](https://github.com/yovi-labs/extra-pipe/blob/develop/docs/API-1.2.md).
The new runtime Unicode fallback is MIT licensed; Angular peers stay >=17 <23.
See [the Sprint 2 milestone](https://github.com/yovi-labs/extra-pipe/milestone/1)
for review status. No deployed website address is claimed before hosting is verified.

## New display and i18n pipes

All pipes in this section are pure and return an empty string for nullish or invalid input. The three formatting pipes use injected `LOCALE_ID` with an optional locale override; text-only pipes have no locale parameter.

| Selector         | Template call                                         | Contract                                                                                                                                                         |
| ---------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compactNumber`  | `{{ views \| compactNumber: 'compact': 1: 'fr-FR' }}` | Finite `number` or `bigint`; compact or standard notation; 0–20 fraction digits.                                                                                 |
| `formatDuration` | `{{ 90 \| formatDuration: 'seconds': 'short' }}`      | Non-negative number in `milliseconds`, `seconds`, `minutes`, or `hours`; displays localized hours, minutes, and seconds.                                         |
| `relativeTime`   | `{{ publishedAt \| relativeTime: now }}`              | Valid `Date`, ISO string, or epoch milliseconds. Bind a new `now` value from the component when the output should refresh; the pipe never schedules work itself. |
| `truncate`       | `{{ title \| truncate: 24: '…' }}`                    | String only. Counts user-perceived characters, so emoji and combined accents are never split.                                                                    |
| `initials`       | `{{ fullName \| initials: 2: '—' }}`                  | Whitespace-separated name; first grapheme from up to the requested word count.                                                                                   |
| `mask`           | `{{ cardNumber \| mask: 0: 4: '•' }}`                 | String only; leaves the requested prefix and suffix visible and masks the middle.                                                                                |

## Existing pipes

The existing selectors remain available. The table records their intended input contract so templates stay predictable.

| Selector                        | Input and behavior                                                                     | Null/invalid result                     |
| ------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------- |
| `camelToSnake`                  | String; inserts underscores before uppercase letters.                                  | Empty string                            |
| `camelCaseToTitleSeperatedCase` | Legacy misspelled selector; splits before uppercase letters.                           | Empty string                            |
| `capitalize`                    | String; uppercase first character.                                                     | Empty string                            |
| `filesize`                      | Byte count; renders megabytes with two decimals, e.g. `1048576 → 1.00MB`.              | Empty string                            |
| `formatInstanceofDate`          | `Date`; optional numeric month and time flags.                                         | `String(value)`                         |
| `hide`                          | String; masks all characters unless `hide` is false.                                   | Empty string                            |
| `imgUrlBase64`                  | Raw base64 content plus MIME type: `{{ base64 \| imgUrlBase64: 'image/png' }}`.        | Empty string                            |
| `includes`                      | Array and any search value, including `0`, `false`, or `null`.                         | `false` for non-arrays                  |
| `localizedDate`                 | Valid `Date`, date string, or epoch milliseconds plus optional locale.                 | Empty string                            |
| `numberToWords`                 | Number and supported `'en'` or `'fr'` language.                                        | Unsupported languages are not supported |
| `removeByKey`                   | Array, object key, and values to exclude; returns a new filtered array.                | Pass a valid array                      |
| `removeDuplicatesByKey`         | Array and object key; returns a new array, retaining the last item for duplicate keys. | Pass a valid array                      |
| `replaceComma`                  | Number or numeric string; replaces one decimal comma and coerces to number.            | `NaN`                                   |
| `roundHalf`                     | Number and optional `'up'` or `'down'`; rounds to two decimals.                        | Pass a valid number                     |
| `snakeToCamel`                  | String; removes underscores and uppercases following ASCII letters.                    | Empty string                            |
| `underscoreToTitle`             | String; replaces underscores with spaces.                                              | Empty string                            |
| `upperCaseFrom`                 | String and zero-based index; uppercases the character at that index.                   | Empty string                            |

The three collection pipes (`includes`, `removeByKey`, and `removeDuplicatesByKey`) retain their legacy impure-pipe behavior for compatibility. Prefer immutable array updates, as shown in the demo application.

## Compatibility aliases

These additive aliases preserve names that earlier documentation used incorrectly:

- `localized` delegates to `localizedDate` and is deprecated for new templates.
- `camelCaseToTitleSeparatedCase` is the corrected selector for `camelCaseToTitleSeperatedCase`.
- `fileSize` is the camel-case alias for `filesize`.
- `roundHalfUp` always rounds ties up; use `roundHalf` for configurable direction.

## Demo and quality checks

Build the library, then prepare and run the Angular 22 website (Node 24.15+ for the website):

```bash
npm ci
 npm run build:lib
 npm run prepare:website
npm start
```

The website has its own manifest and lockfile. Run `npm run build:website` and
`npm run test:website` after preparation. Static output is in
`projects/test-app/dist/extra-pipe-website/browser`. The catalog clearly marks
unreleased 1.2 preview APIs; `npm install extra-pipe` installs the published version,
not those preview APIs.

The preserved Angular 17 fixture is in `projects/angular17-demo`. Use
`npm run start:website` to run the Angular 22 demo.
Verify the library before a release:

```bash
npm run lint:lib
npm run test:ci
npm run build:lib
cd dist/extra-pipe && npm pack --dry-run
```

## Contributing

Please open an issue or pull request at [yovi-labs/extra-pipe](https://github.com/yovi-labs/extra-pipe). New pipes should be standalone, pure unless documented otherwise, typed, covered by unit tests, and documented with a template example.

## License

[MIT](LICENSE)
