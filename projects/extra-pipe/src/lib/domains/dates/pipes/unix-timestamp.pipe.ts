import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { unixTimestamp } from '../dates.functions';
export { unixTimestamp } from '../dates.functions';
/** Floor epoch seconds, including pre-1970 values. */
@Pipe({ name: 'unixTimestamp', standalone: true, pure: true })
export class UnixTimestampPipe implements PipeTransform {
  transform(value: DateInput | null | undefined): number | null {
    return unixTimestamp(value);
  }
}
