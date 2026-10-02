import { slugify, SlugifyPipe } from './pipes/slugify.pipe';
describe('slugify', () => {
  it('preserves Unicode letters by default', () => {
    expect(new SlugifyPipe().transform('  Café & Angular! ')).toBe(
      'café-angular'
    );
    expect(slugify('مرحبا بالعالم')).toBe('مرحبا-بالعالم');
    expect(slugify('你好 世界')).toBe('你好-世界');
    expect(slugify('e\u0301')).toBe('é');
  });
  it('optionally folds Latin accents without removing Arabic marks', () => {
    expect(slugify('Café ن\u0651', { foldLatinAccents: true })).toBe(
      'cafe-ن\u0651'
    );
    expect(slugify('Angular Tools', { lowercase: false, separator: '_' })).toBe(
      'Angular_Tools'
    );
  });
  it('handles empty or invalid input/options', () => {
    expect(slugify('😎')).toBe('');
    expect(slugify(null)).toBe('');
    expect(slugify('A', { separator: '/' as '-' })).toBe('');
    expect(slugify('A', { lowercase: 1 as unknown as boolean })).toBe('');
  });
});
