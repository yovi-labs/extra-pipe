import { Pipe, PipeTransform } from '@angular/core';
import { indexBy } from '../collections.functions';
export { indexBy } from '../collections.functions';
/** Build a prototype-safe lookup Map from records. */
@Pipe({ name: 'indexBy', standalone: true, pure: true })
export class IndexByPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    value: readonly T[] | null | undefined,
    key: K
  ): Map<T[K] | undefined, T> {
    return indexBy(value, key);
  }
}
