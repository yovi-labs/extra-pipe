# text toolbox — 1.2 preview

12 distinct standalone pipes. Helpers are exported with their adapters. None are published yet.

See [shared contracts](../PIPE-101-CONTRACTS.md) for own-data/readonly input, invalid results, bounds and locale rules.

## wordCount

Content word counters using locale segmentation.

Why add it: Angular has no word counter.

```typescript
wordCount(value: string | null | undefined, locale = 'en-US'): number | null
```

Invalid input: `null`. Injected LOCALE_ID; optional override.

```html
{{ "Hello world" | wordCount }}
```

## truncateWords

Article previews cut at word boundaries.

Why add it: Grapheme truncation does not preserve whole words.

```typescript
truncateWords(value: string | null | undefined, maximumWords = 20, suffix = '…', locale = 'en-US'): string
```

Invalid input: `""`. Injected LOCALE_ID; optional override.

```html
{{ "Hello brave world" | truncateWords: 2 }}
```

## wrapWords

Plain-text messages wrap to grapheme-bounded lines.

Why add it: Angular does not wrap generated text.

```typescript
wrapWords(value: string | null | undefined, maximumColumns = 80): string
```

Invalid input: `""`. No locale argument.

```html
{{ "one two three" | wrapWords: 7 }}
```

## readingTime

Localized article reading estimates.

Why add it: Duration formatting does not estimate time from content.

```typescript
readingTime(value: string | null | undefined, wordsPerMinute = 200, locale = 'en-US'): string
```

Invalid input: `""`. Injected LOCALE_ID; optional override.

```html
{{ "one two three" | readingTime: 200 }}
```

## normalizeWhitespace

Clean pasted labels without stripping markup.

Why add it: Angular casing/slice do not normalize whitespace.

```typescript
normalizeWhitespace(value: string | null | undefined): string
```

Invalid input: `""`. No locale argument.

```html
{{ " Ana\t Sam \n" | normalizeWhitespace }}
```

## stripDiacritics

Latin accent folding for search labels; preserve other scripts.

Why add it: Slugify additionally removes punctuation and changes case.

```typescript
stripDiacritics(value: string | null | undefined): string
```

Invalid input: `""`. No locale argument.

```html
{{ "Café عربي" | stripDiacritics }}
```

## excerpt

Show a grapheme-safe context window around a literal match.

Why add it: TruncateMiddle does not locate query context.

```typescript
excerpt(value: string | null | undefined, query: string, maximumLength = 80, suffix = '…'): string
```

Invalid input: `""`. No locale argument.

```html
{{ "zero one two three" | excerpt: "two": 12 }}
```

## highlightMatches

Structured literal search highlights, never HTML.

Why add it: Angular has no match-to-segments pipe.

```typescript
highlightMatches(value: string | null | undefined, query: string): MatchSegment[]
```

Invalid input: `[]`. No locale argument.

```html
{{ "Ana and Ana" | highlightMatches: "Ana" }}
```

## humanizeIdentifier

Readable acronym-aware API/schema labels.

Why add it: Legacy camel title splitting splits capitals, lacks acronym boundaries.

```typescript
humanizeIdentifier(value: string | null | undefined): string
```

Invalid input: `""`. No locale argument.

```html
{{ "XMLHttpRequest_id" | humanizeIdentifier }}
```

## escapeRegExp

Turn a search term into literal regex pattern text.

Why add it: Angular provides no literal regex escaping.

```typescript
escapeRegExp(value: string | null | undefined): string
```

Invalid input: `""`. No locale argument.

```html
{{ "a+b?" | escapeRegExp }}
```

## graphemeCount

User-visible character limits for multilingual fields.

Why add it: String length and SlicePipe count UTF-16 code units.

```typescript
graphemeCount(value: string | null | undefined): number | null
```

Invalid input: `null`. No locale argument.

```html
{{ "👩🏽‍💻é" | graphemeCount }}
```

## splitLines

Render pasted multiline content as readonly input rows.

Why add it: Angular has no line splitting pipe.

```typescript
splitLines(value: string | null | undefined): string[]
```

Invalid input: `[]`. No locale argument.

```html
{{ "one\r\ntwo\n" | splitLines }}
```
