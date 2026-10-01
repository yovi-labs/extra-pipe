import { Pipe, PipeTransform } from '@angular/core';
import { splitLines } from '../transformations/text-toolbox';
export { splitLines } from '../transformations/text-toolbox';
/** Render pasted multiline content as readonly input rows. */
@Pipe({ name: 'splitLines', standalone: true, pure: true })
export class SplitLinesPipe implements PipeTransform {
  transform(value: string | null | undefined): string[] {
    return splitLines(value);
  }
}
