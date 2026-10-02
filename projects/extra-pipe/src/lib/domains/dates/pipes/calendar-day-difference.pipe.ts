import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { calendarDayDifference } from '../dates.functions';
export { calendarDayDifference } from '../dates.functions';
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
