import { Pipe, PipeTransform } from '@angular/core';
import { unzip } from '../transformations/collections-toolbox';
export { unzip } from '../transformations/collections-toolbox';
/** Split paired coordinates into parallel series. */
@Pipe({ name: 'unzip', standalone: true, pure: true })
export class UnzipPipe implements PipeTransform {
  transform<T, U>(
    value: readonly (readonly [T, U])[] | null | undefined
  ): [T[], U[]] {
    return unzip(value);
  }
}
