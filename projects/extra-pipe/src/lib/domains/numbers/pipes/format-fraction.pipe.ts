import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../../internal/intl';
import { formatFraction } from '../numbers.functions';
export { formatFraction } from '../numbers.functions';
/** Approximate finite values as localized bounded-denominator fractions. */
@Pipe({ name: 'formatFraction', standalone: true, pure: true })
export class FormatFractionPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: number | null | undefined,
    maximumDenominator = 100,
    locale?: string
  ): string {
    return formatFraction(
      value,
      maximumDenominator,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
