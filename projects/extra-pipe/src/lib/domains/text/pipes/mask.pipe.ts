import { Pipe, PipeTransform } from '@angular/core';

import {
  getGraphemes,
  toNonNegativeInteger,
} from '../../../internal/intl';

/** Masks the middle of text while leaving a configurable prefix and suffix visible. */
@Pipe({
  standalone: true,
  name: 'mask',
  pure: true,
})
export class MaskPipe implements PipeTransform {
  transform(
    value: null | string | undefined,
    visibleStart: number = 0,
    visibleEnd: number = 4,
    maskCharacter: string = '•'
  ): string {
    if (typeof value !== 'string') return '';

    const graphemes = getGraphemes(value);
    const start = toNonNegativeInteger(visibleStart, 0);
    const end = toNonNegativeInteger(visibleEnd, 4);
    const character =
      typeof maskCharacter !== 'string' || maskCharacter === ''
        ? '•'
        : (getGraphemes(maskCharacter)[0] ?? '•');

    if (start + end >= graphemes.length) return value;

    const hiddenLength = graphemes.length - start - end;
    return `${graphemes.slice(0, start).join('')}${character.repeat(hiddenLength)}${graphemes
      .slice(graphemes.length - end)
      .join('')}`;
  }
}
