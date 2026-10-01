import {
  DateInput,
  resolveLocale,
  toValidDate,
} from '../../shared/helper/intl.helper';
import { DAY_MS, integer } from '../../shared/helper/toolbox.helper';
import { DateBucketUnit, IsoWeekResult } from './toolbox.types';

function day(value: DateInput | null | undefined): number | null {
  const date = toValidDate(value);
  return date ? Math.floor(date.getTime() / DAY_MS) : null;
}
export function dateParts(
  value: DateInput | null | undefined,
  timeZone = 'UTC',
  locale = 'en-US'
): Intl.DateTimeFormatPart[] {
  const date = toValidDate(value);
  if (!date || typeof timeZone !== 'string') return [];
  try {
    return new Intl.DateTimeFormat(resolveLocale(locale, 'en-US'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone,
    }).formatToParts(date);
  } catch {
    return [];
  }
}
/** End minus start in UTC calendar days, independent of elapsed hours and DST. */
export function calendarDayDifference(
  value: DateInput | null | undefined,
  end: DateInput
): number | null {
  const startDay = day(value),
    endDay = day(end);
  return startDay !== null && endDay !== null ? endDay - startDay : null;
}
export function isWithinInterval(
  value: DateInput | null | undefined,
  start: DateInput,
  end: DateInput
): boolean {
  const date = toValidDate(value),
    a = toValidDate(start),
    b = toValidDate(end);
  return (
    !!date &&
    !!a &&
    !!b &&
    a.getTime() <= b.getTime() &&
    date.getTime() >= a.getTime() &&
    date.getTime() <= b.getTime()
  );
}
export function overlapDuration(
  value: DateInput | null | undefined,
  end: DateInput,
  otherStart: DateInput,
  otherEnd: DateInput
): number | null {
  const a = toValidDate(value),
    b = toValidDate(end),
    c = toValidDate(otherStart),
    d = toValidDate(otherEnd);
  if (
    !a ||
    !b ||
    !c ||
    !d ||
    a.getTime() > b.getTime() ||
    c.getTime() > d.getTime()
  )
    return null;
  return Math.max(
    0,
    Math.min(b.getTime(), d.getTime()) - Math.max(a.getTime(), c.getTime())
  );
}
export function isoWeek(
  value: DateInput | null | undefined
): IsoWeekResult | null {
  const ordinal = day(value);
  if (ordinal === null) return null;
  const date = new Date(ordinal * DAY_MS);
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const year = date.getUTCFullYear(),
    first = new Date(0);
  first.setUTCFullYear(year, 0, 1);
  if (Number.isNaN(first.getTime())) return null;
  return {
    year,
    week: Math.ceil(((date.getTime() - first.getTime()) / DAY_MS + 1) / 7),
  };
}
export function quarter(value: DateInput | null | undefined): number | null {
  const date = toValidDate(value);
  return date ? Math.floor(date.getUTCMonth() / 3) + 1 : null;
}
export function unixTimestamp(
  value: DateInput | null | undefined
): number | null {
  const date = toValidDate(value);
  return date ? Math.floor(date.getTime() / 1000) : null;
}
export function dateBucket(
  value: DateInput | null | undefined,
  unit: DateBucketUnit = 'day'
): string {
  const ordinal = day(value);
  if (
    ordinal === null ||
    !['day', 'week', 'month', 'quarter', 'year'].includes(unit)
  )
    return '';
  const date = new Date(ordinal * DAY_MS);
  if (unit === 'week')
    date.setUTCDate(date.getUTCDate() - ((date.getUTCDay() + 6) % 7));
  if (unit === 'month') date.setUTCDate(1);
  if (unit === 'quarter')
    date.setUTCMonth(Math.floor(date.getUTCMonth() / 3) * 3, 1);
  if (unit === 'year') date.setUTCMonth(0, 1);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}
/** Mon–Fri excluding start, including end; reverse ranges negate the forward count. */
export function businessDaysDifference(
  value: DateInput | null | undefined,
  end: DateInput,
  holidays: readonly DateInput[] = []
): number | null {
  const start = day(value),
    finish = day(end);
  if (
    start === null ||
    finish === null ||
    !Array.isArray(holidays) ||
    holidays.length > 3660
  )
    return null;
  const holidayDays = holidays.map(day);
  if (holidayDays.some(n => n === null)) return null;
  if (Math.abs(finish - start) > 3660) return null;
  const blocked = new Set(holidayDays);
  let count = 0;
  for (
    let current = Math.min(start, finish) + 1;
    current <= Math.max(start, finish);
    current++
  ) {
    const weekday = new Date(current * DAY_MS).getUTCDay();
    if (weekday !== 0 && weekday !== 6 && !blocked.has(current)) count++;
  }
  return finish < start ? -count : count;
}
export function dateSequence(
  value: DateInput | null | undefined,
  end: DateInput,
  stepDays = 1
): Date[] {
  const start = day(value),
    finish = day(end);
  if (
    start === null ||
    finish === null ||
    finish < start ||
    finish - start > 3660 ||
    !integer(stepDays, 1, 3660)
  )
    return [];
  const count = Math.floor((finish - start) / stepDays) + 1;
  if (count > 3660) return [];
  return Array.from(
    { length: count },
    (_, i) => new Date((start + i * stepDays) * DAY_MS)
  );
}
