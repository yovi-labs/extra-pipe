import { Pipe, PipeTransform } from '@angular/core';
import { normalizeWhitespace } from '../text.functions';
export { normalizeWhitespace } from '../text.functions';
/** Clean pasted labels without stripping markup. */
@Pipe({ name: 'normalizeWhitespace', standalone: true, pure: true })
export class NormalizeWhitespacePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return normalizeWhitespace(value);
  }
}
