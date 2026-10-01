import { Pipe, PipeTransform } from '@angular/core';
import { pick } from '../transformations/objects-toolbox';
export { pick } from '../transformations/objects-toolbox';
/** Display explicitly allowed own fields. */
@Pipe({ name: 'pick', standalone: true, pure: true })
export class PickPipe implements PipeTransform {
  transform<T extends object>(
    value: T | null | undefined,
    keys: readonly (keyof T & string)[]
  ): Partial<T> | null {
    return pick(value, keys);
  }
}
