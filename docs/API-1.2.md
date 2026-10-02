# Extra Pipe 1.2 API contracts

Status: proposed release APIs; not published. Existing 1.1 selectors, exports and
compatibility aliases retain their behavior. Angular peer support remains
`>=17.0.0 <23.0.0`; build the library with Angular 17 partial compilation.

## Shared rules

New pipes are standalone and pure. The exported transformation functions contain
the behavior; Angular adapters supply `LOCALE_ID`. Functions default to `en-US`;
pipe locale overrides fall back to the injected locale when malformed.

Display transformations return `''` for nullish/invalid input, unsupported options
or reversed ranges. Numeric strings are not numbers. Collection transformations
return `[]` for invalid input. They accept readonly arrays and never mutate arrays,
objects or dates. Pure pipes require replacement references when input changes.
Do not add internal clocks, side effects, arbitrary expression evaluation or HTML
sanitization bypasses. Formatter caches must be bounded and benchmark-justified.

## Display APIs

| Selector / exported function        | Parameters after input    | Contract                                                                                                       |
| ----------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `listFormat` / `formatList`         | `options?, locale?`       | Readonly strings, Intl list type/style; reject non-string members.                                             |
| `formatUnit` / `formatUnit`         | `unit, options?, locale?` | Finite number, sanctioned Intl unit; localized formatting, not conversion.                                     |
| `displayName` / `getDisplayName`    | `type, options?, locale?` | Language, region, script, currency, calendar or dateTimeField code; Intl fallback policy.                      |
| `dateRange` / `formatDateRange`     | `end, options?, locale?`  | Date, epoch milliseconds or parseable date string; explicit timeZone recommended; equal endpoints collapse.    |
| `numberRange` / `formatNumberRange` | `end, options?, locale?`  | Finite ordered endpoints; Intl rounding; equal endpoints collapse.                                             |
| `byteSize` / `formatByteSize`       | `options?, locale?`       | Nonnegative finite bytes; decimal SI by default, binary IEC optional; capped unit scale, localized number.     |
| `truncateMiddle` / `truncateMiddle` | `maximumLength, suffix?`  | String; grapheme length includes suffix; keep extra grapheme at start; zero yields empty.                      |
| `slugify` / `slugify`               | `options?`                | Unicode letters/numbers preserved; optional Latin accent folding is not transliteration; lowercase by default. |

Range fallbacks on runtimes without native `formatRange` join individually
formatted endpoints with an en dash. Native range grammar and fallback punctuation
may differ. Do not parse localized output as data. Date-only string interpretation
and local time depend on ECMAScript rules: prefer ISO strings with offsets or Dates.

## Collection APIs

`key` is a direct property key, not a dotted-path expression or callback. Objects
without that property form the `undefined` group. Keys such as `__proto__` are safe.

| Selector / function | Signature                           | Contract                                                                                                                         |
| ------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `groupBy`           | `(items, key)`                      | Ordered `{ key, items }[]`; Map equality, group and item order reflect first encounter.                                          |
| `orderBy`           | `(items, key, direction?, locale?)` | Stable `asc` default / `desc`; finite numbers or strings; missing/invalid values last in either direction; locale-aware strings. |
| `uniqueBy`          | `(items, key, retain?)`             | `first` default or `last`; Map equality; retained items remain in source order.                                                  |

Returned arrays are new; contained objects retain identity. These utilities suit
small display collections, not pagination/querying of large datasets. Precompute
large results outside templates. `uniqueBy` does not replace legacy deduplication.

## Contribution and verification

Each ticket uses `feat/<issue>-<short-name>` from current `develop` and a PR into
`develop`. Dependent PRs must disclose their prerequisites. Keep tickets open until
review and merge. Do not publish a package or promote production from a feature PR.

Every export needs invalid-input tests, deterministic examples and a standalone
import snippet. Include frozen inputs, emoji ZWJ sequences, combining marks,
Arabic/French/English, rounding boundaries and timezone/DST cases where relevant.
Keep the Angular 17 package compiler isolated from the Angular 22 website toolchain.
Before release, test packed-package consumers on every supported Angular major.
Document checks and limitations honestly; targets are not measurements.
