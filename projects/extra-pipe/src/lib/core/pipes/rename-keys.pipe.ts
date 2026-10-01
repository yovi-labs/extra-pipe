import { Pipe, PipeTransform } from '@angular/core';
import { renameKeys } from '../transformations/objects-toolbox';
export { renameKeys } from '../transformations/objects-toolbox';
/** Remap schema field names without silently losing collisions. */
@Pipe({ name: 'renameKeys', standalone: true, pure: true })
export class RenameKeysPipe implements PipeTransform {
  transform(
    value: Readonly<Record<string, unknown>> | null | undefined,
    mapping: Readonly<Record<string, string>>
  ): Record<string, unknown> | null {
    return renameKeys(value, mapping);
  }
}
