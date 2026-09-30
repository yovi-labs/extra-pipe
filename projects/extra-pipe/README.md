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
export class ProductSummaryComponent {}
```

Pipes are standalone and belong in a component's `imports` array. The package supports Angular 17 through 22. Version 1.1 adds:

- `compactNumber`, `formatDuration`, and caller-controlled `relativeTime`
- Unicode-safe `truncate`, `initials`, and configurable `mask`
- Compatibility aliases for `localized`, `fileSize`, `roundHalfUp`, and the corrected `camelCaseToTitleSeparatedCase`

All new display pipes are pure, locale-aware through Angular's `LOCALE_ID`, and return an empty string for invalid input. The complete API reference, compatibility notes, and runnable demo instructions are in the [repository README](https://github.com/yovi-labs/extra-pipe#readme).

## License

MIT
