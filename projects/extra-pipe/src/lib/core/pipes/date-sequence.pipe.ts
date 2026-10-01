import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { dateSequence } from '../transformations/dates-toolbox';
export { dateSequence } from '../transformations/dates-toolbox';
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
