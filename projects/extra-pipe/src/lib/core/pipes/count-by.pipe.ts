import { Pipe, PipeTransform } from '@angular/core';
import { countBy } from '../transformations/collections-toolbox';
import { CountGroup } from '../transformations/toolbox.types';
export { countBy } from '../transformations/collections-toolbox';
/** Summarize category frequencies without retaining grouped arrays. */
@Pipe({ name: 'countBy', standalone: true, pure: true })
export class CountByPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    value: readonly T[] | null | undefined,
    key: K
  ): CountGroup<T[K] | undefined>[] {
    return countBy(value, key);
  }
}
