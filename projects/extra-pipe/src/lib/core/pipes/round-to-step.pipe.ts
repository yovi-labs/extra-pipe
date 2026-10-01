import { Pipe, PipeTransform } from '@angular/core';
import { roundToStep } from '../transformations/numbers-toolbox';
export { roundToStep } from '../transformations/numbers-toolbox';
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
