import { Pipe, PipeTransform } from '@angular/core';
import { splitLines } from '../text.functions';
export { splitLines } from '../text.functions';
/** Render pasted multiline content as readonly input rows. */
@Pipe({ name: 'splitLines', standalone: true, pure: true })
export class SplitLinesPipe implements PipeTransform {
  transform(value: string | null | undefined): string[] {
    return splitLines(value);
  }
}
