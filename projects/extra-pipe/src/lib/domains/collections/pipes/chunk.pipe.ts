import { Pipe, PipeTransform } from '@angular/core';
import { chunk } from '../collections.functions';
export { chunk } from '../collections.functions';
/** Group cards into fixed-size display rows. */
@Pipe({ name: 'chunk', standalone: true, pure: true })
export class ChunkPipe implements PipeTransform {
  transform<T>(value: readonly T[] | null | undefined, size = 2): T[][] {
    return chunk(value, size);
  }
}
