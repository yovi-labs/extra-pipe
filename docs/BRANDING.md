# Extra Pipe website identity

The website uses an Angular-inspired magenta-to-violet palette and an original connected-pipeline monogram. A rounded upper pipe forms a **P**, while the three horizontal levels suggest an **E**: Extra Pipe in one connected silhouette. A broad lower outlet carries the flow onward. Two connected paths replace the earlier terminal-style operator and small plus detail. The silhouette works without the gradient. It is not Angular's logo and does not imply Angular endorsement. Direction reference: [Angular press kit](https://angular.dev/press-kit).

## Shared assets and tokens

`projects/test-app/public/extra-pipe-mark.svg` is the navigation mark and favicon. Its 64 × 64 viewBox uses consistent six-unit strokes and rounded pipe bends, remaining readable at 16 px; navigation reserves a 40 × 40 box to prevent layout shifts. The SVG has no fonts, external assets, scripts or animation. The home link supplies the accessible name, so the embedded image has empty alt text.

`projects/test-app/src/styles.css` owns the palette. The gradient stops are `#bb005d`, `#8b20ca`, and `#5b21b6`. Use the gradient sparingly: the main action, large headline and logo. Body copy, secondary actions, focus rings, tags and notices use solid colors. Keep backgrounds light and neutral. Do not use the pale border token as the sole boundary for form controls.

Text pairs target at least 4.5:1; control boundaries and focus rings target at least 3:1. `scripts/website-brand.test.mjs` checks the token pairs and 101 sRGB samples along each gradient segment against white button text and the headline's light backgrounds. These checks supplement, not replace, browser accessibility review. Forced-colors mode restores solid system colors for the headline and primary action; reduced-motion behavior remains in place.

## Copy and release status

The homepage advertises **100+ standalone Angular pipes**, with Angular compatibility and licensing alongside it. Avoid internal count qualifiers such as “101 in this preview.” Publication status remains a separate plain-language note and per-pipe labels until the package is actually published. Do not change npm availability, version manifests or indexing policy as part of a cosmetic refresh.

## Verification

Run `node --test scripts/website-brand.test.mjs`, website lint and website tests, then build the static website. Check desktop and 320 px layouts, keyboard focus, logo loading, catalog/detail navigation, and browser console. CI runs the brand checks alongside the existing website, security and three-run mobile performance checks.
