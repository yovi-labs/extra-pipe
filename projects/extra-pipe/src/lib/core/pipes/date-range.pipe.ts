import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import {
  DateInput,
  resolveLocale,
  toValidDate,
} from '../../shared/helper/intl.helper';

export type DateRangeOptions = Intl.DateTimeFormatOptions;
export type { DateInput } from '../../shared/helper/intl.helper';
export function formatDateRange(
  start: DateInput | null | undefined,
  end: DateInput | null | undefined,
  options: DateRangeOptions = {},
  locale = 'en-US'
): string {
  const from = toValidDate(start),
    to = toValidDate(end);
  if (
    !from ||
    !to ||
    from.getTime() > to.getTime() ||
    !options ||
    typeof options !== 'object' ||
    Array.isArray(options)
  )
    return '';
  try {
    const formatter = new Intl.DateTimeFormat(
      resolveLocale(locale, 'en-US'),
      options
    );
    if (from.getTime() === to.getTime()) return formatter.format(from);
    const ranged = formatter as Intl.DateTimeFormat & {
      formatRange?: (start: Date, end: Date) => string;
    };
    return typeof ranged.formatRange === 'function'
      ? ranged.formatRange(from, to)
      : formatter.format(from) + ' – ' + formatter.format(to);
  } catch {
    return '';
  }
}
@Pipe({ name: 'dateRange', standalone: true, pure: true })
export class DateRangePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    start: DateInput | null | undefined,
    end: DateInput | null | undefined,
    options: DateRangeOptions = {},
    locale?: string
  ): string {
    return formatDateRange(
      start,
      end,
      options,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
