import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { overlapDuration } from '../dates.functions';
export { overlapDuration } from '../dates.functions';
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
