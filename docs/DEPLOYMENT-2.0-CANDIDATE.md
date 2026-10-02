# Extra Pipe 2.0.0 — deployment candidate

Prepared on 2026-10-02 from `develop`
`706d71415b95c8114566a207d1b9cc322759be8d` on the existing approved
`release/2.0.0` branch. No new version is invented: 2.0.0 has not been published.

## Changes and review scope

- [PR #101](https://github.com/yovi-labs/extra-pipe/pull/101) placed the versioned
  2.0.0 library baseline on `main`.
- [PR #104](https://github.com/yovi-labs/extra-pipe/pull/104) added the reviewed
  logo, install-first dark homepage, responsive layouts, accessible buttons,
  finite CSS motion and clipboard-state corrections to `develop`.
- [PR #102](https://github.com/yovi-labs/extra-pipe/pull/102) synchronized the
  release baseline back into `develop`.
- This candidate brings the approved website work forward for review into
  `main`, corrects outdated Angular 17/1.2 deployment instructions and records
  fresh verification. No library API or dependency changes are introduced.

The recheck covers the integrated release configuration, current website changes,
architecture boundaries, pure-pipe inventory, bounded JSON execution, package
surface and static response policy. It is not a certification that all code is
bug-free or a penetration test. The Angular team's `angular-developer` guidance
informed the pure-function/pipe and prerendering review; no framework upgrade or
new abstraction was necessary.

## Fresh local verification

- Full library, website and scripts lint; architecture boundaries: pass.
- Library: 330 Chrome-headless tests; 97.86% lines / 91.32% branches; all six
  transformation-module floors pass.
- Website: 37 tests; 96.75% lines / 89.29% branches.
- `npm run build:vercel`: pass, including partial library compilation, package
  dry-run, clean website installation of the archive, tests, production static
  build and five response-security checks. 111 routes prerendered.
- Seven brand/contrast/motion/layout/button checks pass. Together with the five
  response-security checks, twelve policy checks pass.
- Packed declaration inventory: 101 canonical pure standalone pipes, no package
  aliases, 67 new reusable functions; all 101 actual website snippets generated
  for the clean-consumer CI jobs.
- Root and website dependency audits: zero known vulnerabilities at this check.
- Workspace/library manifests remain 2.0.0; Angular peers remain `>=20 <23`;
  library compiler Angular 20.3, website Angular 22, tooling Node 24.15+.
- Clean Angular 22.2.1 consumer: archive installation, all 101 actual standalone
  snippets and the single-pipe tree-shaking check pass. All-pipe JS: 182,737 bytes;
  single-pipe JS: 93,970 bytes. Other supported versions are rerun by release CI.
- Three fresh mobile Lighthouse runs: performance 99, accessibility 100, best
  practices 100; median LCP 1.661s, TBT 2ms, CLS zero. Local lab data only; SEO 69
  reflects the intentional preview/noindex setting.
- Production indexing rehearsal using the reserved `https://example.invalid`
  test origin: canonical home, indexable metadata, robots/sitemap with 104
  canonical pages and noindex 404 pass. This is not an actual production URL.
  Preview output was rebuilt afterward with indexing disabled.

## Prepared Vercel project

The owner requested a new project. An empty
[extra-pipe project](https://vercel.com/anas-mastis-projects/extra-pipe) was created
in the signed-in **Anas Masti's projects / Hobby** account. No deployment,
analytics, paid upgrade, additional permission grant or Git connection was made.
Saved settings match `vercel.json`: Other framework, repository root, Node 24.x,
`npm ci --ignore-scripts`, `npm run build:vercel`, and
`projects/test-app/dist/extra-pipe-website/browser`. On-demand concurrent builds
remain disabled; privacy and deployment protection were not changed.

The current bundle is 285.55kB raw / 78.60kB estimated transfer: the existing
250kB warning is exceeded, but the unchanged 350kB hard limit passes. It is a
non-blocking optimization follow-up, not grounds to raise the budget.

## Before deployment

- [ ] Release follow-up PR reviewed into `main`, current-head seven-job CI green,
  and review conversations resolved. Earlier runs do not certify a new head.
- [x] New empty Vercel destination created and static build settings saved.
- [ ] Owner confirms personal/non-commercial Hobby eligibility and actual
  production origin; connect the exact `yovi-labs/extra-pipe` repository without
  granting additional access or triggering unapproved production deployment.
  The connector exposes no teams; the signed-in website was used for setup.
- [ ] Resolve package/website publication alignment. `npm view extra-pipe`
  reports **1.0.5** and `extra-pipe@2.0.0` returns 404 at this checkpoint. A plain
  install does not provide the new catalogue; do not advertise it as published.
- [ ] Build the final artifact with the verified HTTPS origin and correct
  preview/production indexing context. Never promote noindex output blindly.
- [ ] Verify the deployed URL, all route/alias behavior, real 404, cache/security
  headers, canonical/robots/sitemap, copy controls, locales, immutable items and
  browser errors. Repeat performance measurements on the deployed site.
- [ ] Record the previous healthy deployment and rollback target before changing
  a production alias. Keep preview access protection and all credentials intact.

The build is static: no backend, database, paid add-on, custom domain purchase or
analytics is required. Free Hobby is limited to personal non-commercial use;
confirm eligibility rather than bypassing account/repository restrictions.
See [Vercel Hobby](https://vercel.com/docs/plans/hobby) and the
[deployment runbook](VERCEL-DEPLOYMENT.md).

Preparation does not authorize npm publication, tag creation, GitHub Release
publication, paid resources or production deployment. The existing
[website review](WEBSITE_REVIEW.md) records known non-blocking playground-copy
and bundle follow-ups. Machine-specific scratch QA files stay outside commits.
