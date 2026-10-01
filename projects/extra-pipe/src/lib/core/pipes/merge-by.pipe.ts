import { Pipe, PipeTransform } from '@angular/core';
import { mergeBy } from '../transformations/collections-toolbox';
export { mergeBy } from '../transformations/collections-toolbox';
/** Reconcile partial records with shallow last-field precedence. */
@Pipe({ name: 'mergeBy', standalone: true, pure: true })
export class MergeByPipe implements PipeTransform {
  transform<T, U, K extends keyof T & keyof U>(
    value: readonly T[] | null | undefined,
    other: readonly U[],
    key: K
  ): (T | U)[] {
    return mergeBy(value, other, key);
  }
}
