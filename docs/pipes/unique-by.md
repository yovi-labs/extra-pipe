# uniqueBy

Readonly object arrays; retain `first` by default or `last` explicitly. Retained items remain in source order and keep identity. Direct property keys use Map equality. Invalid input returns `[]`. This is additive and does not change the legacy deduplicate pipe.

## Standalone usage

```ts
import { UniqueByPipe } from 'extra-pipe';
// In your standalone component: imports: [UniqueByPipe]
```

Template:

```html
{{ items | uniqueBy: 'id': 'last' }}
```

Pure pipe: replace changed arrays/objects rather than mutating them. This API is
part of the unreleased 1.2 preview; existing selectors remain available.
