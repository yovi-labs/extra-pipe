# Contributing to Extra Pipe

This branch targets the unpublished **2.0.0** major release: Angular 20–22, 101 canonical pure standalone pipes, no package aliases. Read [the migration guide](docs/MIGRATION-2.0.md) before changing existing behavior. npm's published 1.x package is a different release.

## Setup

Use Node 24.15+ (major 24) and the lockfiles. From the repository root:

```sh
npm ci
npm run build:lib
npm run prepare:website
npm run start:website
```

The root compiles the library with Angular 20.3 partial compilation. `projects/test-app` is an isolated Angular 22 documentation/playground application and installs the packed local library. Do not copy root framework dependencies into the website or upgrade the library compiler beyond the minimum supported Angular major. Do not commit dependencies, generated output, coverage or `.artifacts`.

## Domain architecture

`projects/extra-pipe/src/lib/domains` contains `text`, `collections`, `objects`, `metrics`, `numbers`, `dates` and `display`. Each domain owns its pipes, types, transformations and tests. Its `index.ts` statically exports the public surface; `src/public-api.ts` assembles the domain barrels. Import consumers from `extra-pipe`, never undocumented deep paths.

Pure transformations may use `lib/internal` validation/Intl helpers, but never Angular decorators, website code or pipe classes. Internal helpers do not depend on domains. Pipe classes adapt typed functions with explicit static `@Pipe` metadata; avoid runtime factories, generic base classes or inheritance merely to remove a few declarative lines. Keep reusable logic in small named functions rather than duplicate implementations or all-purpose utility modules. `npm run check:architecture` enforces these boundaries.

## Adding or changing a pipe

1. Agree on a useful, distinct developer use case and ticket. Angular built-ins, aliases and helper functions do not count as additional canonical pipes. Inventory intentionally fails if the agreed 101-pipe scope changes without review.
2. Define typed readonly input/output contracts, parameter order/defaults, invalid behavior, equality/order, bounds, locale behavior and time-zone semantics before implementation. Use descriptive camelCase selectors and matching PascalCase classes. Do not introduce spelling aliases in 2.0.
3. Implement a domain-owned pure function when it is genuinely reusable, and a thin pure standalone pipe. Locale-aware pipes use injected `LOCALE_ID` plus an explicit override. No timers, input mutation, sanitizer trust bypasses or unbounded global caches. Object traversal reads own data fields without invoking getters or following prototypes.
4. Add independent expected-value tests, null/invalid and boundary cases, Unicode combining marks/emoji, English/French/Arabic where applicable, negative/rounding behavior, immutable inputs and typed consumer usage. Keep deliberate legacy contracts unless a separately documented change is approved. `lib/testing/immutable-test-inputs.ts` supports snapshots including Maps and Sets; snapshots must detect mutation, not simply stringify it away.
5. Update the matching `projects/test-app/src/app/data/examples/<domain>.examples.ts` entry. It owns the description, contract, standalone template, display mode, sample data, ordered parameter names, locale position and component context. Data modules must not import executable pipe code.
6. Update the matching playground domain adapter. `adapt` validates argument tuples with typed guards; `pipe-adapters.ts` is an exhaustive selector whitelist. Do not use `as never`, `any`, eval, dynamic imports driven by user input or arbitrary Angular template compilation. Add independent expected playground output tests, not expectations derived from the production example.
7. Update API/migration/security docs as applicable, then verify the archive and exact standalone snippets. Never include documentation aliases, source tests or website bundles in the published library.

## Verification before review

```sh
npm run lint
npm run test:ci
npm run check:coverage
npm run build:lib
npm run check:package
npm run check:inventory
npm run check:architecture
npm run check:examples
npm run prepare:website
npm run test:website
npm run build:website
npm run check:security
npm run check:performance
```

Chrome must be available for library tests. Consumer CI builds clean Angular **20.0**, latest 20, 21 and 22 applications using the same packed archive, including the website's actual 101 copyable standalone components. Angular 22 also verifies a single-pipe bundle excludes unused catalog code. Website tests run with coverage; library global floors remain 90% lines/80% branches and the six new domain transformation modules have stronger 95%/90% gates. Record performance distributions and environment, not a single best run or cross-machine timing claims.

Run `npm audit` for both lockfiles; do not force major upgrades to hide advisories. Browser review includes desktop/320 px reflow, keyboard focus, Arabic direction, copy success/failure, null/error/reset recovery, immutable add-item behavior and console/security-policy errors. Preserve theme contrast and 44 px controls. Follow [the website identity guide](docs/BRANDING.md) and run `node --test scripts/website-brand.test.mjs` when changing colors or the logo. Scores are evidence, not a WCAG certification.

On this Windows machine, Application Control blocks Angular 22's native parser. Do not bypass the policy, patch the loader or disable security software. Verify builds in Linux CI and use its approved static artifact for local browser review. State which checks are blocked; never claim a historical artifact validates new changes.

## Git and release workflow

Use a ticket-linked `feat/<issue-number>-<short-name>` branch from the latest `develop` and a PR targeting `develop`. Commit conventionally, keep work scoped and request human review. If integrating unmerged owned prerequisites, disclose them and provide an incremental comparison; keep the PR draft until prerequisite review and current-head CI pass. Do not merge or close existing PRs on behalf of the reviewer.

After review, release separately through `release/2.0.0` into `main`, then tag/release the exact approved version and synchronize `main` back into `develop`. **Do not publish this preview archive with its intentionally unchanged 1.1.0 manifests.** Publishing, tagging and deployment require explicit release authorization and current-head verification. MIT licensing remains unchanged.
