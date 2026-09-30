import { formatUnit, FormatUnitPipe } from '../core/pipes/format-unit.pipe';
describe('formatUnit', () => {
  it('formats units, locales and rounding without conversion', () => {
    ['en', 'fr', 'ar'].forEach(locale =>
      expect(
        new FormatUnitPipe(locale).transform(12.5, 'kilometer', {
          maximumFractionDigits: 0,
        })
      ).toBe(
        new Intl.NumberFormat(locale, {
          style: 'unit',
          unit: 'kilometer',
          maximumFractionDigits: 0,
        }).format(12.5)
      )
    );
    expect(formatUnit(0, 'meter')).not.toBe('');
    expect(formatUnit(-1, 'meter')).not.toBe('');
  });
  it('rejects invalid numbers, units and options', () => {
    [null, undefined, NaN, Infinity, '2'].forEach(value =>
      expect(formatUnit(value as number, 'meter')).toBe('')
    );
    expect(formatUnit(1, 'not-a-unit')).toBe('');
    expect(formatUnit(1, 'meter', { maximumFractionDigits: -1 })).toBe('');
    expect(new FormatUnitPipe('fr').transform(2, 'meter', {}, 'en')).toBe(
      formatUnit(2, 'meter')
    );
  });
});
