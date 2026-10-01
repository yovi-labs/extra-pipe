import { Pipe, PipeTransform } from '@angular/core';
import { differenceBy } from '../transformations/collections-toolbox';
export { differenceBy } from '../transformations/collections-toolbox';
/** Show unselected records by identity key. */
@Pipe({ name: 'differenceBy', standalone: true, pure: true })
export class DifferenceByPipe implements PipeTransform {
  transform<T, U, K extends keyof T & keyof U>(
    value: readonly T[] | null | undefined,
    other: readonly U[],
    key: K
  ): T[] {
    return differenceBy(value, other, key);
  }
}
