import {
  integer,
  ownValue,
  records,
  sameValueZero,
  validKey,
} from '../../internal/validation';
import { CountGroup, PageResult, PartitionResult } from './collections.types';
export function chunk<T>(
  value: readonly T[] | null | undefined,
  size = 2
): T[][] {
  if (!Array.isArray(value) || !integer(size, 1, 5000)) return [];
  const result: T[][] = [];
  for (let i = 0; i < value.length; i += size)
    result.push(value.slice(i, i + size));
  return result;
}
export function flatten(
  value: readonly unknown[] | null | undefined,
  depth = 1
): unknown[] {
  if (!Array.isArray(value) || !integer(depth, 0, 8)) return [];
  const result: unknown[] = [];
  const active = new Set<readonly unknown[]>();
  let invalid = false;
  function visit(items: readonly unknown[], remaining: number): void {
    if (active.has(items)) {
      invalid = true;
      return;
    }
    active.add(items);
    for (const item of items) {
      if (Array.isArray(item) && remaining > 0) visit(item, remaining - 1);
      else result.push(item);
    }
    active.delete(items);
  }
  visit(value, depth);
  return invalid ? [] : result;
}
export function compact<T>(
  value: readonly T[] | null | undefined
): NonNullable<T>[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is NonNullable<T> => item !== null && item !== undefined
      )
    : [];
}
export function partition<T, K extends keyof T>(
  value: readonly T[] | null | undefined,
  key: K,
  expected: T[K]
): PartitionResult<T> {
  const matching: T[] = [],
    remaining: T[] = [];
  if (records(value) && validKey(key))
    for (const item of value) {
      (sameValueZero(ownValue(item, key), expected)
        ? matching
        : remaining
      ).push(item as T);
    }
  return { matching, remaining };
}
export function zip<T, U>(
  value: readonly T[] | null | undefined,
  other: readonly U[]
): [T, U][] {
  if (!Array.isArray(value) || !Array.isArray(other)) return [];
  return Array.from(
    { length: Math.min(value.length, other.length) },
    (_, i) => [value[i], other[i]]
  );
}
export function unzip<T, U>(
  value: readonly (readonly [T, U])[] | null | undefined
): [T[], U[]] {
  if (
    !Array.isArray(value) ||
    value.some(item => !Array.isArray(item) || item.length !== 2)
  )
    return [[], []];
  return [value.map(item => item[0]), value.map(item => item[1])];
}
export function slidingWindow<T>(
  value: readonly T[] | null | undefined,
  size = 2,
  step = 1
): T[][] {
  if (
    !Array.isArray(value) ||
    !integer(size, 1, 5000) ||
    !integer(step, 1, 5000)
  )
    return [];
  const result: T[][] = [];
  for (let i = 0; i + size <= value.length; i += step)
    result.push(value.slice(i, i + size));
  return result;
}
export function pluck<T, K extends keyof T>(
  value: readonly T[] | null | undefined,
  key: K
): (T[K] | undefined)[] {
  if (!records(value) || !validKey(key)) return [];
  return value.map(item => ownValue(item, key) as T[K] | undefined);
}
export function filterBy<T, K extends keyof T>(
  value: readonly T[] | null | undefined,
  key: K,
  expected: T[K]
): T[] {
  if (!records(value) || !validKey(key)) return [];
  return value.filter(item =>
    sameValueZero(ownValue(item, key), expected)
  ) as T[];
}
function keyedSet<T, U, K extends keyof T & keyof U>(
  value: readonly T[] | null | undefined,
  other: readonly U[],
  key: K,
  operation: 'intersection' | 'difference' | 'union' | 'symmetric'
): (T | U)[] {
  if (!records(value) || !records(other) || !validKey(key)) return [];
  const leftKeys = new Set(value.map(item => ownValue(item, key))),
    rightKeys = new Set(other.map(item => ownValue(item, key))),
    seen = new Set<unknown>();
  const result: (T | U)[] = [];
  function add(
    items: readonly (T | U)[],
    accept: (key: unknown) => boolean
  ): void {
    for (const item of items) {
      const identity = ownValue(item, key);
      if (accept(identity) && !seen.has(identity)) {
        seen.add(identity);
        result.push(item);
      }
    }
  }
  if (operation === 'union') {
    add(value, () => true);
    add(other, () => true);
  } else if (operation === 'intersection')
    add(value, identity => rightKeys.has(identity));
  else if (operation === 'difference')
    add(value, identity => !rightKeys.has(identity));
  else {
    add(value, identity => !rightKeys.has(identity));
    add(other, identity => !leftKeys.has(identity));
  }
  return result;
}
export function intersectionBy<T, U, K extends keyof T & keyof U>(
  value: readonly T[] | null | undefined,
  other: readonly U[],
  key: K
): T[] {
  return keyedSet(value, other, key, 'intersection') as T[];
}
export function differenceBy<T, U, K extends keyof T & keyof U>(
  value: readonly T[] | null | undefined,
  other: readonly U[],
  key: K
): T[] {
  return keyedSet(value, other, key, 'difference') as T[];
}
export function unionBy<T, U, K extends keyof T & keyof U>(
  value: readonly T[] | null | undefined,
  other: readonly U[],
  key: K
): (T | U)[] {
  return keyedSet(value, other, key, 'union');
}
export function symmetricDifferenceBy<T, U, K extends keyof T & keyof U>(
  value: readonly T[] | null | undefined,
  other: readonly U[],
  key: K
): (T | U)[] {
  return keyedSet(value, other, key, 'symmetric');
}
export function indexBy<T, K extends keyof T>(
  value: readonly T[] | null | undefined,
  key: K
): Map<T[K] | undefined, T> {
  const result = new Map<T[K] | undefined, T>();
  if (records(value) && validKey(key))
    for (const item of value)
      result.set(ownValue(item, key) as T[K], item as T);
  return result;
}
export function countBy<T, K extends keyof T>(
  value: readonly T[] | null | undefined,
  key: K
): CountGroup<T[K] | undefined>[] {
  if (!records(value) || !validKey(key)) return [];
  const counts = new Map<T[K], number>();
  for (const item of value) {
    const identity = ownValue(item, key) as T[K];
    counts.set(identity, (counts.get(identity) ?? 0) + 1);
  }
  return Array.from(counts, ([key, count]) => ({ key, count }));
}
export function mergeBy<T, U, K extends keyof T & keyof U>(
  value: readonly T[] | null | undefined,
  other: readonly U[],
  key: K
): (T | U)[] {
  if (!records(value) || !records(other) || !validKey(key)) return [];
  const merged = new Map<unknown, T | U>();
  for (const item of [...value, ...other]) {
    const identity = ownValue(item, key);
    if (identity === undefined) return [];
    // Object.fromEntries creates own data properties without invoking setters.
    const previous = merged.get(identity);
    const entries = [
      ...(previous
        ? Object.keys(previous).map(name => [name, ownValue(previous, name)])
        : []),
      ...Object.keys(item).map(name => [name, ownValue(item, name)]),
    ];
    merged.set(identity, Object.fromEntries(entries) as T | U);
  }
  return Array.from(merged.values());
}
export function paginate<T>(
  value: readonly T[] | null | undefined,
  page = 1,
  pageSize = 20
): PageResult<T> | null {
  if (!Array.isArray(value) || !integer(page, 1) || !integer(pageSize, 1, 5000))
    return null;
  const start = (page - 1) * pageSize;
  if (!Number.isSafeInteger(start)) return null;
  return {
    items: value.slice(start, start + pageSize),
    page,
    pageSize,
    totalItems: value.length,
    totalPages: Math.ceil(value.length / pageSize),
  };
}
