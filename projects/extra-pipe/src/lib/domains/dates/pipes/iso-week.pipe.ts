import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { isoWeek } from '../dates.functions';
import { IsoWeekResult } from '../dates.types';
export { isoWeek } from '../dates.functions';
/** UTC ISO week-year and week number for reporting. */
@Pipe({ name: 'isoWeek', standalone: true, pure: true })
export class IsoWeekPipe implements PipeTransform {
  transform(value: DateInput | null | undefined): IsoWeekResult | null {
    return isoWeek(value);
  }
}
