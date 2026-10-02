import { Pipe, PipeTransform } from '@angular/core';
import { getGraphemes } from '../../../internal/intl';

export function truncateMiddle(
  value: string | null | undefined,
  maximumLength: number,
  suffix = '…'
): string {
  if (
    typeof value !== 'string' ||
    typeof suffix !== 'string' ||
    !Number.isInteger(maximumLength) ||
    maximumLength < 0
  )
    return '';
  const text = getGraphemes(value),
    marker = getGraphemes(suffix);
  if (text.length <= maximumLength) return value;
  if (marker.length >= maximumLength)
    return marker.slice(0, maximumLength).join('');
  const available = maximumLength - marker.length,
    start = Math.ceil(available / 2),
    end = Math.floor(available / 2);
  return (
    text.slice(0, start).join('') +
    suffix +
    (end ? text.slice(-end).join('') : '')
  );
}
@Pipe({ name: 'truncateMiddle', standalone: true, pure: true })
export class TruncateMiddlePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    maximumLength: number,
    suffix = '…'
  ): string {
    return truncateMiddle(value, maximumLength, suffix);
  }
}
