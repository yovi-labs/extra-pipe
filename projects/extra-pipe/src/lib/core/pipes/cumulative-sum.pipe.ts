import { Pipe, PipeTransform } from '@angular/core';
import { cumulativeSum } from '../transformations/metrics-toolbox';
export { cumulativeSum } from '../transformations/metrics-toolbox';
/** Running totals for chart series. */
@Pipe({ name: 'cumulativeSum', standalone: true, pure: true })
export class CumulativeSumPipe implements PipeTransform {
  transform(value: readonly number[] | null | undefined): number[] {
    return cumulativeSum(value);
  }
}
