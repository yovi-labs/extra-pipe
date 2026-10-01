import { Pipe, PipeTransform } from '@angular/core';
import { excerpt } from '../transformations/text-toolbox';
export { excerpt } from '../transformations/text-toolbox';
/** Show a grapheme-safe context window around a literal match. */
@Pipe({ name: 'excerpt', standalone: true, pure: true })
export class ExcerptPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    query: string,
    maximumLength = 80,
    suffix = '…'
  ): string {
    return excerpt(value, query, maximumLength, suffix);
  }
}
