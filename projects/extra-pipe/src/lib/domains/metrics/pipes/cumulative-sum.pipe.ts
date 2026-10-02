import { Pipe, PipeTransform } from '@angular/core';
import { cumulativeSum } from '../metrics.functions';
export { cumulativeSum } from '../metrics.functions';
/** Running totals for chart series. */
@Pipe({ name: 'cumulativeSum', standalone: true, pure: true })
export class CumulativeSumPipe implements PipeTransform {
  transform(value: readonly number[] | null | undefined): number[] {
    return cumulativeSum(value);
  }
}
