import { Pipe, PipeTransform } from '@angular/core';
import { roundTo } from '../transformations/numbers-toolbox';
export { roundTo } from '../transformations/numbers-toolbox';
/** Numeric decimal-place rounding with signed precision. */
@Pipe({ name: 'roundTo', standalone: true, pure: true })
export class RoundToPipe implements PipeTransform {
  transform(value: number | null | undefined, precision = 0): number | null {
    return roundTo(value, precision);
  }
}
