import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../shared/helper/intl.helper';
import { truncateWords } from '../transformations/text-toolbox';
export { truncateWords } from '../transformations/text-toolbox';
/** Article previews cut at word boundaries. */
@Pipe({ name: 'truncateWords', standalone: true, pure: true })
export class TruncateWordsPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: string | null | undefined,
    maximumWords = 20,
    suffix = '…',
    locale?: string
  ): string {
    return truncateWords(
      value,
      maximumWords,
      suffix,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
