import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { isWithinInterval } from '../dates.functions';
export { isWithinInterval } from '../dates.functions';
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
