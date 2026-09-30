/// <reference lib="es2021.intl" />
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../shared/helper/intl.helper';

export type DisplayNameType = Intl.DisplayNamesOptions['type'];
export type DisplayNameOptions = Omit<Intl.DisplayNamesOptions, 'type'>;
export function getDisplayName(
  value: string | null | undefined,
  type: DisplayNameType,
  options: DisplayNameOptions = {},
  locale = 'en-US'
): string {
  if (
    typeof value !== 'string' ||
    !value.trim() ||
    !options ||
    typeof options !== 'object'
  )
    return '';
  try {
    return (
      new Intl.DisplayNames(resolveLocale(locale, 'en-US'), {
        ...options,
        type,
      }).of(value) ?? ''
    );
  } catch {
    return '';
  }
}
@Pipe({ name: 'displayName', standalone: true, pure: true })
export class DisplayNamePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: string | null | undefined,
    type: DisplayNameType,
    options: DisplayNameOptions = {},
    locale?: string
  ): string {
    return getDisplayName(
      value,
      type,
      options,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
