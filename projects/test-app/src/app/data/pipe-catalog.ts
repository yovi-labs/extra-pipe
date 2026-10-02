import { PIPE_ALIASES } from './pipe-aliases';
import { EXPANDED_PIPE_DOCS } from './expanded-pipe-docs';
import { PIPE_CAVEATS } from './expanded-pipe-caveats';
export { PIPE_ALIASES } from './pipe-aliases';

export type PipeCategory =
  | 'Text'
  | 'Numbers'
  | 'Dates'
  | 'Localization'
  | 'Collections'
  | 'Utilities';
export interface PipeDoc {
  readonly selector: string;
  readonly className: string;
  readonly category: PipeCategory;
  readonly description: string;
  readonly example: string;
  readonly output: string;
  readonly contract: string;
  readonly invalid: string;
  readonly locale: string;
  readonly pure: boolean;
  readonly status: 'stable' | 'preview';
  readonly json?: boolean;
  readonly keyValue?: boolean;
}
export const PIPE_DOCS: readonly PipeDoc[] = [
  ...EXPANDED_PIPE_DOCS.map((pipe) => ({
    ...pipe,
    contract: pipe.contract + ' ' + PIPE_CAVEATS[pipe.selector],
  })),
  {
    selector: 'compactNumber',
    className: 'CompactNumberPipe',
    category: 'Numbers',
    description: 'Compact counts, without custom suffix rules.',
    example: "{{ 12500 | compactNumber: 'compact': 1: 'en' }}",
    output: '12.5K',
    contract: 'Finite number or bigint; notation and 0–20 maximum fraction digits.',
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'formatDuration',
    className: 'FormatDurationPipe',
    category: 'Dates',
    description: 'Make elapsed time readable.',
    example: "{{ 90 | formatDuration: 'seconds': 'short': 'en' }}",
    output: '1 min, 30 sec',
    contract:
      'Nonnegative duration; unit milliseconds/seconds/minutes/hours, style long/short/narrow.',
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'relativeTime',
    className: 'RelativeTimePipe',
    category: 'Dates',
    description: 'Human time, with a caller-controlled clock.',
    example: "{{ publishedAt | relativeTime: referenceTime: 'en' }}",
    output: 'in 3 minutes',
    contract:
      'Date, ISO string or epoch milliseconds; referenceTime must be supplied and updated by the caller.',
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override. No internal timer.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'truncate',
    className: 'TruncatePipe',
    category: 'Text',
    description: 'Short text that keeps emoji intact.',
    example: "{{ '👩🏽‍💻 developer tools' | truncate: 12 }}",
    output: '👩🏽‍💻 developer…',
    contract: 'String; nonnegative grapheme budget includes suffix. Invalid length becomes zero.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'initials',
    className: 'InitialsPipe',
    category: 'Text',
    description: 'Name badges in one expression.',
    example: "{{ 'Ana María' | initials: 2: '—' }}",
    output: 'AM',
    contract:
      'String; maximumWords defaults to 2; optional fallback. Uppercase output can expand some characters.',
    invalid: 'Fallback (default empty)',
    locale: 'Runtime default casing locale; no override.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'mask',
    className: 'MaskPipe',
    category: 'Text',
    description: 'Show only what a label needs.',
    example: "{{ '4242424242424242' | mask: 0: 4: '•' }}",
    output: '••••••••••••4242',
    contract:
      'String; visibleStart/visibleEnd default 0/4; first grapheme of mask character. Display masking is not data protection.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'camelToSnake',
    className: 'CamelToSnakePipe',
    category: 'Text',
    description: 'Convert camel case to underscores.',
    example: "{{ 'extraPipe' | camelToSnake }}",
    output: 'extra_pipe',
    contract: 'String; inserts an underscore before each uppercase ASCII letter.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'camelCaseToTitleSeparatedCase',
    className: 'CamelCaseToTitleSeparatedCasePipe',
    category: 'Text',
    description: 'Legacy camel-case title splitting.',
    example: "{{ 'extraPipe' | camelCaseToTitleSeparatedCase }}",
    output: 'extra Pipe',
    contract: 'String; legacy spelling retained. Prefer the corrected compatibility selector.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'capitalize',
    className: 'CapitalizePipe',
    category: 'Text',
    description: 'Uppercase the first code unit.',
    example: "{{ 'angular' | capitalize }}",
    output: 'Angular',
    contract: 'String; legacy UTF-16 first-character behavior, not a title-casing algorithm.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'fileSize',
    className: 'FileSizePipe',
    category: 'Numbers',
    description: 'The original fixed-megabyte formatter.',
    example: '{{ 1048576 | fileSize }}',
    output: '1.00MB',
    contract:
      'Finite number divided by 1024²; extension defaults to MB; always two decimals. Negative values remain supported.',
    invalid: 'Empty string',
    locale: 'Non-localized decimal output.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'formatDateTime',
    className: 'FormatDateTimePipe',
    category: 'Dates',
    description: 'The original English Date formatter.',
    example: '{{ date | formatDateTime: true: false }}',
    output: 'English date; depends on local timezone',
    contract:
      'Date only; optional numeric month and time flags. Strings are not parsed; invalid Date can throw.',
    invalid: 'String(value) for non-Date input',
    locale: 'Fixed English, runtime timezone.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'hide',
    className: 'HidePipe',
    category: 'Text',
    description: 'Legacy full-string masking.',
    example: "{{ 'secret' | hide: true: '*' }}",
    output: '******',
    contract:
      'String; optional hide flag and symbol. Counts UTF-16 code units; not a security boundary.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'base64ImageUrl',
    className: 'Base64ImageUrlPipe',
    category: 'Utilities',
    description: 'Build a data URL from raw base64.',
    example: "{{ 'SGVsbG8=' | base64ImageUrl: 'image/png' }}",
    output: 'data:image/png;base64,SGVsbG8=',
    contract:
      'String base64 and nonempty MIME string. Does not validate image bytes or sanitize content; only use trusted image data.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'includes',
    className: 'IncludesPipe',
    category: 'Collections',
    description: 'Membership checks, including falsy values.',
    example: '{{ [0, false] | includes: false }}',
    output: 'true',
    contract: 'Array and search value. Uses Array.includes SameValueZero semantics.',
    invalid: 'False for non-arrays',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'localizedDate',
    className: 'LocalizedDatePipe',
    category: 'Dates',
    description: 'Format dates using an explicit locale.',
    example: "{{ '2026-01-01T12:00:00Z' | localizedDate: 'fr' }}",
    output: 'Example date; depends on local timezone',
    contract:
      'Valid Date, date string or epoch milliseconds. Invalid dates return empty; malformed locale can throw.',
    invalid: 'Empty string',
    locale: 'en-US default, not injected LOCALE_ID; override parameter.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'numberToWords',
    className: 'NumberToWordsPipe',
    category: 'Numbers',
    description: 'Legacy English and French number words.',
    example: "{{ 42 | numberToWords: 'en' }}",
    output: 'Forty-Two',
    contract:
      "Use nonnegative whole numbers up to 999999999999 and explicit en/fr. Larger values return a message; unsupported language can throw. Legacy zero is 'Zero' for both languages.",
    invalid: 'No general invalid-input guarantee',
    locale: 'Explicit en/fr; not general locale support.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'removeByKey',
    className: 'RemoveByKeyPipe',
    category: 'Collections',
    description: 'Remove records matching excluded values.',
    example: "{{ items | removeByKey: 'id': [1, 2] }}",
    output: '[{"id":3,"name":"Item 3"}]',
    contract:
      'Object array, own data key and exclusion array. Fresh filtered array; inherited fields and getters are ignored. Replace array references to refresh.',
    invalid: 'Non-array/nullish input returned unchanged',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'removeDuplicatesByKey',
    className: 'RemoveDuplicatesByKeyPipe',
    category: 'Collections',
    description: 'Legacy last-wins deduplication.',
    example: "{{ itemsWithDuplication | removeDuplicatesByKey: 'name' }}",
    output: '[{"id":1,"name":"Item 1"},{"id":3,"name":"Item 3"}]',
    contract:
      'Object array and own data key. Last duplicate wins in first-key insertion order; getters and inherited fields are ignored. This differs from uniqueBy last retention order.',
    invalid: 'Non-array/nullish input returned unchanged',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'replaceComma',
    className: 'ReplaceCommaPipe',
    category: 'Numbers',
    description: 'Coerce a decimal-comma value.',
    example: "{{ '12,5' | replaceComma }}",
    output: '12.5',
    contract:
      'Number or string; replace first comma with dot then Number coercion. Not a localized number parser.',
    invalid: 'NaN (empty string/null may coerce to zero)',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'roundHalf',
    className: 'RoundHalfPipe',
    category: 'Numbers',
    description: 'Legacy two-decimal tie rounding.',
    example: "{{ 44.566 | roundHalf: 'up' }}",
    output: '44.57',
    contract:
      'Number; up/default or down. Preserves legacy floating-point rounding behavior; not monetary arithmetic.',
    invalid: 'No general invalid-input guarantee',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'snakeToCamel',
    className: 'SnakeToCamelPipe',
    category: 'Text',
    description: 'Join underscore-separated words.',
    example: "{{ 'extra_pipe' | snakeToCamel }}",
    output: 'extraPipe',
    contract: 'String; removes underscores preceding ASCII letters and uppercases the letter.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'underscoreToTitle',
    className: 'UnderscoreToTitlePipe',
    category: 'Text',
    description: 'Turn underscore separators into spaces.',
    example: "{{ 'extra_pipe' | underscoreToTitle }}",
    output: 'extra pipe',
    contract: 'String; replaces underscores; does not title-case words.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'upperCaseFrom',
    className: 'UpperCaseFromPipe',
    category: 'Text',
    description: 'Uppercase a character at an index.',
    example: "{{ 'angular' | upperCaseFrom: 1 }}",
    output: 'aNgular',
    contract: 'String plus zero-based UTF-16 index. Out-of-range index leaves input unchanged.',
    invalid: 'Empty for nullish input',
    locale: 'No locale argument.',
    pure: true,
    status: 'stable',
  },
  {
    selector: 'groupBy',
    className: 'GroupByPipe',
    category: 'Collections',
    description: 'Readonly object arrays become ordered `{key, items}` groups.',
    example: "{{ items | groupBy: 'team' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      'Readonly object arrays become ordered `{key, items}` groups. Encounter order and item identity are retained. Missing direct properties group under `undefined`. Map semantics make prototype-like keys safe. Invalid input returns `[]`.',
    invalid: 'Empty array',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'uniqueBy',
    className: 'UniqueByPipe',
    category: 'Collections',
    description: 'Readonly object arrays; retain `first` by default or `last` explicitly.',
    example: "{{ items | uniqueBy: 'id': 'last' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      'Readonly object arrays; retain `first` by default or `last` explicitly. Retained items remain in source order and keep identity. Direct property keys use Map equality. Invalid input returns `[]`. This is additive and does not change the legacy deduplicate pipe.',
    invalid: 'Empty array',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'orderBy',
    className: 'OrderByPipe',
    category: 'Collections',
    description: 'Readonly arrays; stable ascending/default or descending sort by a direct key.',
    example: "{{ items | orderBy: 'name': 'asc': 'fr' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      'Readonly arrays; stable ascending/default or descending sort by a direct key. Finite numbers compare numerically, strings use numeric locale collation. Mixed numbers/strings form number-then-string type groups in ascending order (reversed for descending); missing/invalid keys are always last. Returns a new array retaining item identity.',
    invalid: 'Empty array',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'listFormat',
    className: 'ListFormatPipe',
    category: 'Localization',
    description:
      'Formats readonly string lists using Intl conjunction, disjunction or unit grammar.',
    example:
      "{{ ['Angular', 'TypeScript', 'Extra Pipe'] | listFormat: {type: 'conjunction'}: 'fr' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      "Formats readonly string lists using Intl conjunction, disjunction or unit grammar. Options: `type` and `style`. Rejects non-string members and invalid options with `''`; empty list returns `''`. Does not mutate input.",
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'formatUnit',
    className: 'FormatUnitPipe',
    category: 'Numbers',
    description: 'Formats a finite number with a sanctioned Intl simple or compound unit.',
    example: "{{ 12.5 | formatUnit: 'kilometer': {unitDisplay: 'long'}: 'fr' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      "Formats a finite number with a sanctioned Intl simple or compound unit. This is presentation, not unit conversion. Options exclude `style`/`unit`; they cannot override the chosen unit. Nullish numbers, unsupported units or invalid options return `''`.",
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'displayName',
    className: 'DisplayNamePipe',
    category: 'Localization',
    description:
      'Intl display names for language, region, script, currency, calendar or dateTimeField codes.',
    example: "{{ 'MA' | displayName: 'region': {}: 'ar' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      "Intl display names for language, region, script, currency, calendar or dateTimeField codes. Options include style, fallback and languageDisplay. Default Intl fallback may return an unknown code; `fallback: 'none'` returns `''`. Malformed codes/options return `''`.",
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'dateRange',
    className: 'DateRangePipe',
    category: 'Dates',
    description: 'Formats ordered Date, epoch-millisecond or parseable string endpoints.',
    example: "{{ start | dateRange: end: {dateStyle: 'medium', timeZone: 'UTC'}: 'fr' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      "Formats ordered Date, epoch-millisecond or parseable string endpoints. Equal timestamps collapse. Explicit timezone recommended; dates are cloned. Reversed/nullish/invalid inputs and invalid options return `''`. Missing native formatRange falls back to two formatted endpoints separated by an en dash.",
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'numberRange',
    className: 'NumberRangePipe',
    category: 'Numbers',
    description: 'Finite ordered endpoints with Intl number options including currency/unit.',
    example: "{{ 10 | numberRange: 25: {style: 'currency', currency: 'EUR'}: 'fr' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      'Finite ordered endpoints with Intl number options including currency/unit. Equal endpoints collapse before rounding. Distinct endpoints that round equally retain native approximate-range semantics. Unsupported runtimes join formatted endpoints with an en dash; no localized output parsing.',
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'byteSize',
    className: 'ByteSizePipe',
    category: 'Numbers',
    description: 'Nonnegative finite byte count.',
    example: "{{ 1048576 | byteSize: {base: 1024}: 'fr' }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      'Nonnegative finite byte count. Decimal SI (`base:1000`) default, binary IEC (`base:1024`) optional. `maximumFractionDigits` defaults to 2, accepts integer 0–20. Promotes rounded boundaries and caps at YB/YiB. Localizes the number, retains standard unit symbols. Legacy fileSize/fileSize are unchanged.',
    invalid: 'Empty string',
    locale: 'Injected LOCALE_ID; optional override.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'truncateMiddle',
    className: 'TruncateMiddlePipe',
    category: 'Text',
    description: 'Length is a grapheme budget including the suffix (default ellipsis).',
    example: "{{ 'long-report-final.pdf' | truncateMiddle: 14 }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      "Length is a grapheme budget including the suffix (default ellipsis). Keeps both ends, assigning an odd spare character to the start. A suffix longer than the budget is itself clipped safely. Invalid inputs return `''`. Requires #31 for grapheme-safe older-runtime fallback.",
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
  },
  {
    selector: 'slugify',
    className: 'SlugifyPipe',
    category: 'Text',
    description:
      'Preserves Unicode letters, numbers and combining marks; normalizes NFC and lowercases by default.',
    example: "{{ 'Café & Angular tools' | slugify: {foldLatinAccents: true} }}",
    output: 'Available in the 1.2 preview playground.',
    contract:
      'Preserves Unicode letters, numbers and combining marks; normalizes NFC and lowercases by default. Optional Latin accent folding is not general transliteration. Separators are `-` (default) or `_`. Output is not a uniqueness guarantee, URL sanitizer or HTML sanitizer; encode URL path segments appropriately.',
    invalid: 'Empty string',
    locale: 'No locale argument.',
    pure: true,
    status: 'preview',
  },
];

