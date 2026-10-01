import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { businessDaysDifference } from '../transformations/dates-toolbox';
export { businessDaysDifference } from '../transformations/dates-toolbox';
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
