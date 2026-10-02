import { Pipe, PipeTransform } from '@angular/core';
import { escapeRegExp } from '../text.functions';
export { escapeRegExp } from '../text.functions';
/** Turn a search term into literal regex pattern text. */
@Pipe({ name: 'escapeRegExp', standalone: true, pure: true })
export class EscapeRegExpPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return escapeRegExp(value);
  }
}
