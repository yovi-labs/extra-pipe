# objects toolbox — 1.2 preview

8 distinct standalone pipes. Helpers are exported with their adapters. None are published yet.

See [shared contracts](../PIPE-101-CONTRACTS.md) for own-data/readonly input, invalid results, bounds and locale rules.

## getPath

Read an own-property path supplied as a key array.

Why add it: Angular does not traverse dynamic paths; no expression evaluator.

```typescript
getPath(value: unknown, path: readonly PropertyKey[], fallback: unknown = null): unknown
```

Invalid input: `null`. No locale argument.

```html
{{ {"profile":{"name":"Ana"}} | getPath: ["profile","name"] }}
```

## pick

Display explicitly allowed own fields.

Why add it: KeyValuePipe enumerates rather than selecting fields.

```typescript
pick<T extends object>(value: T | null | undefined, keys: readonly (keyof T & string)[]): Partial<T> | null
```

Invalid input: `null`. No locale argument.

```html
{{ {"id":1,"name":"Ana"} | pick: ["name"] }}
```

## omit

Create a display object excluding named own fields.

Why add it: Pick is an allowlist, omit an exclusion list.

```typescript
omit<T extends object>(value: T | null | undefined, keys: readonly (keyof T & string)[]): Partial<T> | null
```

Invalid input: `null`. No locale argument.

```html
{{ {"id":1,"name":"Ana"} | omit: ["id"] }}
```

## renameKeys

Remap schema field names without silently losing collisions.

Why add it: Angular provides no safe field-key remapping.

```typescript
renameKeys(value: Readonly<Record<string, unknown>> | null | undefined, mapping: Readonly<Record<string, string>>): Record<string,unknown> | null
```

Invalid input: `null`. No locale argument.

```html
{{ {"first_name":"Ana"} | renameKeys: {"first_name":"name"} }}
```

## defaults

Fill only nullish own fields from shallow defaults.

Why add it: Object spreading overwrites present values.

```typescript
defaults<T extends object, U extends object>(value: T | null | undefined, fallback: U): DefaultsResult<T, U> | null
```

Invalid input: `null`. No locale argument.

```html
{{ {"name":null,"active":false} | defaults: {"name":"Ana","active":true} }}
```

## invertRecord

Invert scalar mappings while preserving duplicate-value keys.

Why add it: KeyValuePipe does not invert mappings or preserve reverse collisions.

```typescript
invertRecord(value: Readonly<Record<string, string | number | boolean>> | null | undefined): Record<string,string[]> | null
```

Invalid input: `null`. No locale argument.

```html
{{ {"a":"x","b":"x"} | invertRecord }}
```

## pruneEmpty

Remove recursively empty data while preserving zero and false.

Why add it: Omit requires named fields; this prunes by documented emptiness.

```typescript
pruneEmpty(value: Readonly<Record<string,unknown>> | null | undefined): Record<string,unknown> | null
```

Invalid input: `null`. No locale argument.

```html
{{ {"a":"","b":0,"c":false,"d":{"e":null}} | pruneEmpty }}
```

## pathEntries

Flatten own leaf values to key-array paths, without dotted-key ambiguity.

Why add it: KeyValuePipe only enumerates one level.

```typescript
pathEntries(value: Readonly<Record<string,unknown>> | null | undefined): PathEntry[]
```

Invalid input: `[]`. No locale argument.

```html
{{ {"profile":{"name":"Ana"}} | pathEntries }}
```
