# displayName

Intl display names for language, region, script, currency, calendar or dateTimeField codes. Options include style, fallback and languageDisplay. Default Intl fallback may return an unknown code; `fallback: 'none'` returns `''`. Malformed codes/options return `''`.

## Standalone usage

```ts
import { DisplayNamePipe } from 'extra-pipe';
// In your standalone component: imports: [DisplayNamePipe]
```

Template:

```html
{{ 'MA' | displayName: 'region': {}: 'ar' }}
```

Part of the unreleased 1.2 preview. Existing APIs remain available.
