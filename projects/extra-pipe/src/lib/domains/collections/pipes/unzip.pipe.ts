import { Pipe, PipeTransform } from '@angular/core';
import { unzip } from '../collections.functions';
export { unzip } from '../collections.functions';
/** Split paired coordinates into parallel series. */
@Pipe({ name: 'unzip', standalone: true, pure: true })
export class UnzipPipe implements PipeTransform {
  transform<T, U>(
    value: readonly (readonly [T, U])[] | null | undefined
  ): [T[], U[]] {
    return unzip(value);
  }
}
