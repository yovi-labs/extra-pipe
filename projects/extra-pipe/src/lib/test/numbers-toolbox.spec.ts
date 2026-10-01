import {
  BasisPointsPipe,
  ClampPipe,
  FormatFractionPipe,
  NumberBasePipe,
  PluralCategoryPipe,
  RatioPipe,
  RoundToPipe,
  RoundToStepPipe,
  basisPoints,
  clamp,
  formatFraction,
  numberBase,
  pluralCategory,
  ratio,
  roundTo,
  roundToStep,
} from '../../public-api';
function snapshot(value: unknown): unknown {
  return value instanceof Map
    ? Array.from(value.entries())
    : JSON.parse(JSON.stringify(value));
}
function freeze(value: unknown): void {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
}
describe('numbers toolbox exports', () => {
  describe('clamp', () => {
    const invoke = clamp as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 120;
      const args: unknown[] = [0, 100];
      const expected = 100;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new ClampPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[0, 100]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 120;
      const args: unknown[] = [0, 100];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('roundTo', () => {
    const invoke = roundTo as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 12.345;
      const args: unknown[] = [2];
      const expected = 12.35;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new RoundToPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[2]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 12.345;
      const args: unknown[] = [2];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('roundToStep', () => {
    const invoke = roundToStep as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 7.6;
      const args: unknown[] = [0.5];
      const expected = 7.5;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new RoundToStepPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[0.5]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 7.6;
      const args: unknown[] = [0.5];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('ratio', () => {
    const invoke = ratio as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 3;
      const args: unknown[] = [2];
      const expected = 1.5;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new RatioPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[2]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 3;
      const args: unknown[] = [2];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('pluralCategory', () => {
    const invoke = pluralCategory as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 2;
      const args: unknown[] = ['cardinal'];
      const expected = 'other';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new PluralCategoryPipe('en-US');
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...['cardinal']))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 2;
      const args: unknown[] = ['cardinal'];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('formatFraction', () => {
    const invoke = formatFraction as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 1.5;
      const args: unknown[] = [100];
      const expected = '3/2';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new FormatFractionPipe('en-US');
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[100]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 1.5;
      const args: unknown[] = [100];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('basisPoints', () => {
    const invoke = basisPoints as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 0.0125;
      const args: unknown[] = [];
      const expected = '125 bp';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new BasisPointsPipe('en-US');
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 0.0125;
      const args: unknown[] = [];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
  describe('numberBase', () => {
    const invoke = numberBase as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = 255;
      const args: unknown[] = [16];
      const expected = 'ff';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new NumberBasePipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, 'not a number'].forEach(value =>
        expect(snapshot(invoke(value, ...[16]))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = 255;
      const args: unknown[] = [16];
      const before = JSON.stringify([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(JSON.stringify([value, args])).toBe(before);
    });
  });
});
describe('number boundaries and locales', () => {
  it('clamps with ordered finite bounds only', () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(1, 2, 0)).toBeNull();
    expect(clamp(1, NaN, 2)).toBeNull();
    expect(clamp(1, 0, Infinity)).toBeNull();
  });
  it('rounds decimal and signed ties with bounded precision', () => {
    expect(roundTo(1.005, 2)).toBe(1.01);
    expect(roundTo(-1.005, 2)).toBe(-1);
    expect(roundTo(125, -1)).toBe(130);
    expect(roundTo(1e-7, 8)).toBe(1e-7);
    expect(roundTo(1, 13)).toBeNull();
    expect(roundTo(1, 1.5)).toBeNull();
    expect(roundTo(1e308, 12)).toBeNull();
    expect(roundTo(-0)).toBe(0);
    expect(roundToStep(0.3, 0.1)).toBeCloseTo(0.3, 12);
    expect(roundToStep(7, 2, 1)).toBe(7);
    expect(roundToStep(1, 0)).toBeNull();
    expect(roundToStep(1, Infinity)).toBeNull();
    expect(roundToStep(1, 1, NaN)).toBeNull();
    expect(roundToStep(1e308, Number.MIN_VALUE)).toBeNull();
    expect(roundToStep(1e308, 1e308, 1e308)).toBe(1e308);
  });
  it('rejects invalid quotient and reports nonfinite overflow', () => {
    expect(ratio(1, 0)).toBeNull();
    expect(ratio(1, NaN)).toBeNull();
    expect(ratio(1e308, Number.MIN_VALUE)).toBeNull();
  });
  it('uses cardinal and ordinal categories rather than translation text', () => {
    expect(pluralCategory(1)).toBe('one');
    expect(pluralCategory(2, 'ordinal')).toBe('two');
    expect(pluralCategory(0, 'cardinal', 'ar')).toBe('zero');
    expect(pluralCategory(2, 'cardinal', 'ar')).toBe('two');
    expect(pluralCategory(0, 'cardinal', 'fr')).toBe('one');
    expect(pluralCategory(1, 'bad' as never)).toBe('');
    expect(new PluralCategoryPipe('fr').transform(0)).toBe('one');
    expect(new PluralCategoryPipe('fr').transform(0, 'cardinal', 'en-US')).toBe(
      'other'
    );
  });
  it('bounds fractions and preserves signs with locale digits', () => {
    expect(formatFraction(0)).toBe('0/1');
    expect(formatFraction(-0.5)).toBe('-1/2');
    expect(formatFraction(1 / 3)).toBe('1/3');
    expect(formatFraction(0.3, 2)).toBe('1/2');
    expect(formatFraction(1, 0)).toBe('');
    expect(formatFraction(1, 10001)).toBe('');
    expect(formatFraction(1e20)).toBe('');
    expect(formatFraction(1.5, 100, 'ar')).toBe(
      new Intl.NumberFormat('ar', { useGrouping: false }).format(3) +
        '/' +
        new Intl.NumberFormat('ar').format(2)
    );
    expect(new FormatFractionPipe('fr').transform(1.5)).toBe('3/2');
    expect(formatFraction(Number.MAX_SAFE_INTEGER - 0.5, 10000)).not.toBe('');
  });
  it('formats basis points in three locales and rejects bad digit bounds', () => {
    for (const locale of ['en-US', 'fr', 'ar'])
      expect(new BasisPointsPipe(locale).transform(0.0125)).toBe(
        new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(
          125
        ) + ' bp'
      );
    expect(basisPoints(1, -1)).toBe('');
    expect(basisPoints(1, 21)).toBe('');
    expect(basisPoints(1e308)).toBe('');
    expect(numberBase(255n, 16)).toBe('ff');
    expect(numberBase(-10, 2)).toBe('-1010');
    expect(numberBase(1.5)).toBe('');
    expect(numberBase(1, 1)).toBe('');
    expect(numberBase(1, 37)).toBe('');
    expect(numberBase(Number.MAX_SAFE_INTEGER + 1)).toBe('');
  });
});
