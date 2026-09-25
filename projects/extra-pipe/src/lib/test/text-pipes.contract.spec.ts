import { InitialsPipe, MaskPipe, TruncatePipe } from '../../public-api';

describe('text pipe contracts', () => {
  const truncate = new TruncatePipe();
  const initials = new InitialsPipe();
  const mask = new MaskPipe();

  it('truncates by grapheme rather than UTF-16 code unit', () => {
    expect(truncate.transform('👩🏽‍💻 developer', 3)).toBe('👩🏽‍💻 …');
    expect(truncate.transform('hello', 10)).toBe('hello');
    expect(truncate.transform(null, 3)).toBe('');
    expect(truncate.transform('text', 2, null as never)).toBe('t…');
  });

  it('builds initials from Unicode names and supports a fallback', () => {
    expect(initials.transform('Ána María Masti')).toBe('ÁM');
    expect(initials.transform('   ', 2, '—')).toBe('—');
    expect(initials.transform(undefined)).toBe('');
    expect(initials.transform('', 2, null as never)).toBe('');
  });

  it('masks middle graphemes without exposing more than requested', () => {
    expect(mask.transform('👩🏽‍💻1234', 1, 2)).toBe('👩🏽‍💻••34');
    expect(mask.transform('1234567890', 2, 2, '*')).toBe('12******90');
    expect(mask.transform(null)).toBe('');
    expect(mask.transform('1234', 1, 1, null as never)).toBe('1••4');
  });
});
