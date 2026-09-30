import { Pipe, PipeTransform } from '@angular/core';

export interface SlugifyOptions {
  readonly lowercase?: boolean;
  readonly foldLatinAccents?: boolean;
  readonly separator?: '-' | '_';
}
/** Unicode slug text, not an HTML/URL sanitizer or transliteration service. */
export function slugify(
  value: string | null | undefined,
  options: SlugifyOptions = {}
): string {
  if (
    typeof value !== 'string' ||
    !options ||
    typeof options !== 'object' ||
    (options.separator !== undefined &&
      options.separator !== '-' &&
      options.separator !== '_') ||
    (options.lowercase !== undefined &&
      typeof options.lowercase !== 'boolean') ||
    (options.foldLatinAccents !== undefined &&
      typeof options.foldLatinAccents !== 'boolean')
  )
    return '';
  let text = value.normalize('NFC');
  if (options.foldLatinAccents)
    text = text
      .normalize('NFD')
      .replace(/\p{Script=Latin}\p{M}*/gu, letter =>
        letter.replace(/\p{M}/gu, '')
      )
      .normalize('NFC');
  if (options.lowercase !== false) text = text.toLowerCase();
  const separator = options.separator ?? '-';
  return text
    .replace(/[^\p{L}\p{N}\p{M}]+/gu, separator)
    .replace(/^[-_]+|[-_]+$/g, '');
}
@Pipe({ name: 'slugify', standalone: true, pure: true })
export class SlugifyPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    options: SlugifyOptions = {}
  ): string {
    return slugify(value, options);
  }
}
