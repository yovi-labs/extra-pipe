export const DAY_MS = 86400000;
export function finite(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}
export function integer(
  value: unknown,
  min = 0,
  max = Number.MAX_SAFE_INTEGER
): value is number {
  return (
    finite(value) && Number.isSafeInteger(value) && value >= min && value <= max
  );
}
export function validKey(key: unknown): key is PropertyKey {
  return (
    typeof key === 'string' ||
    typeof key === 'number' ||
    typeof key === 'symbol'
  );
}
export function plainRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') return false;
  const prototype: unknown = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}
/** Only own data properties: inherited fields and accessors are never invoked. */
export function ownValue(value: unknown, key: PropertyKey): unknown {
  if (value === null || typeof value !== 'object') return undefined;
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor && 'value' in descriptor ? descriptor.value : undefined;
}
export function plainEntries(
  value: Record<string, unknown>
): [string, unknown][] {
  return Object.keys(value).map(key => [key, ownValue(value, key)]);
}
export function records(
  value: unknown
): value is readonly Record<string, unknown>[] {
  return Array.isArray(value) && value.every(plainRecord);
}
export function numbers(value: unknown): value is readonly number[] {
  return Array.isArray(value) && value.every(finite);
}
export function fieldNumbers<T>(
  value: readonly T[] | null | undefined,
  key: keyof T
): number[] | null {
  if (!records(value) || !validKey(key)) return null;
  const result = value.map(item => ownValue(item, key));
  return result.every(finite) ? result : null;
}
export function finiteResult(value: number): number | null {
  return finite(value) ? value : null;
}
export function sameValueZero(a: unknown, b: unknown): boolean {
  return (
    a === b ||
    (typeof a === 'number' &&
      typeof b === 'number' &&
      Number.isNaN(a) &&
      Number.isNaN(b))
  );
}
