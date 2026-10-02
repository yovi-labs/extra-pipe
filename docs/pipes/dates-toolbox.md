# dates toolbox — 1.2 preview

10 distinct standalone pipes. Helpers are exported with their adapters. None are published yet.

See [shared contracts](../PIPE-101-CONTRACTS.md) for own-data/readonly input, invalid results, bounds and locale rules.

## dateParts

Structured Intl calendar fields for segmented date UI.

Why add it: DatePipe returns one formatted string rather than structured parts.

```typescript
dateParts(value: DateInput | null | undefined, timeZone='UTC', locale='en-US'): Intl.DateTimeFormatPart[]
```

Invalid input: `[]`. Injected LOCALE_ID; optional override.

```html
{{ "2026-01-02T12:00:00Z" | dateParts: "UTC" }}
```

## calendarDayDifference

Signed difference of UTC calendar dates, not 24-hour durations.

Why add it: RelativeTime describes a point relative to a clock, not calendar-day differences.

```typescript
calendarDayDifference(value: DateInput | null | undefined, end: DateInput): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ "2026-01-01T23:00:00Z" | calendarDayDifference: "2026-01-02T01:00:00Z" }}
```

## isWithinInterval

Inclusive timestamp interval membership.

Why add it: Angular has no date interval predicate.

```typescript
isWithinInterval(value: DateInput | null | undefined, start: DateInput, end: DateInput): boolean
```

Invalid input: `false`. No locale argument.

```html
{{ "2026-01-02T00:00:00Z" | isWithinInterval: "2026-01-01T00:00:00Z":
"2026-01-03T00:00:00Z" }}
```

## overlapDuration

Milliseconds shared by two half-open timestamp intervals.

Why add it: DateRange formats endpoints but does not compute overlap.

```typescript
overlapDuration(value: DateInput | null | undefined, end: DateInput, otherStart: DateInput, otherEnd: DateInput): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ "2026-01-01T00:00:00Z" | overlapDuration: "2026-01-01T02:00:00Z":
"2026-01-01T01:00:00Z": "2026-01-01T03:00:00Z" }}
```

## isoWeek

UTC ISO week-year and week number for reporting.

Why add it: DatePipe does not expose a typed ISO reporting period.

```typescript
isoWeek(value: DateInput | null | undefined): IsoWeekResult | null
```

Invalid input: `null`. No locale argument.

```html
{{ "2026-01-01T00:00:00Z" | isoWeek }}
```

## quarter

UTC quarter number for fiscal/calendar labels.

Why add it: Angular has no quarter calculation.

```typescript
quarter(value: DateInput | null | undefined): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ "2026-05-01T00:00:00Z" | quarter }}
```

## unixTimestamp

Floor epoch seconds, including pre-1970 values.

Why add it: DatePipe formats dates rather than returning Unix seconds.

```typescript
unixTimestamp(value: DateInput | null | undefined): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ "1970-01-01T00:00:01Z" | unixTimestamp }}
```

## dateBucket

UTC start-of-day/week/month/quarter/year for chart grouping.

Why add it: Date formatting does not normalize period boundaries.

```typescript
dateBucket(value: DateInput | null | undefined, unit: DateBucketUnit='day'): string
```

Invalid input: `""`. No locale argument.

```html
{{ "2026-05-15T12:30:00Z" | dateBucket: "month" }}
```

## businessDaysDifference

Signed UTC Mon–Fri day counts with caller-supplied holidays.

Why add it: No built-in business-calendar counting or hidden holiday data.

```typescript
businessDaysDifference(value: DateInput | null | undefined, end: DateInput, holidays: readonly DateInput[]=[]): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ "2026-01-02T00:00:00Z" | businessDaysDifference: "2026-01-05T00:00:00Z" }}
```

## dateSequence

Bounded inclusive UTC date sequences for calendars.

Why add it: Angular does not generate date sequences.

```typescript
dateSequence(value: DateInput | null | undefined, end: DateInput, stepDays=1): Date[]
```

Invalid input: `[]`. No locale argument.

```html
{{ "2026-01-01T00:00:00Z" | dateSequence: "2026-01-03T00:00:00Z": 1 }}
```
