/** Test-only snapshots normalize Map results without losing nested values. */
export function snapshot(value: unknown): unknown {
  if (value instanceof Map) return Array.from(value, ([key, item]) => [snapshot(key), snapshot(item)]);
  if (value instanceof Set) return Array.from(value, snapshot);
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(snapshot);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(value))
      .filter(([, descriptor]) => descriptor.enumerable && 'value' in descriptor)
      .map(([key, descriptor]) => [key, snapshot(descriptor.value)]));
  }
  return value;
}

/** Freeze data fields without evaluating getters; snapshots detect Map/Set changes. */
export function freeze(value: unknown, seen = new WeakSet<object>()): void {
  if (!value || typeof value !== 'object' || seen.has(value)) return;
  seen.add(value);
  if (value instanceof Map) value.forEach((item, key) => { freeze(key, seen); freeze(item, seen); });
  else if (value instanceof Set) value.forEach(item => freeze(item, seen));
  else Object.values(Object.getOwnPropertyDescriptors(value)).forEach(descriptor => {
    if ('value' in descriptor) freeze(descriptor.value, seen);
  });
  Object.freeze(value);
}
