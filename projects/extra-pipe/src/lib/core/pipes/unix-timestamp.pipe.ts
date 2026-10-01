import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { unixTimestamp } from '../transformations/dates-toolbox';
export { unixTimestamp } from '../transformations/dates-toolbox';
/** Floor epoch seconds, including pre-1970 values. */
@Pipe({ name: 'unixTimestamp', standalone: true, pure: true })
export class UnixTimestampPipe implements PipeTransform {
  transform(value: DateInput | null | undefined): number | null {
    return unixTimestamp(value);
  }
}
