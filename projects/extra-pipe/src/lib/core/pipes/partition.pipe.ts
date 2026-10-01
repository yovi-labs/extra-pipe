import { Pipe, PipeTransform } from '@angular/core';
import { partition } from '../transformations/collections-toolbox';
import { PartitionResult } from '../transformations/toolbox.types';
export { partition } from '../transformations/collections-toolbox';
/** Split records into matching and remaining buckets. */
@Pipe({ name: 'partition', standalone: true, pure: true })
export class PartitionPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    value: readonly T[] | null | undefined,
    key: K,
    expected: T[K]
  ): PartitionResult<T> {
    return partition(value, key, expected);
  }
}
