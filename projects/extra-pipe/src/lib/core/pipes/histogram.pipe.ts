import { Pipe, PipeTransform } from '@angular/core';
import { histogram } from '../transformations/metrics-toolbox';
import { HistogramBin } from '../transformations/toolbox.types';
export { histogram } from '../transformations/metrics-toolbox';
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
