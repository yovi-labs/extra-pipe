import {
  formatNumberRange,
  NumberRangePipe,
} from './pipes/number-range.pipe';
describe('numberRange', () => {
  it('formats locales and collapses equal endpoints', () => {
    ['en', 'fr', 'ar'].forEach(locale => {
      expect(
        new NumberRangePipe(locale).transform(1.25, 1.25, {
          maximumFractionDigits: 1,
        })
      ).toBe(
        new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(1.25)
      );
      expect(formatNumberRange(-10, 20, {}, locale)).not.toBe('');
    });
  });
  it('rejects invalid or reversed endpoints/options', () => {
    expect(formatNumberRange(null, 2)).toBe('');
    expect(formatNumberRange(3, 2)).toBe('');
    expect(formatNumberRange(NaN, 2)).toBe('');
    expect(formatNumberRange(1, Infinity)).toBe('');
    expect(formatNumberRange(1, 2, { maximumFractionDigits: -1 })).toBe('');
  });
  it('uses deterministic fallback on older Intl implementations', () => {
    const descriptor = Object.getOwnPropertyDescriptor(
      Intl.NumberFormat.prototype,
      'formatRange'
    );
    Object.defineProperty(Intl.NumberFormat.prototype, 'formatRange', {
      value: undefined,
      configurable: true,
    });
    try {
      expect(formatNumberRange(1, 2, {}, 'en')).toBe('1 – 2');
    } finally {
      if (descriptor)
        Object.defineProperty(
          Intl.NumberFormat.prototype,
          'formatRange',
          descriptor
        );
      else Reflect.deleteProperty(Intl.NumberFormat.prototype, 'formatRange');
    }
  });
});
