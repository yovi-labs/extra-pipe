import {
  formatList,
  formatUnit,
  getDisplayName,
  formatDateRange,
  formatNumberRange,
  formatByteSize,
  truncateMiddle,
  slugify,
  groupBy,
  orderBy,
  uniqueBy,
  CompactNumberPipe,
  FormatDurationPipe,
  RelativeTimePipe,
  TruncatePipe,
  InitialsPipe,
  MaskPipe,
  CamelToSnakePipe,
  CamelCaseToTitleSeparatedCasePipe,
  CapitalizePipe,
  FileSizePipe,
  FormatDateTimePipe,
  HidePipe,
  Base64ImageUrlPipe,
  IncludesPipe,
  LocalizedDatePipe,
  NumberToWordsPipe,
  RemoveByKeyPipe,
  RemoveDuplicatesByKeyPipe,
  ReplaceCommaPipe,
  RoundHalfPipe,
  SnakeToCamelPipe,
  UnderscoreToTitlePipe,
  UpperCaseFromPipe,
  ListFormatOptions,
  UnitFormatOptions,
  DisplayNameType,
  DisplayNameOptions,
  DateRangeOptions,
  NumberRangeOptions,
  ByteSizeOptions,
  SlugifyOptions,
  SortDirection,
  UniqueRetention,
} from 'extra-pipe';

