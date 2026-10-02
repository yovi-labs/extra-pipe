import { Pipe, PipeTransform } from '@angular/core';
import { averageBy } from '../metrics.functions';
export { averageBy } from '../metrics.functions';
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
