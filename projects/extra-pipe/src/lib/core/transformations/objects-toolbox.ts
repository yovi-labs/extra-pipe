import {
  ownValue,
  plainEntries,
  plainRecord,
} from '../../shared/helper/toolbox.helper';
import { DefaultsResult, PathEntry } from './toolbox.types';
function stringKeys(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every(key => typeof key === 'string');
}
export function getPath(
  value: unknown,
  path: readonly PropertyKey[],
  fallback: unknown = null
): unknown {
  if (
    !Array.isArray(path) ||
    path.length > 32 ||
    path.some(
      key =>
        !['string', 'number', 'symbol'].includes(typeof key) ||
        ['__proto__', 'prototype', 'constructor'].includes(String(key))
    )
  )
    return fallback;
  let current = value;
  for (const key of path) {
    if (!plainRecord(current) && !Array.isArray(current)) return fallback;
    current = ownValue(current, key);
    if (current === undefined) return fallback;
  }
  return current === undefined ? fallback : current;
}
export function pick<T extends object>(
  value: T | null | undefined,
  keys: readonly (keyof T & string)[]
): Partial<T> | null {
  if (!plainRecord(value) || !stringKeys(keys)) return null;
  const selected = new Set<string>(keys);
  return Object.fromEntries(
    plainEntries(value).filter(([key]) => selected.has(key))
  ) as Partial<T>;
}
export function omit<T extends object>(
  value: T | null | undefined,
  keys: readonly (keyof T & string)[]
): Partial<T> | null {
  if (!plainRecord(value) || !stringKeys(keys)) return null;
  const excluded = new Set<string>(keys);
  return Object.fromEntries(
    plainEntries(value).filter(([key]) => !excluded.has(key))
  ) as Partial<T>;
}
export function renameKeys(
  value: Readonly<Record<string, unknown>> | null | undefined,
  mapping: Readonly<Record<string, string>>
): Record<string, unknown> | null {
  if (
    !plainRecord(value) ||
    !plainRecord(mapping) ||
    plainEntries(mapping).some(([, target]) => typeof target !== 'string')
  )
    return null;
  const seen = new Set<string>();
  const result: [string, unknown][] = [];
  for (const [key, item] of plainEntries(value)) {
    const target = Object.prototype.propertyIsEnumerable.call(mapping, key)
      ? (ownValue(mapping, key) as string)
      : key;
    if (seen.has(target)) return null;
    seen.add(target);
    result.push([target, item]);
  }
  return Object.fromEntries(result);
}
export function defaults<T extends object, U extends object>(
  value: T | null | undefined,
  fallback: U
): DefaultsResult<T, U> | null {
  if (!plainRecord(value) || !plainRecord(fallback)) return null;
  const result = new Map<string, unknown>(plainEntries(value));
  for (const [key, item] of plainEntries(fallback))
    if (result.get(key) === null || result.get(key) === undefined)
      result.set(key, item);
  return Object.fromEntries(result) as DefaultsResult<T, U>;
}
export function invertRecord(
  value: Readonly<Record<string, string | number | boolean>> | null | undefined
): Record<string, string[]> | null {
  if (!plainRecord(value)) return null;
  const result = new Map<string, string[]>();
  for (const [key, item] of plainEntries(value)) {
    if (
      !['string', 'number', 'boolean'].includes(typeof item) ||
      (typeof item === 'number' && !Number.isFinite(item))
    )
      return null;
    const label = String(item),
      previous = result.get(label);
    if (previous) previous.push(key);
    else result.set(label, [key]);
  }
  return Object.fromEntries(result);
}
const EMPTY = Symbol('empty');
function prune(value: unknown, depth: number, active: Set<object>): unknown {
  if (value === null || value === undefined || value === '') return EMPTY;
  if (!plainRecord(value) && !Array.isArray(value)) return value;
  if (depth > 12 || active.has(value)) throw new Error('Invalid nested object');
  active.add(value);
  let result: unknown;
  if (Array.isArray(value))
    result = value
      .map(item => prune(item, depth + 1, active))
      .filter(item => item !== EMPTY);
  else
    result = Object.fromEntries(
      plainEntries(value)
        .map(([key, item]) => [key, prune(item, depth + 1, active)])
        .filter(([, item]) => item !== EMPTY)
    );
  active.delete(value);
  return (
    Array.isArray(result) ? result.length : Object.keys(result as object).length
  )
    ? result
    : EMPTY;
}
export function pruneEmpty(
  value: Readonly<Record<string, unknown>> | null | undefined
): Record<string, unknown> | null {
  if (!plainRecord(value)) return null;
  try {
    const result = prune(value, 0, new Set());
    return result === EMPTY ? {} : (result as Record<string, unknown>);
  } catch {
    return null;
  }
}
export function pathEntries(
  value: Readonly<Record<string, unknown>> | null | undefined
): PathEntry[] {
  if (!plainRecord(value)) return [];
  const result: PathEntry[] = [],
    active = new Set<object>();
  function visit(item: unknown, path: PropertyKey[], depth: number): void {
    if (!plainRecord(item) && !Array.isArray(item)) {
      result.push({ path, value: item });
      return;
    }
    if (depth > 12 || active.has(item))
      throw new Error('Invalid nested object');
    active.add(item);
    const entries: [PropertyKey, unknown][] = Array.isArray(item)
      ? Array.from(item, (value, index) => [index, value])
      : plainEntries(item);
    if (!entries.length)
      result.push({ path, value: Array.isArray(item) ? [] : {} });
    else
      for (const [key, value] of entries)
        visit(value, [...path, key], depth + 1);
    active.delete(item);
  }
  try {
    visit(value, [], 0);
    return result;
  } catch {
    return [];
  }
}
