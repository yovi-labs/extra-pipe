import { Pipe, PipeTransform } from '@angular/core';
import { pruneEmpty } from '../transformations/objects-toolbox';
export { pruneEmpty } from '../transformations/objects-toolbox';
/** Remove recursively empty data while preserving zero and false. */
@Pipe({ name: 'pruneEmpty', standalone: true, pure: true })
export class PruneEmptyPipe implements PipeTransform {
  transform(
    value: Readonly<Record<string, unknown>> | null | undefined
  ): Record<string, unknown> | null {
    return pruneEmpty(value);
  }
}
