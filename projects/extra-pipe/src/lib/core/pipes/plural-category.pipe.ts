import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../shared/helper/intl.helper';
import { pluralCategory } from '../transformations/numbers-toolbox';
import { PluralKind } from '../transformations/toolbox.types';
export { pluralCategory } from '../transformations/numbers-toolbox';
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
