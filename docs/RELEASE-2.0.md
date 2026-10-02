# Extra Pipe 2.0.0 release candidate

Prepared on 2026-10-02 from integrated `develop` commit
`b76c2ce11321010d6d9fd9fe00192bed290d39f3`, through `release/2.0.0` into `main`.
The owner requested the version 2 merge. This does not authorize npm publication,
tagging, a public GitHub Release or website deployment.

## Version and compatibility

- Workspace, lockfile and library manifests: **2.0.0**; the private website retains
  its independent 0.0.0 version.
- Exactly 101 canonical pure standalone pipes; compatibility aliases are removed.
- Angular peers `>=20.0.0 <23.0.0`; Angular 20.3 partial library compilation;
  isolated Angular 22 website; Node 24.15+ contributor tooling.
- MIT license unchanged. Read [MIGRATION-2.0.md](MIGRATION-2.0.md) before upgrading.
- The website intentionally retains preview/noindex labels until publication and
  a separately verified production deployment. npm still serves the published 1.x
  package; no npm availability claim is made for this candidate.

## Integrated baseline evidence

[Post-merge develop verification](https://github.com/yovi-labs/extra-pipe/actions/runs/37030172140)
passed all seven jobs: library tests/coverage/lint/package/architecture, website
tests/static build/security, four packed consumers and three-run mobile Lighthouse.
This baseline does not replace checks on the versioned release head.

Local release-candidate checks on 2026-10-02 passed full lint, 330/330
Chrome-headless tests (97.86% lines, 91.32% branches, 100% functions), all six
module coverage floors, the Angular partial production build, architecture,
actual-snippet generation and the 101-pipe source/packed inventory. Root and
website lockfile audits reported zero known advisories. The dry-run package
contained seven files at version 2.0.0 with Angular peers >=20 <23; no private,
test or website files were included. Final release-head CI and artifact browser
checks are recorded on the release PR after the commit is created.

## Release-head gates

- [ ] Full lint, 330 library tests with coverage, module floors and production build.
- [ ] Package dry-run and archive inspection: exact 2.0.0 version, peers, license,
  101 exported pipes, no private/test/website files.
- [ ] Website tests with coverage, static production/security checks.
- [ ] Actual 101 copyable snippets built in Angular 20.0/latest 20/21/22 consumers;
  Angular 22 tree-shaking check.
- [ ] Three-run mobile Lighthouse with all reports retained and unchanged budgets.
- [ ] Manual exact-artifact desktop/320px, keyboard, Arabic, copy/reset/error,
  immutable-item and console/security-policy checks.
- [ ] Human release review, resolved conversations and current-head CI before merge.
- [ ] Synchronization PR from `main` into `develop` after the authorized merge.

Windows Application Control blocks the local Angular 22 native parser. Do not
bypass that policy; use Linux CI and its verified static artifact for browser checks.
Remaining gates must be reported rather than checked based on historical evidence.

## Separate publication

After merge and explicit release authorization, verify the exact merged commit,
create tag/release `2.0.0` and publish its verified archive with valid npm
authentication. Recheck npm version availability beforehand. No release, tag,
publication, paid resource or deployment is performed by this preparation.
