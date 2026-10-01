import { Pipe, PipeTransform } from '@angular/core';
import { defaults } from '../transformations/objects-toolbox';
import { DefaultsResult } from '../transformations/toolbox.types';
export { defaults } from '../transformations/objects-toolbox';
/** Fill only nullish own fields from shallow defaults. */
@Pipe({ name: 'defaults', standalone: true, pure: true })
export class DefaultsPipe implements PipeTransform {
  transform<T extends object, U extends object>(
    value: T | null | undefined,
    fallback: U
  ): DefaultsResult<T, U> | null {
    return defaults(value, fallback);
  }
}
