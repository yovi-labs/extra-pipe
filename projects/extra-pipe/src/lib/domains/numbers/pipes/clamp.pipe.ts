import { Pipe, PipeTransform } from '@angular/core';
import { clamp } from '../numbers.functions';
export { clamp } from '../numbers.functions';
/** Constrain numeric display values to explicit bounds. */
@Pipe({ name: 'clamp', standalone: true, pure: true })
export class ClampPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    minimum: number,
    maximum: number
  ): number | null {
    return clamp(value, minimum, maximum);
  }
}
