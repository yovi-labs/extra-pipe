import { Pipe, PipeTransform } from '@angular/core';
import { excludeByValues } from '../selection';

@Pipe({ name: 'removeByKey', standalone: true, pure: true })
export class RemoveByKeyPipe implements PipeTransform {
  transform<T>(items: readonly T[], key: keyof T, excluded: readonly unknown[]): T[] {
    // Retain the documented legacy non-array passthrough for JavaScript callers.
    if (!Array.isArray(items)) return items as T[];
    return excludeByValues(items, key, excluded);
  }
}
