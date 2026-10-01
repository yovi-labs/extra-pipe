import { Pipe, PipeTransform } from '@angular/core';
import { wrapWords } from '../transformations/text-toolbox';
export { wrapWords } from '../transformations/text-toolbox';
/** Plain-text messages wrap to grapheme-bounded lines. */
@Pipe({ name: 'wrapWords', standalone: true, pure: true })
export class WrapWordsPipe implements PipeTransform {
  transform(value: string | null | undefined, maximumColumns = 80): string {
    return wrapWords(value, maximumColumns);
  }
}
