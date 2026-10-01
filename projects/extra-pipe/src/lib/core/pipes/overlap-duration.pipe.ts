import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { overlapDuration } from '../transformations/dates-toolbox';
export { overlapDuration } from '../transformations/dates-toolbox';
/** Milliseconds shared by two half-open timestamp intervals. */
@Pipe({ name: 'overlapDuration', standalone: true, pure: true })
export class OverlapDurationPipe implements PipeTransform {
  transform(
    value: DateInput | null | undefined,
    end: DateInput,
    otherStart: DateInput,
    otherEnd: DateInput
  ): number | null {
    return overlapDuration(value, end, otherStart, otherEnd);
  }
}
