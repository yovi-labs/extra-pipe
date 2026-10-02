import { Pipe, PipeTransform } from '@angular/core';
import { countBy } from '../collections.functions';
import { CountGroup } from '../collections.types';
export { countBy } from '../collections.functions';
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
