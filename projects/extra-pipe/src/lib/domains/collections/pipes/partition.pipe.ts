import { Pipe, PipeTransform } from '@angular/core';
import { partition } from '../collections.functions';
import { PartitionResult } from '../collections.types';
export { partition } from '../collections.functions';
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
