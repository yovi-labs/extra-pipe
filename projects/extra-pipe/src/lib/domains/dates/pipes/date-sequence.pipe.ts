import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { dateSequence } from '../dates.functions';
export { dateSequence } from '../dates.functions';
/** Bounded inclusive UTC date sequences for calendars. */
@Pipe({ name: 'dateSequence', standalone: true, pure: true })
export class DateSequencePipe implements PipeTransform {
  transform(
    value: DateInput | null | undefined,
    end: DateInput,
    stepDays = 1
  ): Date[] {
    return dateSequence(value, end, stepDays);
  }
}
