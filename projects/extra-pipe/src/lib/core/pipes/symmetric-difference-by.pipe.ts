import { Pipe, PipeTransform } from '@angular/core';
import { symmetricDifferenceBy } from '../transformations/collections-toolbox';
export { symmetricDifferenceBy } from '../transformations/collections-toolbox';
/** Show records exclusive to either selection. */
@Pipe({ name: 'symmetricDifferenceBy', standalone: true, pure: true })
export class SymmetricDifferenceByPipe implements PipeTransform {
  transform<T, U, K extends keyof T & keyof U>(
    value: readonly T[] | null | undefined,
    other: readonly U[],
    key: K
  ): (T | U)[] {
    return symmetricDifferenceBy(value, other, key);
  }
}
