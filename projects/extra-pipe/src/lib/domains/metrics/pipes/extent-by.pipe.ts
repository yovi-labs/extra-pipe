import { Pipe, PipeTransform } from '@angular/core';
import { extentBy } from '../metrics.functions';
export { extentBy } from '../metrics.functions';
/** Numeric lower/upper bounds for chart domains. */
@Pipe({ name: 'extentBy', standalone: true, pure: true })
export class ExtentByPipe implements PipeTransform {
  transform<T>(
    value: readonly T[] | null | undefined,
    key: keyof T
  ): [number, number] | null {
    return extentBy(value, key);
  }
}
