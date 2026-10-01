import { Pipe, PipeTransform } from '@angular/core';
import { pluck } from '../transformations/collections-toolbox';
export { pluck } from '../transformations/collections-toolbox';
/** Project own direct properties from record lists. */
@Pipe({ name: 'pluck', standalone: true, pure: true })
export class PluckPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    value: readonly T[] | null | undefined,
    key: K
  ): (T[K] | undefined)[] {
    return pluck(value, key);
  }
}
