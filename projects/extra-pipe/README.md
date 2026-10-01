# extra-pipe

A focused collection of standalone Angular 17–22 pipes for display formatting, localization, text, and template-friendly data presentation.

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

Pipes are standalone and belong in a component's `imports` array. The package supports Angular 17 through 22. Version 1.1 adds:

- `compactNumber`, `formatDuration`, and caller-controlled `relativeTime`
- Unicode-safe `truncate`, `initials`, and configurable `mask`
- Compatibility aliases for `localized`, `fileSize`, `roundHalfUp`, and the corrected `camelCaseToTitleSeparatedCase`

These display pipes are pure and return an empty string for invalid input. The formatting pipes use Angular's `LOCALE_ID`; text pipes are grapheme-safe without a locale parameter. The complete API reference, compatibility notes, and runnable demo instructions are in the [repository README](https://github.com/yovi-labs/extra-pipe#readme).

## Planned 1.2 preview

Review-stage additions: listFormat, formatUnit, displayName, dateRange, numberRange,
byteSize, truncateMiddle, slugify, groupBy, orderBy and uniqueBy. They are not yet
available in the published npm release. Their typed functions/options are also
exported. Existing selectors and aliases are preserved; collections are readonly
inputs and pure pipes require replacement references when data changes.

[Review contracts and migration notes](https://github.com/yovi-labs/extra-pipe/blob/develop/docs/API-1.2.md)
[Follow Sprint 2 delivery](https://github.com/yovi-labs/extra-pipe/milestone/1)

## License

MIT
