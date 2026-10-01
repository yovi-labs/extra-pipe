# metrics toolbox — 1.2 preview

12 distinct standalone pipes. Helpers are exported with their adapters. None are published yet.

See [shared contracts](../PIPE-101-CONTRACTS.md) for own-data/readonly input, invalid results, bounds and locale rules.

## sumBy

Sum finite numeric fields for dashboard totals.

Why add it: Angular formats numbers but does not aggregate records.

```typescript
sumBy<T>(value: readonly T[] | null | undefined, key: keyof T): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ [{"amount":2},{"amount":4}] | sumBy: "amount" }}
```

## averageBy

Mean numeric fields for dashboard summaries.

Why add it: Formatting does not compute a mean.

```typescript
averageBy<T>(value: readonly T[] | null | undefined, key: keyof T): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ [{"amount":2},{"amount":4}] | averageBy: "amount" }}
```

## minBy

Find the original record with the smallest numeric field.

Why add it: Sorting a whole array allocates more and obscures the record-selection contract.

```typescript
minBy<T>(value: readonly T[] | null | undefined, key: keyof T): T | null
```

Invalid input: `null`. No locale argument.

```html
{{ [{"amount":2},{"amount":4}] | minBy: "amount" }}
```

## maxBy

Find the original record with the largest numeric field.

Why add it: Distinct extremum selection, stable first tie.

```typescript
maxBy<T>(value: readonly T[] | null | undefined, key: keyof T): T | null
```

Invalid input: `null`. No locale argument.

```html
{{ [{"amount":2},{"amount":4}] | maxBy: "amount" }}
```

## summarizeBy

One-pass count/sum/mean/min/max summary.

Why add it: Composite dashboard summary, not a median/percentile alias.

```typescript
summarizeBy<T>(value: readonly T[] | null | undefined, key: keyof T): NumericSummary | null
```

Invalid input: `null`. No locale argument.

```html
{{ [{"amount":2},{"amount":4}] | summarizeBy: "amount" }}
```

## percentileBy

Interpolated percentile for numeric dashboard samples.

Why add it: Angular has no percentile calculation.

```typescript
percentileBy<T>(value: readonly T[] | null | undefined, key: keyof T, percentile=50): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ [{"amount":2},{"amount":4}] | percentileBy: "amount": 50 }}
```

## weightedAverageBy

Weighted average with explicit nonnegative weights.

Why add it: A simple mean ignores record weights.

```typescript
weightedAverageBy<T>(value: readonly T[] | null | undefined, valueKey: keyof T, weightKey: keyof T): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ [{"value":2,"weight":1},{"value":4,"weight":3}] | weightedAverageBy: "value":
"weight" }}
```

## extentBy

Numeric lower/upper bounds for chart domains.

Why add it: Returns bounds without returning records or sorting.

```typescript
extentBy<T>(value: readonly T[] | null | undefined, key: keyof T): [number,number] | null
```

Invalid input: `null`. No locale argument.

```html
{{ [{"amount":2},{"amount":4}] | extentBy: "amount" }}
```

## cumulativeSum

Running totals for chart series.

Why add it: SumBy returns one total, not prefix sums.

```typescript
cumulativeSum(value: readonly number[] | null | undefined): number[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [1,2,3] | cumulativeSum }}
```

## movingAverage

Full-window averages for chart smoothing.

Why add it: SlidingWindow creates arrays, not numeric smoothing.

```typescript
movingAverage(value: readonly number[] | null | undefined, windowSize=3): number[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [1,2,3] | movingAverage: 2 }}
```

## histogram

Bounded equal-width bins for numeric distributions.

Why add it: Grouping by an existing key cannot bucket continuous values.

```typescript
histogram(value: readonly number[] | null | undefined, bins=5): HistogramBin[]
```

Invalid input: `[]`. No locale argument.

```html
{{ [0,1,2,3] | histogram: 2 }}
```

## percentageChange

Signed percentage change from a nonzero baseline.

Why add it: PercentPipe formats a ratio but does not compute change.

```typescript
percentageChange(value: number | null | undefined, baseline: number): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ 120 | percentageChange: 100 }}
```
