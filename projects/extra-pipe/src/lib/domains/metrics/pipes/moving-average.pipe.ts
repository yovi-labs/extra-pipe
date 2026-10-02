import { Pipe, PipeTransform } from '@angular/core';
import { movingAverage } from '../metrics.functions';
export { movingAverage } from '../metrics.functions';
/** Full-window averages for chart smoothing. */
@Pipe({ name: 'movingAverage', standalone: true, pure: true })
export class MovingAveragePipe implements PipeTransform {
  transform(
    value: readonly number[] | null | undefined,
    windowSize = 3
  ): number[] {
    return movingAverage(value, windowSize);
  }
}
