/** Decode inert JSON before calling the typed library. Never execute source text. */
export type Guard<T> = (value: unknown) => value is T;
export type JsonRecord = Record<string, unknown>;
export type PipeAdapter = (
  value: unknown,
  parameters: readonly unknown[],
  locale: string,
) => unknown;
type ArgumentGuards<Args extends readonly unknown[]> = {
  readonly [K in keyof Args]-?: Guard<Args[K]>;
};

function isArguments<Args extends readonly unknown[]>(
  values: readonly unknown[],
  guards: ArgumentGuards<Args>,
): values is Args {
  return values.length === guards.length && guards.every((guard, index) => guard(values[index]));
}

export function adapt<Args extends unknown[]>(
  transform: (...args: Args) => unknown,
  guards: ArgumentGuards<Args>,
  select: (value: unknown, parameters: readonly unknown[], locale: string) => readonly unknown[],
): PipeAdapter {
  return (value, parameters, locale) => {
    const args = select(value, parameters, locale);
    if (!isArguments(args, guards))
      throw new Error('Input or parameters do not match this pipe’s documented JSON contract.');
    return transform(...args);
  };
}

export const unknownValue: Guard<unknown> = (_value): _value is unknown => true;
export const text: Guard<string> = (value): value is string => typeof value === 'string';
export const number: Guard<number> = (value): value is number =>
  typeof value === 'number' && Number.isFinite(value);
export const nonnegativeInteger: Guard<number> = (value): value is number =>
  number(value) && Number.isSafeInteger(value) && value >= 0;
export const validDate: Guard<Date> = (value): value is Date =>
  value instanceof Date && Number.isFinite(value.getTime());
export const boolean: Guard<boolean> = (value): value is boolean => typeof value === 'boolean';
export const dateInput: Guard<string | number | Date> = (value): value is string | number | Date =>
  text(value) || number(value) || value instanceof Date;
export const key: Guard<string | number> = (value): value is string | number =>
  text(value) || number(value);
export const oneOfTypeTextNumber = key;
export const scalar: Guard<string | number | boolean> = (
  value,
): value is string | number | boolean => text(value) || number(value) || boolean(value);
export const pair: Guard<readonly [unknown, unknown]> = (
  value,
): value is readonly [unknown, unknown] => Array.isArray(value) && value.length === 2;

export function optional<T>(guard: Guard<T>): Guard<T | undefined> {
  return (value): value is T | undefined => value === undefined || guard(value);
}
export function nullable<T>(guard: Guard<T>): Guard<T | null | undefined> {
  return (value): value is T | null | undefined =>
    value === null || value === undefined || guard(value);
}
export function arrayOf<T>(guard: Guard<T>): Guard<readonly T[]> {
  return (value): value is readonly T[] => Array.isArray(value) && value.every(guard);
}
export function oneOf<const T extends readonly (string | number | boolean)[]>(
  ...values: T
): Guard<T[number]> {
  return (value): value is T[number] => values.some((item) => item === value);
}
export const record: Guard<JsonRecord> = (value): value is JsonRecord => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return (
    (prototype === Object.prototype || prototype === null) &&
    Object.values(Object.getOwnPropertyDescriptors(value)).every(
      (descriptor) => 'value' in descriptor,
    )
  );
};
export function recordOf<T>(guard: Guard<T>): Guard<Readonly<Record<string, T>>> {
  return (value): value is Readonly<Record<string, T>> =>
    record(value) && Object.values(value).every(guard);
}
type Shape = Readonly<Record<string, Guard<unknown>>>;
type ShapeValue<S extends Shape> = { [K in keyof S]: S[K] extends Guard<infer T> ? T : never };
/** Only own data properties; unknown options are errors, not silently ignored typos. */
export function objectOf<S extends Shape>(shape: S): Guard<ShapeValue<S>> {
  return (value): value is ShapeValue<S> =>
    record(value) &&
    Object.keys(value).every((key) => Object.hasOwn(shape, key)) &&
    Object.entries(shape).every(([key, guard]) =>
      guard(Object.hasOwn(value, key) ? value[key] : undefined),
    );
}

