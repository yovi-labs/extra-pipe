import { Pipe, PipeTransform } from '@angular/core';
import { summarizeBy } from '../metrics.functions';
import { NumericSummary } from '../metrics.types';
export { summarizeBy } from '../metrics.functions';
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
