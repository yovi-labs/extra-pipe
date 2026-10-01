import { Pipe, PipeTransform } from '@angular/core';
import { compact } from '../transformations/collections-toolbox';
export { compact } from '../transformations/collections-toolbox';
/** Drop nullish values while retaining 0 and false. */
@Pipe({ name: 'compact', standalone: true, pure: true })
export class CompactPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined): NonNullable<T>[] {
    return compact(value);
  }
}
