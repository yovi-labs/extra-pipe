import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { resolveLocale } from '../../shared/helper/intl.helper';

export type SortDirection = 'asc' | 'desc';
/** Stable display sorting; valid numbers before strings, missing values always last. */
export function orderBy<T, K extends keyof T>(
  items: readonly T[] | null | undefined,
  key: K,
  direction: SortDirection = 'asc',
  locale = 'en-US'
): T[] {
  if (
    !Array.isArray(items) ||
    !['asc', 'desc'].includes(direction) ||
    (typeof key !== 'string' &&
      typeof key !== 'number' &&
      typeof key !== 'symbol') ||
    items.some(item => item === null || typeof item !== 'object')
  )
    return [];
  const collator = new Intl.Collator(resolveLocale(locale, 'en-US'), {
    numeric: true,
  });
  const valid = (value: unknown): value is number | string =>
    typeof value === 'string' ||
    (typeof value === 'number' && Number.isFinite(value));
  return items
    .map((item, index) => ({
      item,
      index,
      value: Object.prototype.hasOwnProperty.call(item, key)
        ? item[key]
        : undefined,
    }))
    .sort((a, b) => {
      const av = a.value,
        bv = b.value;
      if (!valid(av)) return valid(bv) ? 1 : a.index - b.index;
      if (!valid(bv)) return -1;
      const comparison =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : typeof av !== typeof bv
            ? typeof av === 'number'
              ? -1
              : 1
            : collator.compare(String(av), String(bv));
      return (
        (direction === 'desc' ? -comparison : comparison) || a.index - b.index
      );
    })
    .map(entry => entry.item);
}
@Pipe({ name: 'orderBy', standalone: true, pure: true })
export class OrderByPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly defaultLocale: string) {}
  transform<T, K extends keyof T>(
    items: readonly T[] | null | undefined,
    key: K,
    direction: SortDirection = 'asc',
    locale?: string
  ): T[] {
    return orderBy(
      items,
      key,
      direction,
      resolveLocale(locale, this.defaultLocale)
    );
  }
}
