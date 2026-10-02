import { Pipe, PipeTransform } from '@angular/core';
import { pluck } from '../collections.functions';
export { pluck } from '../collections.functions';
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
