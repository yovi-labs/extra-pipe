import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../shared/helper/intl.helper';
import { quarter } from '../transformations/dates-toolbox';
export { quarter } from '../transformations/dates-toolbox';
/** UTC quarter number for fiscal/calendar labels. */
@Pipe({ name: 'quarter', standalone: true, pure: true })
export class QuarterPipe implements PipeTransform {
  transform(value: DateInput | null | undefined): number | null {
    return quarter(value);
  }
}
