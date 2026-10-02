import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DateInput, resolveLocale } from '../../../internal/intl';
import { dateParts } from '../dates.functions';
export { dateParts } from '../dates.functions';
/** Structured Intl calendar fields for segmented date UI. */
@Pipe({ name: 'dateParts', standalone: true, pure: true })
export class DatePartsPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: DateInput | null | undefined,
    timeZone = 'UTC',
    locale?: string
  ): Intl.DateTimeFormatPart[] {
    return dateParts(
      value,
      timeZone,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
