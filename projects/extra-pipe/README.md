# extra-pipe

A focused collection of standalone Angular 20–22 pipes for display formatting, localization, text, and template-friendly data presentation.

```bash
npm install extra-pipe
```

```ts
import { Component } from '@angular/core';
import { CompactNumberPipe, TruncatePipe } from 'extra-pipe';

@Component({
  standalone: true,
  imports: [CompactNumberPipe, TruncatePipe],
  template: `
    {{ views | compactNumber }}
    {{ description | truncate: 80 }}
  `,
})
export class ProductSummaryComponent {
  views = 12500;
  description = 'Thoughtful interfaces, without repeated formatting code.';
}
```

Pipes are standalone and belong in a component's `imports` array. The 2.0.0 release candidate supports Angular 20 through 22 (`>=20 <23`), using Angular 20 partial compilation. Installation retrieves the published 1.x package until 2.0.0 is separately published. The library includes:

- `compactNumber`, `formatDuration`, and caller-controlled `relativeTime`
- Unicode-safe `truncate`, `initials`, and configurable `mask`
- Canonical 2.0 names: `localizedDate`, `fileSize`, `roundHalf`, and `camelCaseToTitleSeparatedCase`; obsolete aliases are removed.

These display pipes are pure and return an empty string for invalid input. The formatting pipes use Angular's `LOCALE_ID`; text pipes are grapheme-safe without a locale parameter. The complete API reference, compatibility notes, and runnable demo instructions are in the [repository README](https://github.com/yovi-labs/extra-pipe#readme).

## Extra Pipe 2.0.0

Sprint 2 expands the catalogue to **101 canonical standalone pipes**
(100+), without compatibility pipe aliases. This candidate is versioned 2.0.0,
but is not yet published to npm. It adds 12 text, 17 collection, eight
object, 12 metric, eight number/localization and ten UTC calendar pipes on top
of the previous 34. Each new selector has a pure adapter, typed helper, documented
invalid contract and frozen-input tests. See the repository's shared
[101 contracts](https://github.com/yovi-labs/extra-pipe/blob/develop/docs/PIPE-101-CONTRACTS.md)
and domain references for signatures, defaults and live website examples.

Review-stage additions: listFormat, formatUnit, displayName, dateRange, numberRange,
byteSize, truncateMiddle, slugify, groupBy, orderBy and uniqueBy. They are not yet
available in the published npm release. Their typed functions/options are also
exported. Superseded selectors/classes are removed in 2.0; collections are readonly
inputs and pure pipes require replacement references when data changes.

[Review 2.0 migration notes](https://github.com/yovi-labs/extra-pipe/blob/develop/docs/MIGRATION-2.0.md)
[Follow Sprint 2 delivery](https://github.com/yovi-labs/extra-pipe/milestone/1)

## License

MIT
