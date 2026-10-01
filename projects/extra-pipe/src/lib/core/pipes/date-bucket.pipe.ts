import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { dateBucket } from '../transformations/dates-toolbox';
import { DateBucketUnit } from '../transformations/toolbox.types';
export { dateBucket } from '../transformations/dates-toolbox';
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
