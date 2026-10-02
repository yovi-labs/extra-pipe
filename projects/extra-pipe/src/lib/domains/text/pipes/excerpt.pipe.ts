import { Pipe, PipeTransform } from '@angular/core';
import { excerpt } from '../text.functions';
export { excerpt } from '../text.functions';
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
