import {
  getGraphemes,
  resolveLocale,
  toValidDate,
} from '../shared/helper/intl.helper';

describe('Intl helpers', () => {
  const samples = ['👨‍👩‍👧‍👦', '🇲🇦', '👍🏽', 'e\u0301', 'ن\u0651'];
  it('keeps extended grapheme clusters intact', () => {
    samples.forEach(sample => expect(getGraphemes(sample)).toEqual([sample]));
  });
  it('uses a real Unicode fallback without Intl.Segmenter', () => {
    const descriptor = Object.getOwnPropertyDescriptor(Intl, 'Segmenter');
    Object.defineProperty(Intl, 'Segmenter', {
      value: undefined,
      configurable: true,
    });
    try {
      samples.forEach(sample => expect(getGraphemes(sample)).toEqual([sample]));
      expect(getGraphemes('')).toEqual([]);
    } finally {
      if (descriptor) Object.defineProperty(Intl, 'Segmenter', descriptor);
      else Reflect.deleteProperty(Intl, 'Segmenter');
    }
  });
  it('validates locales and clones dates', () => {
    expect(resolveLocale('not_a_locale', 'fr')).toBe('fr');
    expect(resolveLocale('', 'ar')).toBe('ar');
    expect(resolveLocale('en', 'fr')).toBe('en');
    const date = new Date(0);
    expect(toValidDate(date)).not.toBe(date);
    [undefined, null, NaN, Infinity, {}, 'not a date', new Date(NaN)].forEach(
      value => {
        expect(toValidDate(value)).toBeNull();
      }
    );
  });
});
