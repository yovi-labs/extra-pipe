import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DateInput, resolveLocale } from '../../shared/helper/intl.helper';
import { dateParts } from '../transformations/dates-toolbox';
export { dateParts } from '../transformations/dates-toolbox';
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
