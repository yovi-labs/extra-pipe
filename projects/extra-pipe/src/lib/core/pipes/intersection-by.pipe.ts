import { Pipe, PipeTransform } from '@angular/core';
import { intersectionBy } from '../transformations/collections-toolbox';
export { intersectionBy } from '../transformations/collections-toolbox';
/** Show records shared between selections by identity key. */
@Pipe({ name: 'intersectionBy', standalone: true, pure: true })
export class IntersectionByPipe implements PipeTransform {
  transform<T, U, K extends keyof T & keyof U>(
    value: readonly T[] | null | undefined,
    other: readonly U[],
    key: K
  ): T[] {
    return intersectionBy(value, other, key);
  }
}
