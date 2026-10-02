import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../../internal/intl';
import { wordCount } from '../text.functions';
export { wordCount } from '../text.functions';
/** Content word counters using locale segmentation. */
@Pipe({ name: 'wordCount', standalone: true, pure: true })
export class WordCountPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(value: string | null | undefined, locale?: string): number | null {
    return wordCount(value, resolveLocale(locale, this.defaultLocale));
  }
}
