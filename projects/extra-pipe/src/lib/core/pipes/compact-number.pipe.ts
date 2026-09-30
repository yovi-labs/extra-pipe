import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

import {
  resolveLocale,
  toNonNegativeInteger,
} from '../../shared/helper/intl.helper';

export type CompactNumberNotation = 'compact' | 'standard';

/** Formats finite numbers with compact or standard Intl number notation. */
@Pipe({
  standalone: true,
  name: 'compactNumber',
  pure: true,
})
export class CompactNumberPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}

  transform(
    value: bigint | number | null | undefined,
    notation: CompactNumberNotation = 'compact',
    maximumFractionDigits: number = 1,
    locale?: string
  ): string {
    if (
      (typeof value !== 'number' && typeof value !== 'bigint') ||
      (typeof value === 'number' && !Number.isFinite(value)) ||
      !['compact', 'standard'].includes(notation)
    ) {
      return '';
    }

    const digits = Math.min(toNonNegativeInteger(maximumFractionDigits, 1), 20);

    return new Intl.NumberFormat(resolveLocale(locale, this.defaultLocale), {
      notation,
      compactDisplay: notation === 'compact' ? 'short' : undefined,
      maximumFractionDigits: digits,
    }).format(value);
  }
}
