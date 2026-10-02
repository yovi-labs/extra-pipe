# Website review — 2026-10-02

Scope: issue #103's website identity, install-first homepage, dark theme, responsive layout, motion and shared buttons. This is not a new audit of every library implementation or an authorization to publish/deploy.

## Review and corrections

Reviewed using the Angular team's `angular-developer` guidance, revision `cfb0e3603dfacdda1cafd66d98a071459fa2187a`. The website stays on Angular 22 with standalone imports, OnPush components, component-scoped homepage CSS, lazy routes and prerendering. The library remains Angular 20. No new runtime dependency, animation provider, encapsulation bypass or HTML injection path.

- Fixed stale copy feedback: success/error state now resets with the code input through `linkedSignal`. Delayed clipboard completion cannot update feedback for a different snippet. Regression tests cover input changes and both delayed success and failure.
- Fixed invisible compact copy failures: the install bar now exposes failure text visually as well as through its existing live region, and clears it for new code. Clipboard access remains click-triggered; failure is caught without executing or interpreting snippets.
- Removed duplicated clipboard setup/cleanup in tests. Clipboard mocks are restored after each test, including failed assertions.
- Confirmed one install-first homepage, real navigation destinations, decorative non-focusable SVG icons, reserved logo dimensions, stable copy-button width and unchanged library APIs.
- Native CSS entrance motion stays finite and transform-only, with immediately visible text and a static install command. Reduced-motion disables animation/transitions; forced-colors restores system colors/borders. No timers or scroll listeners were added.
- Shared theme/button rules remain global; homepage composition remains feature-owned. The wide layout grows without fixed-position footer overlays; catalogue/detail content keeps its readable width.

## Verification

- Full library, website and script lint; architecture boundaries: pass.
- Library: 330 Chrome-headless tests; 97.86% line coverage and 91.32% branch coverage. Transformation coverage gates pass.
- Website: 37 tests; 96.75% line coverage and 89.29% branch coverage.
- Production library and website builds: pass; 111 prerendered website routes.
- Package dry-run and inventory: library-only artifact with 101 canonical pipes, aligned declarations and documentation; no private/development files.
- Twelve contrast, SVG, motion, responsive/button and static-response security checks pass. Root and website dependency audits report zero known vulnerabilities at review time. These checks do not constitute a penetration-test certification.
- Fresh three-run mobile Lighthouse: performance 99, accessibility 100, best practices 100; median LCP 1.660s, total blocking time 2ms, CLS zero. Measurements are localhost lab results, not field data.
- Browser smoke tests cover install copying, keyboard focus, catalogue/example navigation and locale changes. Copying a live snippet then switching to French resets its button to Copy code and renders `12,5 k` with a non-breaking space. No captured console warnings/errors.
- Responsive checks during the UI iteration covered 320px, Full HD and ultra-wide displays: no page overflow, equal mobile action widths and correctly positioned footer. Viewport overrides were reset.

## Non-blocking follow-ups and release gates

- Initial website bundle is 285.55kB raw / 78.60kB estimated transfer. The existing 250kB warning budget is exceeded; the 350kB hard limit passes. Budgets were not raised.
- Malformed playground JSON is safely rejected for execution but its escaped text still appears in the copyable live-data snippet. Hide invalid snippets in a separate playground-DX change; this predates the homepage work.
- Keep intentional noindex and the unset production URL until an approved deployment/release aligns the documentation with the package actually available on npm. Removing internal preview prose does not publish new APIs.
- Current-head GitHub CI and unresolved-review-thread checks remain required before merging into `develop`. No version change, npm publication, production merge or deployment is included.
