import { Pipe, PipeTransform } from '@angular/core';
import { roundToStep } from '../numbers.functions';
export { roundToStep } from '../numbers.functions';
/** Round to increments and optional origin. */
@Pipe({ name: 'roundToStep', standalone: true, pure: true })
export class RoundToStepPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    step: number,
    origin = 0
  ): number | null {
    return roundToStep(value, step, origin);
  }
}
