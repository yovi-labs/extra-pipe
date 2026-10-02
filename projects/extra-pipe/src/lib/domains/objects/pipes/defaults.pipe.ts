import { Pipe, PipeTransform } from '@angular/core';
import { defaults } from '../objects.functions';
import { DefaultsResult } from '../objects.types';
export { defaults } from '../objects.functions';
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
