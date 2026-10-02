import { Pipe, PipeTransform } from '@angular/core';
import { maxBy } from '../metrics.functions';
export { maxBy } from '../metrics.functions';
/** Find the original record with the largest numeric field. */
@Pipe({ name: 'maxBy', standalone: true, pure: true })
export class MaxByPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, key: keyof T): T | null {
    return maxBy(value, key);
  }
}
