import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { isoWeek } from '../transformations/dates-toolbox';
import { IsoWeekResult } from '../transformations/toolbox.types';
export { isoWeek } from '../transformations/dates-toolbox';
/** UTC ISO week-year and week number for reporting. */
@Pipe({ name: 'isoWeek', standalone: true, pure: true })
export class IsoWeekPipe implements PipeTransform {
  transform(value: DateInput | null | undefined): IsoWeekResult | null {
    return isoWeek(value);
  }
}
