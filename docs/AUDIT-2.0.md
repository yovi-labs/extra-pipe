# Extra Pipe 2.0 audit and decisions

Approved target: **2.0.0**, Sprint 2, Angular **20–22**, 101 canonical pipes.
This is implementation evidence, not a release or a completed security certification.

## Baseline and review dependencies

The inspected integrated baseline is PR #88 at `36daf789ef76b77949f5697446f512c5f1cb15bb`.
Its 323 library tests, 21 website tests and nine CI jobs passed before this refactor.
Those results do not establish correctness of the new code.
PR #88 and its prerequisite PRs remain unmerged and unreviewed. Task branches start
at `develop` and explicitly integrate owned prerequisite commits. Do not promote
dependent draft PRs until prerequisite review, merge and current-head CI pass.

## Findings and work ownership

| Priority | Evidence / issue | Resolution owner |
| --- | --- | --- |
| High | Angular 17 workspace: 106 advisory packages, including high/critical tooling findings | #89/#92: supported compiler, remove unused dependencies, audit separately |
| High | Playground adapters use `as never`; parameter/locale maps drift independently | #91/#92: typed adapters and validated bounded input boundary |
| Medium | Catalog, samples, caveats, locale indexes and fixture examples repeat metadata | #91: domain example registries, compile actual generated examples |
| Medium | Six domain suites repeat snapshot/freeze helpers | #90: shared test-only helpers preserving independent expected results |
| Medium | Flat pipe/helper layout, inconsistent and misspelled public names | #90/#94: domain boundaries and explicit breaking migration |
| Medium | CI only linted the library; website/scripts had no mandatory lint step | #89/#94: full linting and script/architecture checks |
| Medium | Initial assets exceed retained 250kB warning; CI cold run scored 83 despite median 99 | #93: profile cold loads and interactions; retain all results and 350kB cap |
| Medium | Contribution guidance is only a paragraph; actual generated examples are not compiled | #94: contributor workflow, migration and packed snippet checks |

## Platform implementation (#89)

Library: Angular 20.3.33, CLI/build 20.3.37, ng-packagr 20.3.2, TypeScript 5.9.3.
Website: separate Angular 22 lockfile and compiler. Node 24.15+ is required by the
workspace; local checks use Node 24.21.0. Peers are `>=20.0.0 <23.0.0`.
Published manifests deliberately keep their existing version until `release/2.0.0`;
**never publish this local preview archive as 1.1.0**.

Removed the Angular 17 demo and unused animations/forms/router and legacy
commitizen/lint dependencies. Git history retains the removed demo. The previous
local dependency tree/lockfile is recoverably backed up in ignored `.artifacts`.
Switched Karma to Angular's esbuild-backed builder, removing unused webpack dev
server/middleware dependencies rather than overriding unrelated major versions.
Scoped `@angular/build`'s Piscina override to patched 5.3.2 (same major), because
20.3.37 pins vulnerable 5.2.0. Revalidate/removal of this override is required when
upstream updates it; no private patches or forced installation were used.

Constructor injection stays supported for direct programmatic pipe use. The
library-scoped prefer-inject lint exception is intentional, not a general disabled
type-safety rule. Website and scripts now pass the same mandatory lint command.

Initial migrated checks: 323/323 Chrome-headless tests passed; lines 97.64%,
branches 91.05%, functions 100%, unchanged coverage gates. Root dependency audit
reported zero advisories after the esbuild migration/Piscina remediation. These
counts must be rerun on the final head, separately from website and packed runtime.

Angular 20 now emits a bundled `index.d.ts`; package/inventory checks resolve the
actual `exports['.'].types` instead of assuming an older declaration layout. The
archive inspection passed (7 files, 73,504 bytes) and verified all 101 canonical
pipes plus the four aliases pending task #90. The migration alone removes no APIs.
Local Angular 22 website tests/build are currently blocked by Windows Application
Control refusing Angular's native oxc-parser binding. This happens before website
compilation and is not a pipe error. No security policy was bypassed. Linux CI must
verify the changed head; previous website results are not reused as a pass.

## Library cleanup implementation (#90)

Moved 101 canonical static adapters into domain-owned pipe folders, grouped the
six transformation modules with their tests and split public types by domain.
Consolidated six snapshot/freeze implementations into test-only utilities that
preserve nested Maps/Sets/undefined and avoid invoking getters. Number-to-words
language tables are shared typed module constants rather than reallocated for
each pipe instance; its legacy vocabulary and public conversion method remain.
There are no explicit `any` types in first-party TypeScript, and the lint rule is
no longer disabled. Corrected public names and removed aliases are enumerated in
MIGRATION-2.0.md. URL redirects are separate from package exports.

All 101 pipes are pure. The three previous impure adapters now require immutable
updates, verified with an Angular component fixture. Legacy key selection uses
own data fields only (no getters/inherited properties); exclusion now uses a Set,
retaining SameValueZero behavior with linear membership work. The existing
last-value/first-key-order deduplication semantics are preserved, not replaced by
uniqueBy's different retention ordering. These behavior changes are explicit in
the migration guide; other legacy invalid/locale/date behavior is unchanged.

Local verification: 330/330 Chrome-headless tests; 97.86% lines, 91.32% branches,
100% functions. Full lint, partial production build, all six module coverage gates
and source/packed 101-pipe inventory passed. Archive dry-run: 7 files, 69,672 bytes;
no tests, website or private files. This is not a published 2.0 artifact.

## Remaining gates

Typed registries, security adversarial tests, contributor docs and final
consumer/browser/performance evidence belong to separate tasks #91–94. Angular 20 LTS ends 2026-11-28; future support changes are
deliberate, not automatically inherited from upstream. No API beyond Angular 20 is
permitted in library code. See https://angular.dev/reference/releases and
https://angular.dev/reference/versions.

Owner review, current-head CI, deployed-site checks, free hosting eligibility and
separate release/publication authorization remain mandatory. No claim of a full
manual line-by-line audit or public deployment is made at this stage.
