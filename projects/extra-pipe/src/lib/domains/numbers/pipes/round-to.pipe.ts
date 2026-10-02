import { Pipe, PipeTransform } from '@angular/core';
import { roundTo } from '../numbers.functions';
export { roundTo } from '../numbers.functions';
/** Numeric decimal-place rounding with signed precision. */
@Pipe({ name: 'roundTo', standalone: true, pure: true })
export class RoundToPipe implements PipeTransform {
  transform(value: number | null | undefined, precision = 0): number | null {
    return roundTo(value, precision);
  }
}
