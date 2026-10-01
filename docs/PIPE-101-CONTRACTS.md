# Sprint 2 expansion: 101 canonical pipes

The target is 34 existing canonical APIs plus 67 new APIs. Aliases and helper
functions are excluded. PIPE-101-BACKLOG.json records the actual use case and
Angular/Extra Pipe gap for each candidate; planned entries are not proof of implementation.
All additions remain preview APIs until the reviewed release is published.

## Shared contracts

Adapters are standalone and pure, wrapping typed functions. Existing APIs and
aliases are unchanged. Public types are exported; collections accept readonly
input and preserve source record identity except explicit shallow merge/object
transformations. No input arrays, records or Dates are mutated.

Display results use an empty string for invalid input; numeric calculations use
null; predicates use false; lists use []; structured/object calculations use null.
partition/unzip use their documented empty structures. Numeric strings are
rejected. Aggregation rejects a whole input if any field is missing/non-finite;
sumBy of an empty valid input is zero, other scalar summaries are null.
Own data properties only: inherited properties and getters are not invoked.
Records mean plain objects (Object.prototype or null prototype), not Date/Map/classes.
Object outputs use safe own data properties, including names such as **proto**.
Path traversal forbids **proto**/prototype/constructor. Nested walks cap depth at
12 and reject cycles. Maps use SameValueZero equality and encounter order.

## Text and locales

User-perceived character limits use the existing UAX grapheme helper. Word
segmentation uses optional native Intl.Segmenter, with a documented Unicode
letter/number token fallback (not equivalent for unspaced languages).
Only wordCount/truncateWords/readingTime/pluralCategory/formatFraction/basisPoints/
dateParts accept locale overrides. Functions default to en-US; adapters use LOCALE_ID.
Latin accent folding preserves non-Latin scripts. Search queries are literal and
case-sensitive; highlightMatches returns data segments, never trusted HTML.
wrapWords preserves overlong words; no arbitrary regex, HTML parsing or code evaluation.

## Bounds and determinism

Numeric calculations use IEEE-754 numbers, not decimal finance precision.
roundTo/roundToStep use ties toward positive infinity; precision is -12..12.
formatFraction caps denominators at 10,000. Histogram bins cap at 256.
flatten depth is 0..8; nested object depth 12; date sequences/business-day
enumeration cap at 3,660 calendar days. Page sizes/window sizes cap at 5,000.
No hidden timers, holiday services, random sampling, I/O or unbounded caches.

Date inputs follow existing DateInput/toValidDate rules. Calendar utilities use
UTC explicitly (not local/business timezone calendars). Difference counts use
end minus start; business days exclude start/include end, Mon-Fri with caller
holidays; reverse intervals return signed results. ISO weeks use Monday and
week-year rules. Interval membership is inclusive; overlap uses half-open ranges.
dateBucket returns a UTC ISO string; dateSequence returns fresh Dates.

## Delivery

Issues #71-79 extend milestone 1. #71 supplies contracts/common helpers; #72-77
are independent domain implementation PRs; #78 integrates website/docs; #79
verifies the exact package and all consumers. These depend on existing #50-70,
which remain subject to human review. Feature branch integration is not protected
branch approval. No release, version bump, merge or publication is implied.
