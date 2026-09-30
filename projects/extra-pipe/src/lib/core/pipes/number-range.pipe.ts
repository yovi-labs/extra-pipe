import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../shared/helper/intl.helper';

export type NumberRangeOptions = Intl.NumberFormatOptions;
export function formatNumberRange(
  start: number | null | undefined,
  end: number | null | undefined,
  options: NumberRangeOptions = {},
  locale = 'en-US'
): string {
  if (
    typeof start !== 'number' ||
    typeof end !== 'number' ||
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    start > end ||
    !options ||
    typeof options !== 'object'
  )
    return '';
  try {
    const formatter = new Intl.NumberFormat(
      resolveLocale(locale, 'en-US'),
      options
    );
    if (start === end) return formatter.format(start);
    const ranged = formatter as Intl.NumberFormat & {
      formatRange?: (start: number, end: number) => string;
    };
    return typeof ranged.formatRange === 'function'
      ? ranged.formatRange(start, end)
      : formatter.format(start) + ' – ' + formatter.format(end);
  } catch {
    return '';
  }
}
@Pipe({ name: 'numberRange', standalone: true, pure: true })
export class NumberRangePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    start: number | null | undefined,
    end: number | null | undefined,
    options: NumberRangeOptions = {},
    locale?: string
  ): string {
    return formatNumberRange(
      start,
      end,
      options,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
