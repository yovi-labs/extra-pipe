import { Pipe, PipeTransform } from '@angular/core';
import { DateInput } from '../../../internal/intl';
import { quarter } from '../dates.functions';
export { quarter } from '../dates.functions';
/** UTC quarter number for fiscal/calendar labels. */
@Pipe({ name: 'quarter', standalone: true, pure: true })
export class QuarterPipe implements PipeTransform {
  transform(value: DateInput | null | undefined): number | null {
    return quarter(value);
  }
}
