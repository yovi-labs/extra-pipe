import { Pipe, PipeTransform } from '@angular/core';

export interface PipeGroup<T, K> {
  readonly key: K;
  readonly items: T[];
}
/** Preserves encounter order; Map handles arbitrary keys without prototype writes. */
export function groupBy<T, K extends keyof T>(
  items: readonly T[] | null | undefined,
  key: K
): PipeGroup<T, T[K]>[] {
  if (
    !Array.isArray(items) ||
    (typeof key !== 'string' &&
      typeof key !== 'number' &&
      typeof key !== 'symbol') ||
    items.some(item => item === null || typeof item !== 'object')
  )
    return [];
  const groups = new Map<T[K], PipeGroup<T, T[K]>>();
  for (const item of items) {
    const value = Object.prototype.hasOwnProperty.call(item, key)
      ? item[key]
      : (undefined as T[K]);
    let group = groups.get(value);
    if (!group) {
      group = { key: value, items: [] };
      groups.set(value, group);
    }
    group.items.push(item);
  }
  return Array.from(groups.values());
}
@Pipe({ name: 'groupBy', standalone: true, pure: true })
export class GroupByPipe implements PipeTransform {
  transform<T, K extends keyof T>(
    items: readonly T[] | null | undefined,
    key: K
  ): PipeGroup<T, T[K]>[] {
    return groupBy(items, key);
  }
}
