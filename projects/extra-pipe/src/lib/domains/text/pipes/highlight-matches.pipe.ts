import { Pipe, PipeTransform } from '@angular/core';
import { highlightMatches } from '../text.functions';
import { MatchSegment } from '../text.types';
export { highlightMatches } from '../text.functions';
/** Structured literal search highlights, never HTML. */
@Pipe({ name: 'highlightMatches', standalone: true, pure: true })
export class HighlightMatchesPipe implements PipeTransform {
  transform(value: string | null | undefined, query: string): MatchSegment[] {
    return highlightMatches(value, query);
  }
}
