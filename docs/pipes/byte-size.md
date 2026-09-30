# byteSize

Nonnegative finite byte count. Decimal SI (`base:1000`) default, binary IEC (`base:1024`) optional. `maximumFractionDigits` defaults to 2, accepts integer 0–20. Promotes rounded boundaries and caps at YB/YiB. Localizes the number, retains standard unit symbols. Legacy filesize/fileSize are unchanged.

## Standalone usage

```ts
import { ByteSizePipe } from 'extra-pipe';
// In your standalone component: imports: [ByteSizePipe]
```

Template:

```html
{{ 1048576 | byteSize: {base: 1024}: 'fr' }}
```

Part of the unreleased 1.2 preview. Existing APIs remain available.
