# collections toolbox — 1.2 preview

17 distinct standalone pipes. Helpers are exported with their adapters. None are published yet.

See [shared contracts](../PIPE-101-CONTRACTS.md) for own-data/readonly input, invalid results, bounds and locale rules.

## chunk

Group cards into fixed-size display rows.

Why add it: SlicePipe cannot create a nested grid.

```typescript
chunk<T>(value: readonly T[] | null | undefined, size = 2): T[][]
```

Invalid input: `[]`. No locale argument.

```html
{{ [1,2,3] | chunk: 2 }}
```

## flatten

Present nested lists with explicit bounded depth.

Why add it: Angular does not flatten arrays.

```typescript
flatten(value: readonly unknown[] | null | undefined, depth = 1): unknown[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [1,[2,[3]]] | flatten: 2 }}
```

## compact

Drop nullish values while retaining 0 and false.

Why add it: Angular has no nullish-only array compaction.

```typescript
compact<T>(value: readonly T[] | null | undefined): NonNullable<T>[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [0,null,false,""] | compact }}
```

## partition

Split records into matching and remaining buckets.

Why add it: groupBy creates arbitrary groups rather than a two-way predicate partition.

```typescript
partition<T, K extends keyof T>(value: readonly T[] | null | undefined, key: K, expected: T[K]): PartitionResult<T>
```

Invalid input: `{"matching":[],"remaining":[]}`. No locale argument.

```html
{{ [{"active":true},{"active":false}] | partition: "active": true }}
```

## zip

Pair parallel data series to the shorter length.

Why add it: Angular has no pairwise zip.

```typescript
zip<T, U>(value: readonly T[] | null | undefined, other: readonly U[]): [T, U][]
```

Invalid input: `[]`. No locale argument.

```html
{{ [1,2] | zip: ["A","B"] }}
```

## unzip

Split paired coordinates into parallel series.

Why add it: Zip is pairing, unzip is projection of paired input.

```typescript
unzip<T, U>(value: readonly (readonly [T, U])[] | null | undefined): [T[], U[]]
```

Invalid input: `[[],[]]`. No locale argument.

```html
{{ pairs | unzip | json }}
```

For the preceding unzip example, declare typed pairs in the component:
`readonly pairs = [[1, 'A'], [2, 'B']] as const;` and import Angular's JsonPipe.

## slidingWindow

Create overlapping chart/history windows.

Why add it: Chunk gives disjoint groups, not overlapping windows.

```typescript
slidingWindow<T>(value: readonly T[] | null | undefined, size = 2, step = 1): T[][]
```

Invalid input: `[]`. No locale argument.

```html
{{ [1,2,3] | slidingWindow: 2 }}
```

## pluck

Project own direct properties from record lists.

Why add it: Angular has no typed list projection.

```typescript
pluck<T, K extends keyof T>(value: readonly T[] | null | undefined, key: K): (T[K] | undefined)[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"id":1},{"id":2}] | pluck: "id" }}
```

## filterBy

Display records with an own property equal to a value.

Why add it: Existing removeByKey excludes matches; this selects matches.

```typescript
filterBy<T, K extends keyof T>(value: readonly T[] | null | undefined, key: K, expected: T[K]): T[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"active":true},{"active":false}] | filterBy: "active": true }}
```

## intersectionBy

Show records shared between selections by identity key.

Why add it: Angular has no keyed set intersection.

```typescript
intersectionBy<T, U, K extends keyof T & keyof U>(value: readonly T[] | null | undefined, other: readonly U[], key: K): T[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"id":1},{"id":2}] | intersectionBy: [{"id":2}]: "id" }}
```

## differenceBy

Show unselected records by identity key.

Why add it: removeByKey compares primitive exclusions, not another record collection.

```typescript
differenceBy<T, U, K extends keyof T & keyof U>(value: readonly T[] | null | undefined, other: readonly U[], key: K): T[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"id":1},{"id":2}] | differenceBy: [{"id":2}]: "id" }}
```

## unionBy

Combine record sets with first-record precedence.

Why add it: uniqueBy handles one array, not keyed multi-source union.

```typescript
unionBy<T, U, K extends keyof T & keyof U>(value: readonly T[] | null | undefined, other: readonly U[], key: K): (T | U)[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"id":1}] | unionBy: [{"id":1},{"id":2}]: "id" }}
```

## symmetricDifferenceBy

Show records exclusive to either selection.

Why add it: Distinct set operation, not an alias of union/intersection.

```typescript
symmetricDifferenceBy<T, U, K extends keyof T & keyof U>(value: readonly T[] | null | undefined, other: readonly U[], key: K): (T | U)[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"id":1},{"id":2}] | symmetricDifferenceBy: [{"id":2},{"id":3}]: "id" }}
```

## indexBy

Build a prototype-safe lookup Map from records.

Why add it: groupBy retains multiple records; this indexes last record per key.

```typescript
indexBy<T, K extends keyof T>(value: readonly T[] | null | undefined, key: K): Map<T[K] | undefined, T>
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"id":1,"name":"Ana"},{"id":2,"name":"Sam"}] | indexBy: "id" }}
```

Map output: use Angular KeyValuePipe to enumerate, not JsonPipe alone.

## countBy

Summarize category frequencies without retaining grouped arrays.

Why add it: groupBy returns full groups, not counts.

```typescript
countBy<T, K extends keyof T>(value: readonly T[] | null | undefined, key: K): CountGroup<T[K] | undefined>[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"team":"A"},{"team":"A"},{"team":"B"}] | countBy: "team" }}
```

## mergeBy

Reconcile partial records with shallow last-field precedence.

Why add it: Union retains one entire record rather than merging fields.

```typescript
mergeBy<T, U, K extends keyof T & keyof U>(value: readonly T[] | null | undefined, other: readonly U[], key: K): (T | U)[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [{"id":1,"name":"Ana"}] | mergeBy: [{"id":1,"active":true}]: "id" }}
```

## paginate

Generate page items and total-page metadata for client display.

Why add it: SlicePipe returns only a slice, without pagination metadata.

```typescript
paginate<T>(value: readonly T[] | null | undefined, page = 1, pageSize = 20): PageResult<T> | null
```

Invalid input: `null`. No locale argument.

```html
{{ [1,2,3] | paginate: 1: 2 }}
```
