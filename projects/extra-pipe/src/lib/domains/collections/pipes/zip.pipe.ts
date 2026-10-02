import { Pipe, PipeTransform } from '@angular/core';
import { zip } from '../collections.functions';
export { zip } from '../collections.functions';
/** Pair parallel data series to the shorter length. */
@Pipe({ name: 'zip', standalone: true, pure: true })
export class ZipPipe implements PipeTransform {
  transform<T, U>(
    value: readonly T[] | null | undefined,
    other: readonly U[]
  ): [T, U][] {
    return zip(value, other);
  }
}
