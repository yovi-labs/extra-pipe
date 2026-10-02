# Extra Pipe 2.0 review and release gates

Sprint 2 targets **2.0.0**, not an additive 1.2 release. Angular peers are `>=20.0.0 <23.0.0`; the library compiler remains Angular 20.3 and the website is isolated Angular 22. MIT licensing is unchanged. No production deployment, merge, tag or publication is authorized by this implementation task.

## Review sequence

Existing feature PRs remain unmerged and untouched. New ticket branches start from actual `develop` and explicitly integrate owned prerequisites for a working review surface. They remain draft until prerequisite review and current-head checks pass. Review incrementally, not as one undifferentiated full-stack diff:

| Ticket | Change | Draft PR |
| --- | --- | --- |
| #89 | Angular 20–22 platform, modern lint/tooling, audit baseline | #95 |
| #90 | Domain organization, canonical names, pure collections, shared tests | #96 |
| #91 | Single typed registry for documentation and playground samples | #97 |
| #92 | Exhaustive checked JSON adapters, adversarial tests, dependency audits | #98 |
| #93 | Indexed search, accessible parameter/error help, benchmarks | #99 |
| #94 | Contributor guide, architecture gate, actual snippet compilation, coverage | Current contributor-verification branch |

Each PR links its prerequisite comparison. Do not merge prerequisites automatically, rewrite other contributors' branches, close old PRs, or reuse historical green checks as current-head evidence.

## Evidence at the implementation checkpoint

- Local Chrome-headless library: **330/330**; lines **97.86%**, branches **91.32%**, functions **100%**. All six transformation-module gates passed. Full lint, Angular partial production build, source/packed inventory and archive inspection passed.
- Exactly **101 canonical pure standalone pipes**, no package aliases. The archive contains seven files, no tests, website, private data or deep export surface. Packaging must be rerun after documentation changes.
- Root and website lockfiles: **zero known npm advisories** on 2026-10-02, including development dependencies. Recheck at release; this is not proof of perfect security.
- PR #95 head `658e610`, #96 head `a2a1e80`, #97 head `1d6b0a7`, and #98 head `da6aabf`: all seven Linux jobs passed. PR #98 includes **25 website tests**, Angular 20.0/latest 20/21/22 packed-consumer builds, static production/security checks and three-run mobile Lighthouse.
- All **101 actual copyable website components** compiled locally with Angular 20.3 strict template checking. This found and fixed three nested-object interpolation defects missed by the separate compatibility fixtures. CI now compiles these exact snippets in every clean consumer.
- New #93/#94 changes still require their own current-head CI and manual browser checks. Local Windows Application Control blocks Angular 22's native parser. GitHub API rate limiting currently prevents programmatic artifact retrieval. Do not bypass either constraint or claim old browser screenshots validate new code.

## Required before marking ready

- [ ] Human review of prerequisite feature work, then each focused refactor.
- [ ] Current-head full lint, Chrome coverage and module floors, partial build, package dry-run/archive, 101 inventory and architecture checks.
- [ ] Current-head website tests with uploaded coverage, static production build and security-policy tests.
- [ ] Current-head actual-snippet builds on Angular 20.0/latest 20/21/22; Angular 22 unused-domain tree-shaking check.
- [ ] Three controlled mobile Lighthouse runs, median performance ≥90; preserve all reports and bundle hard cap. No fabricated deployed-site metrics.
- [ ] Browser checks against the exact CI artifact: desktop/320 px reflow, keyboard focus/navigation, Arabic direction, copy feedback, null/error/reset states, immutable add-item output and error-free console/CSP.
- [ ] Review migration behavior, deprecated-name removal, date/locale semantics, JSON-only execution and sanitizer warnings.
- [ ] Update Sprint 2 Notion with final heads, CI links, evidence and any outstanding gates.

## Release is separate

Only after review create `release/2.0.0` from integrated `develop`, set all release manifests/changelog to the exact version, regenerate/verify the archive and open a release PR into `main`. Merge only after authorization and current-head CI. Tag/release exactly `2.0.0`, publish that verified archive only after explicit authorization/authentication, and synchronize `main` back to `develop`.

**The current manifests intentionally still say 1.1.0. Never publish this breaking preview under that version.** Legacy release checklists and verification reports are historical records superseded for the 2.0 workflow by this document; they do not approve a release or deployment.
