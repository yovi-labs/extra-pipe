import { Pipe, PipeTransform } from '@angular/core';
import { numberBase } from '../transformations/numbers-toolbox';
export { numberBase } from '../transformations/numbers-toolbox';
/** Display safe integers or bigint in bases 2–36. */
@Pipe({ name: 'numberBase', standalone: true, pure: true })
export class NumberBasePipe implements PipeTransform {
  transform(value: number | bigint | null | undefined, radix = 16): string {
    return numberBase(value, radix);
  }
}
