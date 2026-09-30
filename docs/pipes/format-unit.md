# formatUnit

Formats a finite number with a sanctioned Intl simple or compound unit. This is presentation, not unit conversion. Options exclude `style`/`unit`; they cannot override the chosen unit. Nullish numbers, unsupported units or invalid options return `''`.

## Standalone usage

```ts
import { FormatUnitPipe } from 'extra-pipe';
// In your standalone component: imports: [FormatUnitPipe]
```

Template:

```html
{{ 12.5 | formatUnit: 'kilometer': {unitDisplay: 'long'}: 'fr' }}
```

Part of the unreleased 1.2 preview. Existing APIs remain available.
