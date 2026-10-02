import { Pipe, PipeTransform } from '@angular/core';
import { histogram } from '../metrics.functions';
import { HistogramBin } from '../metrics.types';
export { histogram } from '../metrics.functions';
/** Bounded equal-width bins for numeric distributions. */
@Pipe({ name: 'histogram', standalone: true, pure: true })
export class HistogramPipe implements PipeTransform {
  transform(
    value: readonly number[] | null | undefined,
    bins = 5
  ): HistogramBin[] {
    return histogram(value, bins);
  }
}