export const listOptions = optional(
  objectOf({
    type: optional(oneOf('conjunction', 'disjunction', 'unit')),
    style: optional(oneOf('long', 'short', 'narrow')),
    localeMatcher: optional(oneOf('lookup', 'best fit')),
  }),
);
export const displayNameOptions = optional(
  objectOf({
    style: optional(oneOf('long', 'short', 'narrow')),
    fallback: optional(oneOf('code', 'none')),
    languageDisplay: optional(oneOf('dialect', 'standard')),
    localeMatcher: optional(oneOf('lookup', 'best fit')),
  }),
);
export const byteSizeOptions = optional(
  objectOf({ base: optional(oneOf(1000, 1024)), maximumFractionDigits: optional(number) }),
);
export const slugifyOptions = optional(
  objectOf({
    lowercase: optional(boolean),
    foldLatinAccents: optional(boolean),
    separator: optional(oneOf('-', '_')),
  }),
);
const numberFields = {
  localeMatcher: optional(oneOf('lookup', 'best fit')),
  currency: optional(text),
  currencyDisplay: optional(oneOf('symbol', 'narrowSymbol', 'code', 'name')),
  currencySign: optional(oneOf('standard', 'accounting')),
  numberingSystem: optional(text),
  minimumIntegerDigits: optional(number),
  minimumFractionDigits: optional(number),
  maximumFractionDigits: optional(number),
  minimumSignificantDigits: optional(number),
  maximumSignificantDigits: optional(number),
  useGrouping: optional(oneOf(true, false, 'always', 'auto', 'min2')),
  notation: optional(oneOf('standard', 'scientific', 'engineering', 'compact')),
  compactDisplay: optional(oneOf('short', 'long')),
  signDisplay: optional(oneOf('auto', 'never', 'always', 'exceptZero', 'negative')),
  unitDisplay: optional(oneOf('short', 'long', 'narrow')),
  roundingMode: optional(
    oneOf(
      'ceil',
      'floor',
      'expand',
      'trunc',
      'halfCeil',
      'halfFloor',
      'halfExpand',
      'halfTrunc',
      'halfEven',
    ),
  ),
  roundingPriority: optional(oneOf('auto', 'morePrecision', 'lessPrecision')),
  roundingIncrement: optional(
    oneOf(1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 2500, 5000),
  ),
  trailingZeroDisplay: optional(oneOf('auto', 'stripIfInteger')),
};
export const unitOptions = optional(objectOf(numberFields));
export const numberRangeOptions = optional(
  objectOf({
    ...numberFields,
    style: optional(oneOf('decimal', 'currency', 'percent', 'unit')),
    unit: optional(text),
  }),
);
export const dateRangeOptions = optional(
  objectOf({
    localeMatcher: optional(oneOf('lookup', 'best fit')),
    timeZone: optional(text),
    calendar: optional(text),
    numberingSystem: optional(text),
    weekday: optional(oneOf('long', 'short', 'narrow')),
    era: optional(oneOf('long', 'short', 'narrow')),
    year: optional(oneOf('numeric', '2-digit')),
    month: optional(oneOf('numeric', '2-digit', 'long', 'short', 'narrow')),
    day: optional(oneOf('numeric', '2-digit')),
    hour: optional(oneOf('numeric', '2-digit')),
    minute: optional(oneOf('numeric', '2-digit')),
    second: optional(oneOf('numeric', '2-digit')),
    hour12: optional(boolean),
    hourCycle: optional(oneOf('h11', 'h12', 'h23', 'h24')),
    dayPeriod: optional(oneOf('narrow', 'short', 'long')),
    fractionalSecondDigits: optional(oneOf(1, 2, 3)),
    timeZoneName: optional(
      oneOf('long', 'short', 'shortOffset', 'longOffset', 'shortGeneric', 'longGeneric'),
    ),
    formatMatcher: optional(oneOf('basic', 'best fit')),
    dateStyle: optional(oneOf('full', 'long', 'medium', 'short')),
    timeStyle: optional(oneOf('full', 'long', 'medium', 'short')),
  }),
);
