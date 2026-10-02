import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../../internal/intl';
import { basisPoints } from '../numbers.functions';
export { basisPoints } from '../numbers.functions';
/** Display decimal ratios as basis points, without financial advice. */
@Pipe({ name: 'basisPoints', standalone: true, pure: true })
export class BasisPointsPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: number | null | undefined,
    maximumFractionDigits = 2,
    locale?: string
  ): string {
    return basisPoints(
      value,
      maximumFractionDigits,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
