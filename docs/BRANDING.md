# Extra Pipe website identity

The website uses an Angular-inspired magenta-to-violet palette and an original connected-pipeline monogram. A rounded upper pipe forms a **P**, while the three horizontal levels suggest an **E**: Extra Pipe in one connected silhouette. A broad lower outlet carries the flow onward. Two connected paths replace the earlier terminal-style operator and small plus detail. The silhouette works without the gradient. It is not Angular's logo and does not imply Angular endorsement. Direction reference: [Angular press kit](https://angular.dev/press-kit).

## Shared assets and tokens

`projects/test-app/public/extra-pipe-mark.svg` is the navigation mark and favicon. Its 64 × 64 viewBox uses consistent six-unit strokes and rounded pipe bends, remaining readable at 16 px; navigation reserves a 40 × 40 box to prevent layout shifts. The SVG has no fonts, external assets, scripts or animation. The home link supplies the accessible name, so the embedded image has empty alt text.

`projects/test-app/src/styles.css` owns the palette. The original logo and primary-button gradient stops remain `#bb005d`, `#8b20ca`, and `#5b21b6`. The dark canvas is `#191919`, with elevated `#242424` surfaces, light text and restrained borders. Heading text uses a separate, lighter gradient (`#ff73b5`, `#db9fff`, `#a9adff`) so every part remains readable against the dark canvas. Body copy, secondary actions, focus rings, tags and notices use solid colors. Do not use the subtle divider token as the sole boundary for form controls.

Text pairs target at least 4.5:1; control boundaries and focus rings target at least 3:1. `scripts/website-brand.test.mjs` checks the token pairs and 101 sRGB samples along each gradient segment: white text on the original button gradient, and lighter heading colors on all dark surfaces. These checks supplement, not replace, browser accessibility review. Forced-colors mode restores solid system colors for the headline and primary action; reduced-motion behavior remains in place.

## Copy and release status

The homepage leads with a compact, copyable **npm install extra-pipe** command, followed by a centered gradient headline, one short description and working exploration/example links. Three concise feature columns sit beneath a compatibility strip. Keep search and runnable examples in their existing catalogue/detail routes; do not create a second catalogue. Avoid count badges, repeated marketing sections, sprint/preview badges and publication paragraphs in the public interface. Package publication status belongs in release records, not repeated marketing copy. Do not change npm availability, version manifests or indexing policy as part of a visual refresh.

## Action styling

Use the shared `.button` base for navigation actions: 12px corners, aligned labels/icons, and at least 52px homepage targets (56px on wide screens). Primary uses the checked brand gradient, secondary uses the elevated surface with a clear control border, and ghost remains quiet until hover or keyboard focus. Decorative SVG icons have `aria-hidden="true"` and `focusable="false"`; the link text supplies the accessible name. Small copy buttons retain 44px targets and announce success, switching their copy icon to a check without changing their reserved width. At narrow sizes the homepage actions stack at equal widths. Keep keyboard outlines, reduced-motion opt-in transitions and forced-colors fallback intact.

## Verification

Run `node --test scripts/website-brand.test.mjs`, website lint and website tests, then build the static website. Check desktop and 320 px layouts, keyboard focus, logo loading, catalog/detail navigation, and browser console. CI runs the brand checks alongside the existing website, security and three-run mobile performance checks.
