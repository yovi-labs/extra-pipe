import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { isWithinInterval } from '../transformations/dates-toolbox';
export { isWithinInterval } from '../transformations/dates-toolbox';
/** Inclusive timestamp interval membership. */
@Pipe({ name: 'isWithinInterval', standalone: true, pure: true })
export class IsWithinIntervalPipe implements PipeTransform {
  transform(
    value: DateInput | null | undefined,
    start: DateInput,
    end: DateInput
  ): boolean {
    return isWithinInterval(value, start, end);
  }
}
