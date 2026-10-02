import { Pipe, PipeTransform } from '@angular/core';

export type UniqueRetention = 'first' | 'last';
/** Retained items remain in original source order; never mutates the input. */
export function uniqueBy<T, K extends keyof T>(
  items: readonly T[] | null | undefined,
  key: K,
  retain: UniqueRetention = 'first'
): T[] {
  if (
    !Array.isArray(items) ||
    !['first', 'last'].includes(retain) ||
    (typeof key !== 'string' &&
      typeof key !== 'number' &&
      typeof key !== 'symbol') ||
    items.some(item => item === null || typeof item !== 'object')
  )
    return [];
  const indexes = new Map<T[K], number>();
  items.forEach((item, index) => {
    const value = Object.prototype.hasOwnProperty.call(item, key)
      ? item[key]
      : (undefined as T[K]);
    if (retain === 'last' || !indexes.has(value)) indexes.set(value, index);
  });
  const retained = new Set(indexes.values());
  return items.filter((_item, index) => retained.has(index));
}
@Pipe({ name: 'uniqueBy', standalone: true, pure: true })
export class UniqueByPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    items: readonly T[] | null | undefined,
    key: K,
    retain: UniqueRetention = 'first'
  ): T[] {
    return uniqueBy(items, key, retain);
  }
}
