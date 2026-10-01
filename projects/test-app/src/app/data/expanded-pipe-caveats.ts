/** Specific bounds, ordering and semantic caveats for each preview API. */
export const PIPE_CAVEATS: Readonly<Record<string, string>> = {
  wordCount:
    'Word-like tokens only; punctuation and emoji are not words. Native Intl word segmentation has a Unicode letter/number fallback that is not equivalent for unspaced languages.',
  truncateWords:
    'Maximum 0–100,000 words. Keeps original text when it fits; otherwise appends the suffix after the final whole word. Zero returns empty text.',
  wrapWords:
    'Columns 1–10,000 count graphemes. Whitespace between words is normalized; line breaks are retained and overlong words are not split.',
  readingTime:
    'Rate 1–10,000 words/minute; rounds up estimated minutes. It is an estimate, not a timer or measurement of a person.',
  normalizeWhitespace:
    'Collapses JavaScript whitespace and trims; it does not remove markup or sanitize HTML.',
  stripDiacritics:
    'Folds marks attached to Latin letters only; preserves Arabic marks and other scripts.',
  excerpt:
    'Literal case-sensitive first match; budget 0–10,000 graphemes includes up to two suffix markers. Unmatched queries return empty text; small budgets may cut the query itself.',
  highlightMatches:
    'Non-overlapping literal case-sensitive matches at full grapheme boundaries. Returns text/matched data, never HTML; empty query returns the unmarked text.',
  humanizeIdentifier:
    'Splits ASCII acronym/camel boundaries and underscores/hyphens; preserves casing and non-Latin text.',
  escapeRegExp:
    'Escapes pattern metacharacters for literal matching; does not generate regex flags, compile a pattern or validate user data.',
  graphemeCount:
    'Counts user-perceived characters, including combining marks and emoji sequences; empty text is zero.',
  splitLines:
    'Splits CRLF, CR and LF; preserves empty and trailing lines. Empty text produces one empty line.',
  chunk: 'Size 1–5,000; retains the final partial chunk and source item identity.',
  flatten:
    'Depth 0–8; copies the outer array, preserves deeper arrays after the depth limit. Cycles encountered during traversal reject the input.',
  compact:
    'Removes only null and undefined, preserving 0, false, empty text, order and item identity.',
  partition:
    'Own data field, SameValueZero equality; missing/accessor fields read as undefined. Stable order in matching and remaining arrays.',
  zip: 'Pairs by index up to the shorter array; preserves source item identity.',
  unzip:
    'Each input must be a two-element tuple; use readonly pairs declared with as const. Empty/invalid input returns two empty arrays.',
  slidingWindow:
    'Full windows only; size and step 1–5,000. Work and output scale with window count times size.',
  pluck:
    'Own data fields only; missing/accessor fields produce undefined (JSON displays these array entries as null).',
  filterBy:
    'Own data fields with SameValueZero equality; missing/accessor fields read as undefined. Retains source order and identity.',
  intersectionBy:
    'Distinct keys present on both sides; retains the first left record in left encounter order. Missing keys form one undefined identity.',
  differenceBy:
    'Distinct left-only keys; retains the first left record in encounter order. Missing keys form one undefined identity.',
  unionBy:
    'Distinct keys; first record wins, visiting left before right. Missing keys form one undefined identity.',
  symmetricDifferenceBy:
    'Distinct keys found on one side only; left-only before right-only, first record wins. Missing keys form one undefined identity.',
  indexBy:
    "Map of own keys, last record wins without moving the key's encounter position. Missing keys use undefined. Use KeyValuePipe with a comparator returning zero and JsonPipe to preserve display order across Angular 17–22.",
  countBy:
    'Counts SameValueZero own-field groups in first-key encounter order. Missing keys use undefined.',
  mergeBy:
    'Shallow last-field-wins merge by own identity; first-key order, missing identities reject input. Unchanged source objects are not mutated.',
  paginate:
    'One-based page; size 1–5,000. Returns metadata plus a new items array; out-of-range pages have no items. Invalid input returns null.',
  getPath:
    'Key array up to 32 segments; own data only. Forbids __proto__, constructor and prototype. Missing paths use the fallback; an empty path returns the input. Apply JsonPipe yourself for object-valued leaves.',
  pick: 'Plain records and string keys only; copies selected enumerable own data fields without traversing paths.',
  omit: 'Plain records and string keys only; excludes listed enumerable own data fields without traversing paths.',
  renameKeys:
    'Shallow own-string-key mapping. Colliding targets or non-string mappings reject the input; output keys are prototype-safe data.',
  defaults:
    'Shallow fallback only for absent/null/undefined fields; preserves 0, false and empty text. Copies enumerable own data fields; result type permits absent structural keys.',
  invertRecord:
    'Finite number, string or boolean values become string keys; duplicate values collect original field names in encounter order.',
  pruneEmpty:
    'Recursively removes null/undefined/empty text and empty containers, keeping 0/false. Depth 12, cycles reject input. Other leaf objects retain identity.',
  pathEntries:
    'Plain-record root, nested plain records/arrays, enumerable own data fields. Key-array paths preserve literal dots; depth 12/cycles are rejected. Empty containers are leaves.',
  sumBy:
    'Strict finite numeric own fields; missing/non-numeric fields or overflow reject the whole input. Empty records sum to zero.',
  averageBy:
    'Arithmetic mean of strict finite own fields. Empty input, missing fields or intermediate sum overflow return null.',
  minBy:
    'Original record with the smallest finite own numeric field; first tie wins. Empty/invalid input is null; no sorting.',
  maxBy:
    'Original record with the largest finite own numeric field; first tie wins. Empty/invalid input is null; no sorting.',
  summarizeBy:
    'One-pass count/sum/mean/min/max; strict finite own fields. Empty input or sum overflow is null.',
  percentileBy:
    'Percent 0–100, default 50. R7 linear interpolation over a sorted copy; input is unchanged. O(n log n); empty/invalid input is null.',
  weightedAverageBy:
    'Explicit finite nonnegative weights; zero weights allowed but total weight must be positive. Missing fields or arithmetic overflow are null.',
  extentBy:
    'Numeric [minimum, maximum] bounds, not source records. Strict finite own fields; empty input is null.',
  cumulativeSum:
    'Finite numeric array, stable prefix totals. Any nonfinite value or intermediate overflow rejects the whole input.',
  movingAverage:
    'Full windows only, size 1–5,000. Linear running sum; IEEE-754 rounding applies. Invalid values or intermediate overflow reject the input.',
  histogram:
    'Bins 1–256, default 5; equal-width half-open bins, final bin includes the maximum. Constant data yields one bin. Invalid/overflowing ranges return an empty list.',
  percentageChange:
    '(value − baseline) / abs(baseline) × 100; baseline must be nonzero. Negative means decrease, including negative baselines. IEEE-754, not financial advice.',
  clamp: 'Finite value and ordered finite minimum/maximum only; endpoints are inclusive.',
  roundTo:
    'Precision −12..12, default 0; decimal exponent shift, ties toward positive infinity. Returns a number, not formatted text; overflow is null.',
  roundToStep:
    'Positive finite step and finite origin (default 0); nearest increment with ties toward positive infinity. IEEE-754 artifacts may remain; not decimal finance precision.',
  ratio:
    'Finite numerator and nonzero finite divisor; rejects overflow. Returns the quotient, not a percentage label.',
  pluralCategory:
    'Intl cardinal/ordinal category (default cardinal), not translated text. For supplied translation mappings use Angular I18nPluralPipe.',
  formatFraction:
    'Best absolute-error approximation with denominator 1–10,000 (default 100). Ties keep the smaller denominator; localized digits, no grouping. O(maximumDenominator).',
  basisPoints:
    'Decimal ratio × 10,000, localized with 0–20 maximum fraction digits (default 2). The bp label is invariant; display formatting only.',
  numberBase:
    'Safe integer number or bigint; radix 2–36 (default 16). ASCII digits, no prefix or locale conversion.',
  dateParts:
    'Intl year/month/day parts including literals; timezone defaults to UTC. Unsupported timezone returns an empty list.',
  calendarDayDifference:
    'End minus start UTC calendar date; independent of elapsed hours and local DST. Returns signed days.',
  isWithinInterval:
    'Timestamp membership with inclusive endpoints; reversed or invalid intervals return false.',
  overlapDuration:
    'Shared milliseconds of two ordered half-open intervals; touching endpoints or disjoint intervals return zero, invalid intervals null.',
  isoWeek:
    'UTC ISO Monday-based reporting week-year and week number, which may differ from calendar year. Extreme dates with unrepresentable week-year boundaries return null.',
  quarter: 'UTC calendar quarter 1–4, not a custom fiscal calendar.',
  unixTimestamp: 'Floor epoch seconds; −1 millisecond becomes −1 second.',
  dateBucket:
    'UTC ISO start of day/week(Monday)/month/quarter/year. Unit defaults to day; invalid or unrepresentable boundaries return empty text.',
  businessDaysDifference:
    'UTC Mon–Fri, excluding start and including end; reversed ranges negate the forward count. Explicit holiday dates; max 3,660-day range/holiday list. No holiday service.',
  dateSequence:
    'Fresh inclusive UTC-midnight Dates; ordered range and positive step 1–3,660. Range at most 3,660 days and output at most 3,660 dates; invalid input yields an empty list.',
};
