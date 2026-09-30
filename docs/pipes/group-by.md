# groupBy

Readonly object arrays become ordered `{key, items}` groups. Encounter order and item identity are retained. Missing direct properties group under `undefined`. Map semantics make prototype-like keys safe. Invalid input returns `[]`.

## Standalone usage

```ts
import { GroupByPipe } from 'extra-pipe';
// In your standalone component: imports: [GroupByPipe]
```

Template:

```html
{{ items | groupBy: 'team' }}
```

Pure pipe: replace changed arrays/objects rather than mutating them. This API is
part of the unreleased 1.2 preview; existing selectors remain available.
