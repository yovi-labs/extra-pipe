import { Pipe, PipeTransform } from '@angular/core';

import { DateInput, toValidDate } from '../../../internal/intl';

@Pipe({
  standalone: true,
  name: 'localizedDate',
})
export class LocalizedDatePipe implements PipeTransform {
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

