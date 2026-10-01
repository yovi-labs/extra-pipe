import { Pipe, PipeTransform } from '@angular/core';
import { getPath } from '../transformations/objects-toolbox';
export { getPath } from '../transformations/objects-toolbox';
/** Read an own-property path supplied as a key array. */
@Pipe({ name: 'getPath', standalone: true, pure: true })
export class GetPathPipe implements PipeTransform {
  transform(
    value: unknown,
    path: readonly PropertyKey[],
    fallback: unknown = null
  ): unknown {
    return getPath(value, path, fallback);
  }
}
