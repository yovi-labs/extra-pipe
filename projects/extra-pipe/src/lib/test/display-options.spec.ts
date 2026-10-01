import { formatByteSize } from '../core/pipes/byte-size.pipe';
import { formatDateRange } from '../core/pipes/date-range.pipe';
import { getDisplayName } from '../core/pipes/display-name.pipe';
import { formatUnit } from '../core/pipes/format-unit.pipe';
import { formatList } from '../core/pipes/list-format.pipe';
import { formatNumberRange } from '../core/pipes/number-range.pipe';
import { slugify } from '../core/pipes/slugify.pipe';

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
