import { getGraphemes, resolveLocale } from '../../shared/helper/intl.helper';
import { integer } from '../../shared/helper/toolbox.helper';
import { MatchSegment } from './toolbox.types';

interface WordSegment {
  segment: string;
  index: number;
  isWordLike?: boolean;
}
type WordSegmenter = new (
  locale: string,
  options: { granularity: 'word' }
) => { segment(value: string): Iterable<WordSegment> };
function words(value: string, locale: string): WordSegment[] {
  const Segmenter = (Intl as typeof Intl & { Segmenter?: WordSegmenter })
    .Segmenter;
  if (Segmenter)
    return Array.from(
      new Segmenter(resolveLocale(locale, 'en-US'), {
        granularity: 'word',
      }).segment(value)
    ).filter(item => item.isWordLike);
  return Array.from(
    value.matchAll(/[\p{L}\p{N}\p{M}]+(?:['’][\p{L}\p{N}\p{M}]+)*/gu),
    item => ({ segment: item[0], index: item.index as number })
  );
}
export function wordCount(
  value: string | null | undefined,
  locale = 'en-US'
): number | null {
  return typeof value === 'string' ? words(value, locale).length : null;
}
export function truncateWords(
  value: string | null | undefined,
  maximumWords = 20,
  suffix = '…',
  locale = 'en-US'
): string {
  if (
    typeof value !== 'string' ||
    !integer(maximumWords, 0, 100000) ||
    typeof suffix !== 'string'
  )
    return '';
  if (maximumWords === 0) return '';
  const tokens = words(value, locale);
  if (tokens.length <= maximumWords) return value;
  const last = tokens[maximumWords - 1];
  return value.slice(0, last.index + last.segment.length).trimEnd() + suffix;
}
export function wrapWords(
  value: string | null | undefined,
  maximumColumns = 80
): string {
  if (typeof value !== 'string' || !integer(maximumColumns, 1, 10000))
    return '';
  return value
    .split(/\r\n|\r|\n/)
    .map(paragraph => {
      const tokens = paragraph.trim().split(/\s+/u).filter(Boolean);
      const lines: string[] = [];
      let line = '';
      let lineLength = 0;
      for (const token of tokens) {
        const tokenLength = getGraphemes(token).length;
        if (line && lineLength + 1 + tokenLength > maximumColumns) {
          lines.push(line);
          line = token;
          lineLength = tokenLength;
        } else {
          lineLength += tokenLength + (line ? 1 : 0);
          line = line ? line + ' ' + token : token;
        }
      }
      if (line) lines.push(line);
      return lines.join('\n');
    })
    .join('\n');
}
export function readingTime(
  value: string | null | undefined,
  wordsPerMinute = 200,
  locale = 'en-US'
): string {
  if (typeof value !== 'string' || !integer(wordsPerMinute, 1, 10000))
    return '';
  const minutes = Math.ceil(words(value, locale).length / wordsPerMinute);
  return new Intl.NumberFormat(resolveLocale(locale, 'en-US'), {
    style: 'unit',
    unit: 'minute',
    unitDisplay: 'short',
    maximumFractionDigits: 0,
  }).format(minutes);
}
export function normalizeWhitespace(value: string | null | undefined): string {
  return typeof value === 'string' ? value.replace(/\s+/gu, ' ').trim() : '';
}
export function stripDiacritics(value: string | null | undefined): string {
  return typeof value === 'string'
    ? value
        .normalize('NFD')
        .replace(/(\p{Script=Latin})\p{M}+/gu, '$1')
        .normalize('NFC')
    : '';
}
export function excerpt(
  value: string | null | undefined,
  query: string,
  maximumLength = 80,
  suffix = '…'
): string {
  if (
    typeof value !== 'string' ||
    typeof query !== 'string' ||
    !query ||
    !integer(maximumLength, 0, 10000) ||
    typeof suffix !== 'string'
  )
    return '';
  const graphemes = getGraphemes(value);
  if (!maximumLength) return '';
  const index = value.indexOf(query);
  if (index < 0) return '';
  if (graphemes.length <= maximumLength) return value;
  let offset = 0,
    match = 0;
  for (let i = 0; i < graphemes.length; i++) {
    if (offset + graphemes[i].length > index) {
      match = i;
      break;
    }
    offset += graphemes[i].length;
  }
  const marker = getGraphemes(suffix);
  const room = Math.max(0, maximumLength - marker.length * 2);
  if (!room) return marker.slice(0, maximumLength).join('');
  const start = Math.max(
    0,
    Math.min(graphemes.length - room, match - Math.floor(room / 2))
  );
  const end = start + room;
  return (start ? marker : [])
    .concat(graphemes.slice(start, end), end < graphemes.length ? marker : [])
    .join('');
}
export function highlightMatches(
  value: string | null | undefined,
  query: string
): MatchSegment[] {
  if (typeof value !== 'string' || typeof query !== 'string') return [];
  if (!query) return value ? [{ text: value, matched: false }] : [];
  const result: MatchSegment[] = [];
  const boundaries = new Set<number>([0]);
  let boundary = 0;
  for (const segment of getGraphemes(value)) {
    boundary += segment.length;
    boundaries.add(boundary);
  }
  let offset = 0,
    search = 0;
  while (search < value.length) {
    const index = value.indexOf(query, search);
    if (index < 0) break;
    if (!boundaries.has(index) || !boundaries.has(index + query.length)) {
      search = index + 1;
      continue;
    }
    if (index > offset)
      result.push({ text: value.slice(offset, index), matched: false });
    result.push({
      text: value.slice(index, index + query.length),
      matched: true,
    });
    offset = index + query.length;
    search = offset;
  }
  if (offset < value.length)
    result.push({ text: value.slice(offset), matched: false });
  return result;
}
export function humanizeIdentifier(value: string | null | undefined): string {
  return typeof value === 'string'
    ? value
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[_\-\s]+/g, ' ')
        .trim()
    : '';
}
export function escapeRegExp(value: string | null | undefined): string {
  return typeof value === 'string'
    ? value.replace(/[.*+?^$\x7b\x7d()|[\]\\]/g, '\\$&')
    : '';
}
export function graphemeCount(value: string | null | undefined): number | null {
  return typeof value === 'string' ? getGraphemes(value).length : null;
}
export function splitLines(value: string | null | undefined): string[] {
  return typeof value === 'string' ? value.split(/\r\n|\r|\n/) : [];
}
