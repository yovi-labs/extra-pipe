import { Pipe, PipeTransform } from '@angular/core';
import { flatten } from '../collections.functions';
export { flatten } from '../collections.functions';
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
