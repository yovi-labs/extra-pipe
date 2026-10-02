import { Pipe, PipeTransform } from '@angular/core';
import { ratio } from '../numbers.functions';
export { ratio } from '../numbers.functions';
/** Compute a finite quotient with an explicit nonzero divisor. */
@Pipe({ name: 'ratio', standalone: true, pure: true })
export class RatioPipe implements PipeTransform {
  transform(value: number | null | undefined, divisor: number): number | null {
    return ratio(value, divisor);
  }
}
