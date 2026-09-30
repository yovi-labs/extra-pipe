/// <reference lib="es2021.intl" />
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../shared/helper/intl.helper';

export type ListFormatOptions = Intl.ListFormatOptions;
export function formatList(
  value: readonly string[] | null | undefined,
  options: ListFormatOptions = {},
  locale = 'en-US'
): string {
  if (
    !Array.isArray(value) ||
    value.some(item => typeof item !== 'string') ||
    !options ||
    typeof options !== 'object'
  )
    return '';
  try {
    return new Intl.ListFormat(resolveLocale(locale, 'en-US'), options).format(
      value
    );
  } catch {
    return '';
  }
}
@Pipe({ name: 'listFormat', standalone: true, pure: true })
export class ListFormatPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform(
    value: readonly string[] | null | undefined,
    options: ListFormatOptions = {},
    locale?: string
  ): string {
    return formatList(
      value,
      options,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
