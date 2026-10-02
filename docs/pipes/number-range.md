# numberRange

Finite ordered endpoints with Intl number options including currency/unit. Equal endpoints collapse before rounding. Distinct endpoints that round equally retain native approximate-range semantics. Unsupported runtimes join formatted endpoints with an en dash; no localized output parsing.

## Standalone usage

```ts
import { NumberRangePipe } from 'extra-pipe';
// In your standalone component: imports: [NumberRangePipe]
```

Template:

```html
{{ 10 | numberRange: 25: {style: 'currency', currency: 'EUR'}: 'fr' }}
```

Part of the unreleased 1.2 preview. Existing APIs remain available.
