import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../shared/helper/intl.helper';

export type UnitFormatOptions = Omit<
  Intl.NumberFormatOptions,
  'style' | 'unit'
>;
export function formatUnit(
  value: number | null | undefined,
  unit: string,
  options: UnitFormatOptions = {},
  locale = 'en-US'
): string {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    typeof unit !== 'string' ||
    !options ||
    typeof options !== 'object'
  )
    return '';
  try {
    return new Intl.NumberFormat(resolveLocale(locale, 'en-US'), {
      ...options,
      style: 'unit',
      unit,
    }).format(value);
  } catch {
    return '';
  }
}
@Pipe({ name: 'formatUnit', standalone: true, pure: true })
export class FormatUnitPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: number | null | undefined,
    unit: string,
    options: UnitFormatOptions = {},
    locale?: string
  ): string {
    return formatUnit(
      value,
      unit,
      options,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
