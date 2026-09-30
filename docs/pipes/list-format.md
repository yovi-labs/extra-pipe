# listFormat

Formats readonly string lists using Intl conjunction, disjunction or unit grammar. Options: `type` and `style`. Rejects non-string members and invalid options with `''`; empty list returns `''`. Does not mutate input.

## Standalone usage

```ts
import { ListFormatPipe } from 'extra-pipe';
// In your standalone component: imports: [ListFormatPipe]
```

Template:

```html
{{ ['Angular', 'TypeScript', 'Extra Pipe'] | listFormat: {type: 'conjunction'}:
'fr' }}
```

Part of the unreleased 1.2 preview. Existing APIs remain available.
