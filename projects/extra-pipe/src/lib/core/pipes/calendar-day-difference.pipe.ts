import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { calendarDayDifference } from '../transformations/dates-toolbox';
export { calendarDayDifference } from '../transformations/dates-toolbox';
/** Signed difference of UTC calendar dates, not 24-hour durations. */
@Pipe({ name: 'calendarDayDifference', standalone: true, pure: true })
export class CalendarDayDifferencePipe implements PipeTransform {
  transform(
    value: DateInput | null | undefined,
    end: DateInput
  ): number | null {
    return calendarDayDifference(value, end);
  }
}
