# slugify

Preserves Unicode letters, numbers and combining marks; normalizes NFC and lowercases by default. Optional Latin accent folding is not general transliteration. Separators are `-` (default) or `_`. Output is not a uniqueness guarantee, URL sanitizer or HTML sanitizer; encode URL path segments appropriately.

## Standalone usage

```ts
import { SlugifyPipe } from 'extra-pipe';
// In your standalone component: imports: [SlugifyPipe]
```

Template:

```html
{{ 'Café & Angular tools' | slugify: {foldLatinAccents: true} }}
```

Part of the unreleased 1.2 preview. Existing APIs remain available.
