import { Pipe, PipeTransform } from '@angular/core';
import { flatten } from '../transformations/collections-toolbox';
export { flatten } from '../transformations/collections-toolbox';
/** Present nested lists with explicit bounded depth. */
@Pipe({ name: 'flatten', standalone: true, pure: true })
export class FlattenPipe implements PipeTransform {
  transform(
    value: readonly unknown[] | null | undefined,
    depth = 1
  ): unknown[] {
    return flatten(value, depth);
  }
}
