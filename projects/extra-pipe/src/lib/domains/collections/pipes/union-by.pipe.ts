import { Pipe, PipeTransform } from '@angular/core';
import { unionBy } from '../collections.functions';
export { unionBy } from '../collections.functions';
/** Combine record sets with first-record precedence. */
@Pipe({ name: 'unionBy', standalone: true, pure: true })
export class UnionByPipe implements PipeTransform {
  transform<T, U, K extends keyof T & keyof U>(
    value: readonly T[] | null | undefined,
    other: readonly U[],
    key: K
  ): (T | U)[] {
    return unionBy(value, other, key);
  }
}
