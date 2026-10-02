# truncateMiddle

Length is a grapheme budget including the suffix (default ellipsis). Keeps both ends, assigning an odd spare character to the start. A suffix longer than the budget is itself clipped safely. Invalid inputs return `''`. Requires #31 for grapheme-safe older-runtime fallback.

## Standalone usage

```ts
import { TruncateMiddlePipe } from 'extra-pipe';
// In your standalone component: imports: [TruncateMiddlePipe]
```

Template:

```html
{{ 'long-report-final.pdf' | truncateMiddle: 14 }}
```

Part of the unreleased 1.2 preview. Existing APIs remain available.
