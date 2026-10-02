import { Pipe, PipeTransform } from '@angular/core';
import { minBy } from '../metrics.functions';
export { minBy } from '../metrics.functions';
/** Find the original record with the smallest numeric field. */
@Pipe({ name: 'minBy', standalone: true, pure: true })
export class MinByPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, key: keyof T): T | null {
    return minBy(value, key);
  }
}
