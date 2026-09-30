# dateRange

Formats ordered Date, epoch-millisecond or parseable string endpoints. Equal timestamps collapse. Explicit timezone recommended; dates are cloned. Reversed/nullish/invalid inputs and invalid options return `''`. Missing native formatRange falls back to two formatted endpoints separated by an en dash.

## Standalone usage

```ts
import { DateRangePipe } from 'extra-pipe';
// In your standalone component: imports: [DateRangePipe]
```

Template:

```html
{{ start | dateRange: end: {dateStyle: 'medium', timeZone: 'UTC'}: 'fr' }}
```

Part of the unreleased 1.2 preview. Existing APIs remain available.
