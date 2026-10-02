# orderBy

Readonly arrays; stable ascending/default or descending sort by a direct key. Finite numbers compare numerically, strings use numeric locale collation. Mixed numbers/strings form number-then-string type groups in ascending order (reversed for descending); missing/invalid keys are always last. Returns a new array retaining item identity.

## Standalone usage

```ts
import { OrderByPipe } from 'extra-pipe';
// In your standalone component: imports: [OrderByPipe]
```

Template:

```html
{{ items | orderBy: 'name': 'asc': 'fr' }}
```

Pure pipe: replace changed arrays/objects rather than mutating them. This API is
part of the unreleased 1.2 preview; existing selectors remain available.
