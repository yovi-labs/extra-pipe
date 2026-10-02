import { ByteSizePipe, formatByteSize } from './pipes/byte-size.pipe';
describe('byteSize', () => {
  it('distinguishes SI and IEC and promotes rounding boundaries', () => {
    expect(formatByteSize(1000)).toBe('1 kB');
    expect(formatByteSize(1024, { base: 1024 })).toBe('1 KiB');
    expect(formatByteSize(999.995)).toBe('1 kB');
    expect(formatByteSize(0)).toBe('0 B');
    expect(formatByteSize(Number.MAX_VALUE)).not.toBe('');
  });
  it('formats localized numeric output', () => {
    ['en', 'fr', 'ar'].forEach(locale =>
      expect(new ByteSizePipe(locale).transform(1250)).toBe(
        new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(
          1.25
        ) + ' kB'
      )
    );
  });
  it('rejects negative and invalid inputs/options', () => {
    [null, undefined, -1, NaN, Infinity].forEach(value =>
      expect(formatByteSize(value)).toBe('')
    );
    expect(formatByteSize(2, { base: 12 as 1000 })).toBe('');
    expect(formatByteSize(2, { maximumFractionDigits: 21 })).toBe('');
    expect(formatByteSize(2, { maximumFractionDigits: 1.5 })).toBe('');
  });
});
