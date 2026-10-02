import { Pipe, PipeTransform } from '@angular/core';
import { percentileBy } from '../metrics.functions';
export { percentileBy } from '../metrics.functions';
/** Interpolated percentile for numeric dashboard samples. */
@Pipe({ name: 'percentileBy', standalone: true, pure: true })
export class PercentileByPipe implements PipeTransform {
  transform<T>(
    value: readonly T[] | null | undefined,
    key: keyof T,
    percentile = 50
  ): number | null {
    return percentileBy(value, key, percentile);
  }
}
