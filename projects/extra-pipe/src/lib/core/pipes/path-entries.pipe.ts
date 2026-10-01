import { Pipe, PipeTransform } from '@angular/core';
import { pathEntries } from '../transformations/objects-toolbox';
import { PathEntry } from '../transformations/toolbox.types';
export { pathEntries } from '../transformations/objects-toolbox';
/** Flatten own leaf values to key-array paths, without dotted-key ambiguity. */
@Pipe({ name: 'pathEntries', standalone: true, pure: true })
export class PathEntriesPipe implements PipeTransform {
  transform(
    value: Readonly<Record<string, unknown>> | null | undefined
  ): PathEntry[] {
    return pathEntries(value);
  }
}
