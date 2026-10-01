# numbers toolbox — 1.2 preview

8 distinct standalone pipes. Helpers are exported with their adapters. None are published yet.

See [shared contracts](../PIPE-101-CONTRACTS.md) for own-data/readonly input, invalid results, bounds and locale rules.

## clamp

Constrain numeric display values to explicit bounds.

Why add it: Angular provides no bounds operation.

```typescript
clamp(value: number | null | undefined, minimum: number, maximum: number): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ 120 | clamp: 0: 100 }}
```

## roundTo

Numeric decimal-place rounding with signed precision.

Why add it: Legacy roundHalf is a fixed two-decimal display behavior.

```typescript
roundTo(value: number | null | undefined, precision=0): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ 12.345 | roundTo: 2 }}
```

## roundToStep

Round to increments and optional origin.

Why add it: Decimal places cannot express quarter-unit or custom increments.

```typescript
roundToStep(value: number | null | undefined, step: number, origin=0): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ 7.6 | roundToStep: 0.5 }}
```

## ratio

Compute a finite quotient with an explicit nonzero divisor.

Why add it: Angular number formatting is not safe quotient calculation.

```typescript
ratio(value: number | null | undefined, divisor: number): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ 3 | ratio: 2 }}
```

## pluralCategory

Expose Intl cardinal/ordinal category for custom presentation.

Why add it: I18nPluralPipe maps categories to supplied strings rather than exposing the category.

```typescript
pluralCategory(value: number | null | undefined, kind: PluralKind='cardinal', locale='en-US'): string
```

Invalid input: `""`. Injected LOCALE_ID; optional override.

```html
{{ 2 | pluralCategory: "cardinal" }}
```

## formatFraction

Approximate finite values as localized bounded-denominator fractions.

Why add it: Number formatting does not produce rational numerator/denominator text.

```typescript
formatFraction(value: number | null | undefined, maximumDenominator=100, locale='en-US'): string
```

Invalid input: `""`. Injected LOCALE_ID; optional override.

```html
{{ 1.5 | formatFraction: 100 }}
```

## basisPoints

Display decimal ratios as basis points, without financial advice.

Why add it: PercentPipe displays percent, not basis points.

```typescript
basisPoints(value: number | null | undefined, maximumFractionDigits=2, locale='en-US'): string
```

Invalid input: `""`. Injected LOCALE_ID; optional override.

```html
{{ 0.0125 | basisPoints }}
```

## numberBase

Display safe integers or bigint in bases 2–36.

Why add it: DecimalPipe does not format binary/hexadecimal integers.

```typescript
numberBase(value: number | bigint | null | undefined, radix=16): string
```

Invalid input: `""`. No locale argument.

```html
{{ 255 | numberBase: 16 }}
```
