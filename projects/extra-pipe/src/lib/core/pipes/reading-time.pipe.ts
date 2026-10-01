import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../shared/helper/intl.helper';
import { readingTime } from '../transformations/text-toolbox';
export { readingTime } from '../transformations/text-toolbox';
/** Localized article reading estimates. */
@Pipe({ name: 'readingTime', standalone: true, pure: true })
export class ReadingTimePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: string | null | undefined,
    wordsPerMinute = 200,
    locale?: string
  ): string {
    return readingTime(
      value,
      wordsPerMinute,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
