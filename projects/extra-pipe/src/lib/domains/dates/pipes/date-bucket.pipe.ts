import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { dateBucket } from '../dates.functions';
import { DateBucketUnit } from '../dates.types';
export { dateBucket } from '../dates.functions';
/** UTC start-of-day/week/month/quarter/year for chart grouping. */
@Pipe({ name: 'dateBucket', standalone: true, pure: true })
export class DateBucketPipe implements PipeTransform {
  transform(
    value: DateInput | null | undefined,
    unit: DateBucketUnit = 'day'
  ): string {
    return dateBucket(value, unit);
  }
}
