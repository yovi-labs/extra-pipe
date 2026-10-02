import { Pipe, PipeTransform } from '@angular/core';
import { percentageChange } from '../metrics.functions';
export { percentageChange } from '../metrics.functions';
/** Signed percentage change from a nonzero baseline. */
@Pipe({ name: 'percentageChange', standalone: true, pure: true })
export class PercentageChangePipe implements PipeTransform {
  transform(value: number | null | undefined, baseline: number): number | null {
    return percentageChange(value, baseline);
  }
}
