import { Pipe, PipeTransform } from '@angular/core';
import { highlightMatches } from '../transformations/text-toolbox';
import { MatchSegment } from '../transformations/toolbox.types';
export { highlightMatches } from '../transformations/text-toolbox';
/** Structured literal search highlights, never HTML. */
@Pipe({ name: 'highlightMatches', standalone: true, pure: true })
export class HighlightMatchesPipe implements PipeTransform {
  transform(value: string | null | undefined, query: string): MatchSegment[] {
    return highlightMatches(value, query);
  }
}
