import { Pipe, PipeTransform } from '@angular/core';
import { humanizeIdentifier } from '../text.functions';
export { humanizeIdentifier } from '../text.functions';
/** Readable acronym-aware API/schema labels. */
@Pipe({ name: 'humanizeIdentifier', standalone: true, pure: true })
export class HumanizeIdentifierPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    return humanizeIdentifier(value);
  }
}
