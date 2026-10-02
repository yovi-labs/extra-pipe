import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { businessDaysDifference } from '../dates.functions';
export { businessDaysDifference } from '../dates.functions';
/** Signed UTC Mon–Fri day counts with caller-supplied holidays. */
@Pipe({ name: 'businessDaysDifference', standalone: true, pure: true })
export class BusinessDaysDifferencePipe implements PipeTransform {
  transform(
    value: DateInput | null | undefined,
    end: DateInput,
    holidays: readonly DateInput[] = []
  ): number | null {
    return businessDaysDifference(value, end, holidays);
  }
}
