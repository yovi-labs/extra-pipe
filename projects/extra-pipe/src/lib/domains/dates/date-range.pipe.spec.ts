import { DateRangePipe, formatDateRange } from './pipes/date-range.pipe';
describe('dateRange', () => {
  const start = new Date('2026-03-08T06:30:00Z'),
    end = new Date('2026-03-08T07:30:00Z');
  it('formats locale ranges across DST without changing dates', () => {
    const original = start.getTime();
    ['en', 'fr', 'ar'].forEach(locale => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: 'numeric',
        minute: 'numeric',
      };
      expect(new DateRangePipe(locale).transform(start, end, options)).toBe(
        new Intl.DateTimeFormat(locale, options).formatRange(start, end)
      );
    });
    expect(start.getTime()).toBe(original);
    expect(formatDateRange(0, 0, { timeZone: 'UTC' }, 'en')).toBe(
      new Intl.DateTimeFormat('en', { timeZone: 'UTC' }).format(0)
    );
  });
  it('rejects reversed, invalid dates and unsupported zones', () => {
    expect(formatDateRange(end, start)).toBe('');
    expect(formatDateRange(null, end)).toBe('');
    expect(formatDateRange('bad', end)).toBe('');
    expect(formatDateRange(start, end, { timeZone: 'bad' })).toBe('');
  });
  it('falls back when native range formatting is absent', () => {
    const descriptor = Object.getOwnPropertyDescriptor(
      Intl.DateTimeFormat.prototype,
      'formatRange'
    )!;
    Object.defineProperty(Intl.DateTimeFormat.prototype, 'formatRange', {
      value: undefined,
      configurable: true,
    });
    try {
      expect(formatDateRange(0, 86400000, { timeZone: 'UTC' }, 'en')).toBe(
        '1/1/1970 – 1/2/1970'
      );
    } finally {
      Object.defineProperty(
        Intl.DateTimeFormat.prototype,
        'formatRange',
        descriptor
      );
    }
  });
});
