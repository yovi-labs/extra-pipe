import { Pipe, PipeTransform } from '@angular/core';

import { DateInput, toValidDate } from '../../shared/helper/intl.helper';

@Pipe({
  standalone: true,
  name: 'localizedDate',
})
export class LocalizedPipe implements PipeTransform {
  transform(
    value: DateInput | null | undefined,
    userLanguage: string = 'en-US'
  ): string {
    const date = toValidDate(value);

    if (!date) return '';

    const dateFormatter = new Intl.DateTimeFormat(userLanguage, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    return dateFormatter.format(date);
  }
}

/**
 * @deprecated This selector was documented before it existed. Use localizedDate
 * for new templates.
 */
@Pipe({
  standalone: true,
  name: 'localized',
})
export class LocalizedLegacyPipe implements PipeTransform {
  transform(
    value: DateInput | null | undefined,
    userLanguage: string = 'en-US'
  ): string {
    return new LocalizedPipe().transform(value, userLanguage);
  }
}