type RecordItem = Record<string, unknown>;
import { EXPANDED_ADAPTERS } from './expanded-adapters';
import { EXPANDED_SAMPLES } from './expanded-samples';
export interface PlaygroundSample {
  readonly input: unknown;
  readonly parameters: readonly unknown[];
}
export const SAMPLES: Readonly<Record<string, PlaygroundSample>> = {
  ...EXPANDED_SAMPLES,
  listFormat: {
    input: ['Angular', 'TypeScript', 'Extra Pipe'],
    parameters: [{ type: 'conjunction', style: 'long' }],
  },
  formatUnit: { input: 12.5, parameters: ['kilometer', { unitDisplay: 'long' }] },
  displayName: { input: 'MA', parameters: ['region', {}] },
  dateRange: {
    input: '2026-03-08T06:30:00Z',
    parameters: [
      '2026-03-08T07:30:00Z',
      { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric' },
    ],
  },
  numberRange: { input: 10, parameters: [25, { style: 'currency', currency: 'EUR' }] },
  byteSize: { input: 1048576, parameters: [{ base: 1024, maximumFractionDigits: 2 }] },
  truncateMiddle: { input: '👨‍👩‍👧‍👦-long-report-final.pdf', parameters: [14, '…'] },
  slugify: { input: 'Café & Angular tools', parameters: [{ foldLatinAccents: true }] },
  groupBy: {
    input: [
      { team: 'A', name: 'Ana' },
      { team: 'B', name: 'Sam' },
      { team: 'A', name: 'Lee' },
    ],
    parameters: ['team'],
  },
  orderBy: {
    input: [{ name: 'Sam' }, { name: 'Ana' }, { name: 'Ana', id: 2 }],
    parameters: ['name', 'asc'],
  },
  uniqueBy: {
    input: [
      { id: 1, name: 'old' },
      { id: 2, name: 'two' },
      { id: 1, name: 'new' },
    ],
    parameters: ['id', 'last'],
  },
  compactNumber: { input: 12500, parameters: ['compact', 1] },
  formatDuration: { input: 90, parameters: ['seconds', 'short'] },
  relativeTime: { input: '2024-01-01T12:03:00Z', parameters: ['2024-01-01T12:00:00Z'] },
  truncate: { input: '👩🏽‍💻 developer tools', parameters: [12, '…'] },
  initials: { input: 'Ana María', parameters: [2, '—'] },
  mask: { input: '4242424242424242', parameters: [0, 4, '•'] },
  camelToSnake: { input: 'extraPipe', parameters: [] },
  camelCaseToTitleSeparatedCase: { input: 'extraPipe', parameters: [] },
  capitalize: { input: 'angular', parameters: [] },
  fileSize: { input: 1048576, parameters: ['MB'] },
  formatDateTime: { input: '2026-01-01T12:00:00Z', parameters: [true, false] },
  hide: { input: 'secret', parameters: [true, '*'] },
  base64ImageUrl: { input: 'SGVsbG8=', parameters: ['image/png'] },
  includes: { input: [0, false], parameters: [false] },
  localizedDate: { input: '2026-01-01T12:00:00Z', parameters: [] },
  numberToWords: { input: 42, parameters: ['en'] },
  removeByKey: {
    input: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ],
    parameters: ['id', [1, 2]],
  },
  removeDuplicatesByKey: {
    input: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 3' },
      { id: 3, name: 'Item 3' },
    ],
    parameters: ['name'],
  },
  replaceComma: { input: '12,5', parameters: [] },
  roundHalf: { input: 44.566, parameters: ['up'] },
  snakeToCamel: { input: 'extra_pipe', parameters: [] },
  underscoreToTitle: { input: 'extra_pipe', parameters: [] },
  upperCaseFrom: { input: 'angular', parameters: [1] },
};
export function runPipe(
  selector: string,
  value: unknown,
  p: readonly unknown[],
  locale: string,
): unknown {
  const adapter = EXPANDED_ADAPTERS.get(selector);
  if (adapter) return adapter(value, p, locale);
  // Casts bridge JSON's unknown type to the public contracts. Each new function
  // validates runtime input; legacy exceptions are handled by the caller.
  const number = value as number,
    text = value as string;
  const records = value as RecordItem[];
  switch (selector) {
    case 'listFormat':
      return formatList(value as string[], p[0] as ListFormatOptions, locale);
    case 'formatUnit':
      return formatUnit(number, p[0] as string, p[1] as UnitFormatOptions, locale);
    case 'displayName':
      return getDisplayName(text, p[0] as DisplayNameType, p[1] as DisplayNameOptions, locale);
    case 'dateRange':
      return formatDateRange(value as string, p[0] as string, p[1] as DateRangeOptions, locale);
    case 'numberRange':
      return formatNumberRange(number, p[0] as number, p[1] as NumberRangeOptions, locale);
    case 'byteSize':
      return formatByteSize(number, p[0] as ByteSizeOptions, locale);
    case 'truncateMiddle':
      return truncateMiddle(text, p[0] as number, p[1] as string);
    case 'slugify':
      return slugify(text, p[0] as SlugifyOptions);
    case 'groupBy':
      return groupBy(records, p[0] as string);
    case 'orderBy':
      return orderBy(records, p[0] as string, p[1] as SortDirection, locale);
    case 'uniqueBy':
      return uniqueBy(records, p[0] as string, p[1] as UniqueRetention);
    case 'compactNumber':
      return new CompactNumberPipe(locale).transform(number, p[0] as 'compact', p[1] as number);
    case 'formatDuration':
      return new FormatDurationPipe(locale).transform(number, p[0] as 'seconds', p[1] as 'short');
    case 'relativeTime':
      return new RelativeTimePipe(locale).transform(text, p[0] as string);
    case 'truncate':
      return new TruncatePipe().transform(text, p[0] as number, p[1] as string);
    case 'initials':
      return new InitialsPipe().transform(text, p[0] as number, p[1] as string);
    case 'mask':
      return new MaskPipe().transform(text, p[0] as number, p[1] as number, p[2] as string);
    case 'camelToSnake':
      return new CamelToSnakePipe().transform(text);
    case 'camelCaseToTitleSeparatedCase':
      return new CamelCaseToTitleSeparatedCasePipe().transform(text);
    case 'capitalize':
      return new CapitalizePipe().transform(text);
    case 'fileSize':
      return new FileSizePipe().transform(number, p[0] as string);
    case 'formatDateTime':
      return new FormatDateTimePipe().transform(
        typeof value === 'string' ? new Date(value) : (value as Date),
        p[0] as boolean,
        p[1] as boolean,
      );
    case 'hide':
      return new HidePipe().transform(text, p[0] as boolean, p[1] as string);
    case 'base64ImageUrl':
      return new Base64ImageUrlPipe().transform(text, p[0] as string);
    case 'includes':
      return new IncludesPipe().transform(value as unknown[], p[0]);
    case 'localizedDate':
      return new LocalizedDatePipe().transform(text, locale);
    case 'numberToWords':
      if (
        typeof value !== 'number' ||
        !Number.isInteger(value) ||
        value < 0 ||
        !['en', 'fr'].includes(p[0] as string)
      )
        throw new Error('Use a nonnegative integer and en/fr for this legacy pipe.');
      return new NumberToWordsPipe().transform(number, p[0] as string);
    case 'removeByKey':
      return new RemoveByKeyPipe().transform(records, p[0] as string, p[1] as unknown[]);
    case 'removeDuplicatesByKey':
      return new RemoveDuplicatesByKeyPipe().transform(records, p[0] as string);
    case 'replaceComma':
      return new ReplaceCommaPipe().transform(value as string | number);
    case 'roundHalf':
      return new RoundHalfPipe().transform(number, p[0] as 'up');
    case 'snakeToCamel':
      return new SnakeToCamelPipe().transform(text);
    case 'underscoreToTitle':
      return new UnderscoreToTitlePipe().transform(text);
    case 'upperCaseFrom':
      return new UpperCaseFromPipe().transform(text, p[0] as number);
    default:
      throw new Error('No playground adapter for this selector.');
  }
}
export interface PlaygroundResult {
  readonly output: string;
  readonly error: string;
  readonly value: unknown;
}
export function evaluateInput(
  selector: string,
  input: string,
  parameters: string,
  locale: string,
): PlaygroundResult {
  try {
    if (input.length > 20000 || parameters.length > 5000)
      throw new Error('Keep playground inputs below 20,000 characters and parameters below 5,000.');
    const value: unknown = JSON.parse(input),
      params: unknown = JSON.parse(parameters);
    if (!Array.isArray(params)) throw new Error('Parameters must be a JSON array.');
    if (params.length > 8) throw new Error('Use at most 8 parameters.');
    assertBoundedData([value, params]);
    if (params.some((parameter) => typeof parameter === 'string' && parameter.length > 128))
      throw new Error('Keep string parameters below 128 characters.');
    if (Array.isArray(value) && value.length > 500)
      throw new Error(
        'The playground accepts up to 500 items. Precompute larger collections outside templates.',
      );
    const output = runPipe(selector, value, params, locale);
    const rendered =
      typeof output === 'string'
        ? output
        : typeof output === 'number'
          ? String(output)
          : (JSON.stringify(
              output instanceof Map ? Array.from(output.entries()) : output,
              null,
              2,
            ) ?? '');
    if (rendered.length > 20000)
      throw new Error('Output is too large for this playground. Reduce the input.');
    return { output: rendered, error: '', value };
  } catch (error) {
    return {
      output: '',
      error:
        error instanceof SyntaxError
          ? 'Enter valid JSON for the input and parameters.'
          : error instanceof Error
            ? error.message
            : 'This input is not supported.',
      value: undefined,
    };
  }
}

/** Bound nested JSON too: root-array limits alone do not protect object inputs. */
function assertBoundedData(value: unknown): void {
  let nodes = 0;
  function visit(current: unknown, depth: number): void {
    if (++nodes > 5000 || depth > 12)
      throw new Error('Keep data below 5,000 values and 12 nesting levels.');
    if (Array.isArray(current)) {
      if (current.length > 500)
        throw new Error('The playground accepts up to 500 items per collection.');
      current.forEach((item) => visit(item, depth + 1));
    } else if (current && typeof current === 'object') {
      Object.values(current).forEach((item) => visit(item, depth + 1));
    }
  }
  visit(value, 0);
}
