import { Pipe, PipeTransform } from '@angular/core';
import { stripDiacritics } from '../transformations/text-toolbox';
export { stripDiacritics } from '../transformations/text-toolbox';
/** Latin accent folding for search labels; preserve other scripts. */
@Pipe({ name: 'stripDiacritics', standalone: true, pure: true })
export class StripDiacriticsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return stripDiacritics(value);
  }
}
