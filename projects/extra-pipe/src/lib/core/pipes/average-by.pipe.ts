import { Pipe, PipeTransform } from '@angular/core';
import { averageBy } from '../transformations/metrics-toolbox';
export { averageBy } from '../transformations/metrics-toolbox';
/** Mean numeric fields for dashboard summaries. */
@Pipe({ name: 'averageBy', standalone: true, pure: true })
export class AverageByPipe implements PipeTransform {
  transform<T>(
    value: readonly T[] | null | undefined,
    key: keyof T
  ): number | null {
    return averageBy(value, key);
  }
}
