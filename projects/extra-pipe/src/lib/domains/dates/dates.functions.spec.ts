import { snapshot, freeze } from '../../testing/immutable-test-inputs';
import {
  BusinessDaysDifferencePipe,
  CalendarDayDifferencePipe,
  DateBucketPipe,
  DatePartsPipe,
  DateSequencePipe,
  IsWithinIntervalPipe,
  IsoWeekPipe,
  OverlapDurationPipe,
  QuarterPipe,
  UnixTimestampPipe,
  businessDaysDifference,
  calendarDayDifference,
  dateBucket,
  dateParts,
  dateSequence,
  isWithinInterval,
  isoWeek,
  overlapDuration,
  quarter,
  unixTimestamp,
} from '../../../public-api';


describe('dates toolbox exports', () => {
  describe('dateParts', () => {
    const invoke = dateParts as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-01-02T12:00:00Z';
      const args: unknown[] = ['UTC'];
      const output = invoke(value, ...args);
      expect(output).not.toBeNull();
      expect((output as unknown[]).length).toBeGreaterThan(0);
      const pipe = new DatePartsPipe('en-US');
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['UTC']))).toEqual([])
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-01-02T12:00:00Z';
      const args: unknown[] = ['UTC'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('calendarDayDifference', () => {
    const invoke = calendarDayDifference as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-01-01T23:00:00Z';
      const args: unknown[] = ['2026-01-02T01:00:00Z'];
      const expected = 1;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new CalendarDayDifferencePipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['2026-01-02T01:00:00Z']))).toEqual(
          null
        )
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-01-01T23:00:00Z';
      const args: unknown[] = ['2026-01-02T01:00:00Z'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('isWithinInterval', () => {
    const invoke = isWithinInterval as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-01-02T00:00:00Z';
      const args: unknown[] = ['2026-01-01T00:00:00Z', '2026-01-03T00:00:00Z'];
      const expected = true;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new IsWithinIntervalPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(
          snapshot(
            invoke(value, ...['2026-01-01T00:00:00Z', '2026-01-03T00:00:00Z'])
          )
        ).toEqual(false)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-01-02T00:00:00Z';
      const args: unknown[] = ['2026-01-01T00:00:00Z', '2026-01-03T00:00:00Z'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('overlapDuration', () => {
    const invoke = overlapDuration as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-01-01T00:00:00Z';
      const args: unknown[] = [
        '2026-01-01T02:00:00Z',
        '2026-01-01T01:00:00Z',
        '2026-01-01T03:00:00Z',
      ];
      const expected = 3600000;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new OverlapDurationPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(
          snapshot(
            invoke(
              value,
              ...[
                '2026-01-01T02:00:00Z',
                '2026-01-01T01:00:00Z',
                '2026-01-01T03:00:00Z',
              ]
            )
          )
        ).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-01-01T00:00:00Z';
      const args: unknown[] = [
        '2026-01-01T02:00:00Z',
        '2026-01-01T01:00:00Z',
        '2026-01-01T03:00:00Z',
      ];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('isoWeek', () => {
    const invoke = isoWeek as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-01-01T00:00:00Z';
      const args: unknown[] = [];
      const expected = { year: 2026, week: 1 };
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new IsoWeekPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-01-01T00:00:00Z';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('quarter', () => {
    const invoke = quarter as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-05-01T00:00:00Z';
      const args: unknown[] = [];
      const expected = 2;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new QuarterPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-05-01T00:00:00Z';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('unixTimestamp', () => {
    const invoke = unixTimestamp as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '1970-01-01T00:00:01Z';
      const args: unknown[] = [];
      const expected = 1;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new UnixTimestampPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...[]))).toEqual(null)
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '1970-01-01T00:00:01Z';
      const args: unknown[] = [];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('dateBucket', () => {
    const invoke = dateBucket as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-05-15T12:30:00Z';
      const args: unknown[] = ['month'];
      const expected = '2026-05-01T00:00:00.000Z';
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new DateBucketPipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['month']))).toEqual('')
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-05-15T12:30:00Z';
      const args: unknown[] = ['month'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('businessDaysDifference', () => {
    const invoke = businessDaysDifference as unknown as (
      ...args: unknown[]
    ) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-01-02T00:00:00Z';
      const args: unknown[] = ['2026-01-05T00:00:00Z'];
      const expected = 1;
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new BusinessDaysDifferencePipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['2026-01-05T00:00:00Z']))).toEqual(
          null
        )
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-01-02T00:00:00Z';
      const args: unknown[] = ['2026-01-05T00:00:00Z'];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
  describe('dateSequence', () => {
    const invoke = dateSequence as unknown as (...args: unknown[]) => unknown;
    it('has a typed public function and standalone adapter with working example', () => {
      const value = '2026-01-01T00:00:00Z';
      const args: unknown[] = ['2026-01-03T00:00:00Z', 1];
      const expected = [
        '2026-01-01T00:00:00.000Z',
        '2026-01-02T00:00:00.000Z',
        '2026-01-03T00:00:00.000Z',
      ];
      const output = invoke(value, ...args);
      expect(snapshot(output)).toEqual(expected);
      const pipe = new DateSequencePipe();
      expect(
        snapshot(
          (
            pipe.transform.bind(pipe) as unknown as (
              ...args: unknown[]
            ) => unknown
          )(value, ...args)
        )
      ).toEqual(snapshot(output));
    });
    it('rejects nullish and malformed primary input without coercion', () => {
      [null, undefined, false].forEach(value =>
        expect(snapshot(invoke(value, ...['2026-01-03T00:00:00Z', 1]))).toEqual(
          []
        )
      );
    });
    it('preserves frozen sample inputs and parameters', () => {
      const value = '2026-01-01T00:00:00Z';
      const args: unknown[] = ['2026-01-03T00:00:00Z', 1];
      const before = snapshot([value, args]);
      freeze(value);
      freeze(args);
      invoke(value, ...args);
      expect(snapshot([value, args])).toEqual(before);
    });
  });
});
describe('UTC dates, intervals and business calendars', () => {
  it('returns Intl parts in three locales with injected defaults and overrides', () => {
    for (const locale of ['en-US', 'fr', 'ar'])
      expect(new DatePartsPipe(locale).transform('2026-01-02', 'UTC')).toEqual(
        new Intl.DateTimeFormat(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC',
        }).formatToParts(new Date('2026-01-02'))
      );
    expect(
      new DatePartsPipe('ar').transform('2026-01-02', 'UTC', 'fr')
    ).toEqual(dateParts('2026-01-02', 'UTC', 'fr'));
    expect(dateParts('2026-01-02', 'bad zone')).toEqual([]);
    expect(dateParts('2026-01-02', null as never)).toEqual([]);
  });
  it('uses UTC calendar boundaries around offsets, leap days and DST', () => {
    expect(
      calendarDayDifference(
        '2026-03-08T01:30:00-05:00',
        '2026-03-08T03:30:00-04:00'
      )
    ).toBe(0);
    expect(calendarDayDifference('2024-02-28', '2024-03-01')).toBe(2);
    expect(calendarDayDifference('2026-01-02', '2026-01-01')).toBe(-1);
    expect(calendarDayDifference('2026-01-02', 'bad')).toBeNull();
    expect(quarter('2026-12-31')).toBe(4);
    expect(unixTimestamp(-1)).toBe(-1);
  });
  it('uses inclusive membership but half-open overlap', () => {
    expect(isWithinInterval(0, 0, 1)).toBeTrue();
    expect(isWithinInterval(1, 0, 1)).toBeTrue();
    expect(isWithinInterval(2, 0, 1)).toBeFalse();
    expect(isWithinInterval(1, 2, 0)).toBeFalse();
    expect(isWithinInterval(1, 'bad', 2)).toBeFalse();
    expect(isWithinInterval(1, 0, 'bad')).toBeFalse();
    expect(overlapDuration(0, 1, 1, 2)).toBe(0);
    expect(overlapDuration(1, 0, 0, 2)).toBeNull();
    expect(overlapDuration(0, 1, 2, 1)).toBeNull();
    for (let i = 0; i < 3; i++) {
      const args: [number | string, number | string, number | string] = [
        1, 0, 2,
      ];
      args[i] = 'bad';
      expect(overlapDuration(0, ...args)).toBeNull();
    }
  });
  it('returns ISO week years instead of calendar years', () => {
    expect(isoWeek('2021-01-01')).toEqual({ year: 2020, week: 53 });
    expect(isoWeek('2018-12-31')).toEqual({ year: 2019, week: 1 });
    expect(isoWeek('0001-01-01')).toEqual({ year: 1, week: 1 });
    expect(isoWeek(8640000000000000)).toEqual({ year: 275760, week: 37 });
    expect(isoWeek(-8640000000000000)).toBeNull();
  });
  it('normalizes all period buckets without mutating dates', () => {
    const input = new Date('2026-05-17T12:00:00Z'),
      time = input.getTime();
    expect(dateBucket(input)).toBe('2026-05-17T00:00:00.000Z');
    expect(dateBucket(input, 'week')).toBe('2026-05-11T00:00:00.000Z');
    expect(dateBucket(input, 'quarter')).toBe('2026-04-01T00:00:00.000Z');
    expect(dateBucket(input, 'year')).toBe('2026-01-01T00:00:00.000Z');
    expect(dateBucket(input, 'bad' as never)).toBe('');
    expect(input.getTime()).toBe(time);
    expect(dateBucket(-8640000000000000, 'week')).toBe('');
  });
  it('counts bounded caller calendars with signed reversals and duplicate holidays', () => {
    expect(
      businessDaysDifference('2026-01-02', '2026-01-05', [
        '2026-01-05',
        '2026-01-05',
      ])
    ).toBe(0);
    expect(businessDaysDifference('2026-01-05', '2026-01-02')).toBe(-1);
    expect(businessDaysDifference('2026-01-02', '2026-01-04')).toBe(0);
    expect(businessDaysDifference('2026-01-02', '2026-01-02')).toBe(0);
    expect(businessDaysDifference('2026-01-02', 'bad')).toBeNull();
    expect(businessDaysDifference(0, 0, ['bad'])).toBeNull();
    expect(businessDaysDifference(0, 0, null as never)).toBeNull();
    expect(businessDaysDifference(0, 3661 * 86400000)).toBeNull();
    expect(businessDaysDifference(0, 0, Array(3661).fill(0))).toBeNull();
  });
  it('bounds generated dates and creates fresh instances', () => {
    expect(
      dateSequence(0, 2 * 86400000, 2).map(date => date.getTime())
    ).toEqual([0, 2 * 86400000]);
    expect(dateSequence(0, 0, 0)).toEqual([]);
    expect(dateSequence(1, 0)).toEqual([new Date(0)]);
    expect(dateSequence(86400000, 0)).toEqual([]);
    expect(dateSequence(0, 'bad')).toEqual([]);
    expect(dateSequence(0, 3661 * 86400000)).toEqual([]);
    expect(dateSequence(0, 3660 * 86400000)).toEqual([]);
    expect(dateSequence(0, 3659 * 86400000).length).toBe(3660);
    const input = new Date(0);
    expect(dateSequence(input, input)[0]).not.toBe(input);
  });
});
