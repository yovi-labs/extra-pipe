import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../../internal/intl';
import { pluralCategory } from '../numbers.functions';
import { PluralKind } from '../numbers.types';
export { pluralCategory } from '../numbers.functions';
/** Expose Intl cardinal/ordinal category for custom presentation. */
@Pipe({ name: 'pluralCategory', standalone: true, pure: true })
export class PluralCategoryPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: number | null | undefined,
    kind: PluralKind = 'cardinal',
    locale?: string
  ): string {
    return pluralCategory(
      value,
      kind,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
