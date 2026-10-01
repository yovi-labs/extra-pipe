import { Pipe, PipeTransform } from '@angular/core';
import { summarizeBy } from '../transformations/metrics-toolbox';
import { NumericSummary } from '../transformations/toolbox.types';
export { summarizeBy } from '../transformations/metrics-toolbox';
/** One-pass count/sum/mean/min/max summary. */
@Pipe({ name: 'summarizeBy', standalone: true, pure: true })
export class SummarizeByPipe implements PipeTransform {
  transform<T>(
    value: readonly T[] | null | undefined,
    key: keyof T
  ): NumericSummary | null {
    return summarizeBy(value, key);
  }
}
