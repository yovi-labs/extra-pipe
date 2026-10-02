import { Pipe, PipeTransform } from '@angular/core';

import {
  getGraphemes,
  toNonNegativeInteger,
} from '../../../internal/intl';

/** Returns uppercase initials from a whitespace-separated name. */
@Pipe({
  standalone: true,
  name: 'initials',
  pure: true,
})
export class InitialsPipe implements PipeTransform {
  transform(
    value: null | string | undefined,
    maximumWords: number = 2,
    fallback: string = ''
  ): string {
    const safeFallback = typeof fallback === 'string' ? fallback : '';
    if (typeof value !== 'string' || value.trim() === '') return safeFallback;

    const wordLimit = toNonNegativeInteger(maximumWords, 2);
    if (wordLimit === 0) return safeFallback;

    return value
      .trim()
      .split(/\s+/)
      .slice(0, wordLimit)
      .map(word => getGraphemes(word)[0]?.toLocaleUpperCase() ?? '')
      .join('');
  }
}
