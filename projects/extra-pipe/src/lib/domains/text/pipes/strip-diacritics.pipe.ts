import { Pipe, PipeTransform } from '@angular/core';
import { stripDiacritics } from '../text.functions';
export { stripDiacritics } from '../text.functions';
/** Latin accent folding for search labels; preserve other scripts. */
@Pipe({ name: 'stripDiacritics', standalone: true, pure: true })
export class StripDiacriticsPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return stripDiacritics(value);
  }
}
