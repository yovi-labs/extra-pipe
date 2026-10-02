import { Pipe, PipeTransform } from '@angular/core';
import { retainLastByKey } from '../selection';

@Pipe({ name: 'removeDuplicatesByKey', standalone: true, pure: true })
export class RemoveDuplicatesByKeyPipe implements PipeTransform {
  transform<T>(items: readonly T[], key: keyof T): T[] {
    // Retain the documented legacy non-array passthrough for JavaScript callers.
    if (!Array.isArray(items)) return items as T[];
    return retainLastByKey(items, key);
  }
}