export const CATEGORIES: readonly PipeCategory[] = [
  'Text',
  'Numbers',
  'Dates',
  'Localization',
  'Collections',
  'Utilities',
];
export function filterPipes(query: string, category = 'All'): readonly PipeDoc[] {
  const search = query.trim().toLowerCase();
  return PIPE_DOCS.filter(
    (pipe) =>
      (category === 'All' || pipe.category === category) &&
      [
        pipe.selector,
        pipe.description,
        pipe.category,
        pipe.className,
        ...PIPE_ALIASES.filter((alias) => alias.target === pipe.selector).map(
          (alias) => alias.selector,
        ),
      ]
        .join(' ')
        .toLowerCase()
        .includes(search),
  );
}
export function standaloneCode(pipe: PipeDoc): string {
  const needsJson = pipe.json ?? (pipe.category === 'Collections' && pipe.selector !== 'includes');
  const context: Record<string, string> = {
    indexBy: '  readonly keepInsertionOrder = () => 0;',
    unzip: '  readonly pairs = [[1,"A"],[2,"B"]] as const;',
    relativeTime:
      "  readonly publishedAt = new Date('2024-01-01T12:03:00Z');\n  readonly referenceTime = new Date('2024-01-01T12:00:00Z');",
    formatDateTime: "  readonly date = new Date('2026-01-01T12:00:00Z');",
    dateRange:
      "  readonly start = new Date('2026-01-01T12:00:00Z');\n  readonly end = new Date('2026-01-02T12:00:00Z');",
    removeByKey: "  items = [{id:1,name:'Item 1'},{id:2,name:'Item 2'},{id:3,name:'Item 3'}];",
    removeDuplicatesByKey:
      "  readonly itemsWithDuplication = [{id:1,name:'Item 1'},{id:2,name:'Item 3'},{id:3,name:'Item 3'}];",
    groupBy:
      "  readonly items = [{team:'A',name:'Ana'},{team:'B',name:'Sam'},{team:'A',name:'Lee'}];",
    orderBy: "  readonly items = [{name:'Sam'},{name:'Ana'}];",
    uniqueBy: "  readonly items = [{id:1,name:'old'},{id:2,name:'two'},{id:1,name:'new'}];",
  };
  return (
    "import { Component } from '@angular/core';\n" +
    (needsJson
      ? 'import { JsonPipe' +
        (pipe.keyValue ? ', KeyValuePipe' : '') +
        " } from '@angular/common';\n"
      : '') +
    'import { ' +
    pipe.className +
    " } from 'extra-pipe';\n\n@Component({\n  standalone: true,\n  imports: [" +
    pipe.className +
    (needsJson ? ', JsonPipe' + (pipe.keyValue ? ', KeyValuePipe' : '') : '') +
    '],\n  template: \x60' +
    templateCode(pipe) +
    '\x60,\n})\nexport class ExampleComponent {\n' +
    (context[pipe.selector] ?? '') +
    '\n}'
  );
}

export function templateCode(pipe: PipeDoc): string {
  return (pipe.json ?? (pipe.category === 'Collections' && pipe.selector !== 'includes'))
    ? pipe.example.replace(
        /\s*\}\}$/,
        (pipe.keyValue ? ' | keyvalue: keepInsertionOrder' : '') + ' | json }}',
      )
    : pipe.example;
}
