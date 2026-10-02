import { Pipe, PipeTransform } from '@angular/core';
import { slidingWindow } from '../collections.functions';
export { slidingWindow } from '../collections.functions';
/** Create overlapping chart/history windows. */
@Pipe({ name: 'slidingWindow', standalone: true, pure: true })
export class SlidingWindowPipe implements PipeTransform {
  transform<T>(
    value: readonly T[] | null | undefined,
    size = 2,
    step = 1
  ): T[][] {
    return slidingWindow(value, size, step);
  }
}
