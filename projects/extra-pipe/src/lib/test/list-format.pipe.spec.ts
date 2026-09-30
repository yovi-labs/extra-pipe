import { formatList, ListFormatPipe } from '../core/pipes/list-format.pipe';
describe('listFormat', () => {
  it('formats frozen lists using each locale', () => {
    const items = Object.freeze(['A', 'B', 'C']);
    ['en', 'fr', 'ar'].forEach(locale =>
      expect(new ListFormatPipe(locale).transform(items)).toBe(
        new Intl.ListFormat(locale).format(items)
      )
    );
    expect(formatList(['A', 'B'], { type: 'disjunction' }, 'en')).toBe(
      'A or B'
    );
  });
  it('rejects invalid members/options and supports empty lists/overrides', () => {
    expect(formatList(null)).toBe('');
    expect(formatList([])).toBe('');
    expect(formatList([1] as unknown as string[])).toBe('');
    expect(formatList(['A'], { style: 'bad' } as Intl.ListFormatOptions)).toBe(
      ''
    );
    expect(new ListFormatPipe('fr').transform(['A', 'B'], {}, 'en')).toBe(
      'A and B'
    );
    expect(
      new ListFormatPipe('fr').transform(['A', 'B'], {}, 'bad_locale')
    ).toBe('A et B');
  });
});
