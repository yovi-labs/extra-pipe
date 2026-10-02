import { Pipe, PipeTransform } from '@angular/core';
import { weightedAverageBy } from '../metrics.functions';
export { weightedAverageBy } from '../metrics.functions';
/** Weighted average with explicit nonnegative weights. */
@Pipe({ name: 'weightedAverageBy', standalone: true, pure: true })
export class WeightedAverageByPipe implements PipeTransform {
  transform<T>(
    value: readonly T[] | null | undefined,
    valueKey: keyof T,
    weightKey: keyof T
  ): number | null {
    return weightedAverageBy(value, valueKey, weightKey);
  }
}
