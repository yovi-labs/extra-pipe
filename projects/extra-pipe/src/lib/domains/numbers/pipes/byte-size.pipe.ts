import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../../internal/intl';

export interface ByteSizeOptions {
  readonly base?: 1000 | 1024;
  readonly maximumFractionDigits?: number;
}
export function formatByteSize(
  value: number | null | undefined,
  options: ByteSizeOptions = {},
  locale = 'en-US'
): string {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value) ||
    value < 0 ||
    !options ||
    typeof options !== 'object' ||
    Array.isArray(options)
  )
    return '';
  const base = options.base ?? 1000,
    digits = options.maximumFractionDigits ?? 2;
  if (
    (base !== 1000 && base !== 1024) ||
    !Number.isInteger(digits) ||
    digits < 0 ||
    digits > 20
  )
    return '';
  const units =
    base === 1000
      ? ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let index =
    value === 0
      ? 0
      : Math.min(
          units.length - 1,
          Math.max(0, Math.floor(Math.log(value) / Math.log(base)))
        );
  let amount = value / Math.pow(base, index);
  // Promote at a rounding boundary so a value never displays as 1000 kB or 1024 KiB.
  if (
    index < units.length - 1 &&
    amount >= base - 0.5 * Math.pow(10, -digits)
  ) {
    index++;
    amount = value / Math.pow(base, index);
  }
  try {
    return (
      new Intl.NumberFormat(resolveLocale(locale, 'en-US'), {
        maximumFractionDigits: digits,
      }).format(amount) +
      ' ' +
      units[index]
    );
  } catch {
    return '';
  }
}
@Pipe({ name: 'byteSize', standalone: true, pure: true })
export class ByteSizePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: number | null | undefined,
    options: ByteSizeOptions = {},
    locale?: string
  ): string {
    return formatByteSize(
      value,
      options,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
