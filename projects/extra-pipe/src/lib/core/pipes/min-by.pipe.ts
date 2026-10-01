import { Pipe, PipeTransform } from '@angular/core';
import { minBy } from '../transformations/metrics-toolbox';
export { minBy } from '../transformations/metrics-toolbox';
/** Find the original record with the smallest numeric field. */
@Pipe({ name: 'minBy', standalone: true, pure: true })
export class MinByPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, key: keyof T): T | null {
    return minBy(value, key);
  }
}
