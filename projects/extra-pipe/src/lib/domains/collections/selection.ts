import { ownValue } from '../../internal/validation';

export function containsValue(items: null | readonly unknown[] | undefined, candidate: unknown): boolean {
  return Array.isArray(items) && items.includes(candidate);
}

/** SameValueZero exclusion, linear in the input and exclusion lengths. */
export function excludeByValues<T>(items: readonly T[], key: keyof T, excluded: readonly unknown[]): T[] {
  const excludedValues = new Set(excluded);
  return items.filter(item => !excludedValues.has(ownValue(item, key)));
}

/** Keep the last value for each key without moving the key's first insertion position. */
export function retainLastByKey<T>(items: readonly T[], key: keyof T): T[] {
  const retained = new Map<unknown, T>();
  for (const item of items) retained.set(ownValue(item, key), item);
  return Array.from(retained.values());
}
