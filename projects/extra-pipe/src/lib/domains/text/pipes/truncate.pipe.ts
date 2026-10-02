import { Pipe, PipeTransform } from '@angular/core';

import {
  getGraphemes,
  toNonNegativeInteger,
} from '../../../internal/intl';

/** Truncates text without splitting a user-perceived character. */
@Pipe({
  standalone: true,
  name: 'truncate',
  pure: true,
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: null | string | undefined,
    maximumLength: number,
    suffix: string = '…'
  ): string {
    if (typeof value !== 'string') return '';

    const length = toNonNegativeInteger(maximumLength, 0);
    const graphemes = getGraphemes(value);

    if (graphemes.length <= length) return value;

    const safeSuffix = typeof suffix === 'string' ? suffix : '…';
    const suffixGraphemes = getGraphemes(safeSuffix);
    if (length <= suffixGraphemes.length) {
      return suffixGraphemes.slice(0, length).join('');
    }

    return `${graphemes.slice(0, length - suffixGraphemes.length).join('')}${safeSuffix}`;
  }
}
