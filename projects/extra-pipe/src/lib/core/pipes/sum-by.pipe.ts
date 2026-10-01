import { Pipe, PipeTransform } from '@angular/core';
import { sumBy } from '../transformations/metrics-toolbox';
export { sumBy } from '../transformations/metrics-toolbox';
/** Sum finite numeric fields for dashboard totals. */
@Pipe({ name: 'sumBy', standalone: true, pure: true })
export class SumByPipe implements PipeTransform {
  transform<T>(
    value: readonly T[] | null | undefined,
    key: keyof T
  ): number | null {
    return sumBy(value, key);
  }
}
