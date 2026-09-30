import {
  truncateMiddle,
  TruncateMiddlePipe,
} from '../core/pipes/truncate-middle.pipe';
describe('truncateMiddle', () => {
  it('retains both ends within a grapheme budget', () => {
    expect(new TruncateMiddlePipe().transform('abcdefgh', 5)).toBe('ab…gh');
    expect(truncateMiddle('abcdefgh', 4)).toBe('ab…h');
    expect(truncateMiddle('👨‍👩‍👧‍👦a🇲🇦be\u0301', 3)).toBe('👨‍👩‍👧‍👦…e\u0301');
    expect(truncateMiddle('abcdef', 4, '')).toBe('abef');
  });
  it('handles suffix budgets, short strings and invalid values', () => {
    expect(truncateMiddle('abc', 9)).toBe('abc');
    expect(truncateMiddle('abc', 0)).toBe('');
    expect(truncateMiddle('abc', 1, '..')).toBe('.');
    expect(truncateMiddle(null, 3)).toBe('');
    expect(truncateMiddle('abc', -1)).toBe('');
    expect(truncateMiddle('abc', 1.5)).toBe('');
  });
});
