import { Pipe, PipeTransform } from '@angular/core';
import { filterBy } from '../transformations/collections-toolbox';
export { filterBy } from '../transformations/collections-toolbox';
/** Display records with an own property equal to a value. */
@Pipe({ name: 'filterBy', standalone: true, pure: true })
export class FilterByPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    value: readonly T[] | null | undefined,
    key: K,
    expected: T[K]
  ): T[] {
    return filterBy(value, key, expected);
  }
}
