import { Pipe, PipeTransform } from '@angular/core';
import { omit } from '../objects.functions';
export { omit } from '../objects.functions';
/** Create a display object excluding named own fields. */
@Pipe({ name: 'omit', standalone: true, pure: true })
export class OmitPipe implements PipeTransform {
  transform<T extends object>(
    value: T | null | undefined,
    keys: readonly (keyof T & string)[]
  ): Partial<T> | null {
    return omit(value, keys);
  }
}
