import { formatByteSize } from '../domains/numbers/pipes/byte-size.pipe';
import { formatDateRange } from '../domains/dates/pipes/date-range.pipe';
import { getDisplayName } from '../domains/display/pipes/display-name.pipe';
import { formatUnit } from '../domains/display/pipes/format-unit.pipe';
import { formatList } from '../domains/display/pipes/list-format.pipe';
import { formatNumberRange } from '../domains/numbers/pipes/number-range.pipe';
import { slugify } from '../domains/text/pipes/slugify.pipe';

describe('Display options runtime boundaries', () => {
  it('rejects arrays supplied in place of typed option objects', () => {
    const options = [] as unknown as Record<string, never>;
    expect(formatByteSize(1024, options)).toBe('');
    expect(formatDateRange(0, 1000, options)).toBe('');
    expect(getDisplayName('FR', 'region', options)).toBe('');
    expect(formatUnit(1, 'meter', options)).toBe('');
    expect(formatList(['A', 'B'], options)).toBe('');
    expect(formatNumberRange(1, 2, options)).toBe('');
    expect(slugify('Hello', options)).toBe('');
  });
});
