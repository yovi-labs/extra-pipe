import { Pipe, PipeTransform } from '@angular/core';
import { chunk } from '../transformations/collections-toolbox';
export { chunk } from '../transformations/collections-toolbox';
/** Group cards into fixed-size display rows. */
@Pipe({ name: 'chunk', standalone: true, pure: true })
export class ChunkPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, size = 2): T[][] {
    return chunk(value, size);
  }
}
