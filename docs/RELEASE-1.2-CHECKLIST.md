# Extra Pipe 1.2 release readiness

This checklist prepares ticket #49; it does not authorize a feature-branch
publication. Manifests remain 1.1.0 until the proper release branch is created.

## Review order

1. #50 contracts and #51 Unicode fallback.
2. #52–62 eleven independent pipe PRs; #61 depends on the Unicode fallback for
   older runtimes. Keep each selector/export additive.
3. #63 isolated Angular 22 website, #64 catalog, #65 playground/recipes.
4. #66 accessibility/SEO, #67 security, #68 quality, #69 deployment preparation.
5. This release-readiness PR after the preceding code is reviewed.

Website/quality branches contain integration copies of prerequisites so they
could be verified together. Merge/review prerequisites first; the dependent diff
then becomes focused. Current-head CI is necessary but is not human review.
No PR is merged automatically and issues are not closed merely for written code.

## Migration notes

- Existing selectors, exports, defaults and four aliases remain available.
- localizedDate stays canonical; localized remains the deprecated alias.
- byteSize is a new SI/IEC API; legacy filesize/fileSize is not silently replaced.
- uniqueBy defaults to first retention. Legacy removeDuplicatesByKey has its own
  last-wins behavior and is not redirected to the new implementation.
- New collection adapters are pure: replace array references when values change.
  Returned arrays are new; original object identities are preserved.
- listFormat/formatUnit/displayName/range APIs use Intl locale rules. Formatting
  is not parsing, conversion or sanitization. Native/fallback range punctuation
  may differ. Text transformations do not take a locale option.
- The Unicode fallback adds a small MIT runtime dependency, not an Angular
  framework/compiler upgrade. Consumers still choose their Angular patch level.
- Library build and Angular 17 fixture stay in the root toolchain. Public docs
  move to the isolated Angular 22 projects/test-app package.

## Mandatory release gates

- [ ] Human review and current-head CI for every required task PR; merge into develop.
- [ ] Free Vercel destination/account confirmed; preview/deployed smoke checks recorded.
- [ ] Legacy Angular/build-tooling high/critical advisories reviewed: remediation
      or explicit documented acceptance, never a false zero-audit claim.
- [ ] Resolve the separate 1.1.0 gate: tag/release, authenticated npm publication,
      verified exact artifact and main-to-develop synchronization.
- [ ] Create release/1.2.0 from then-current develop, not from a feature branch.
- [ ] Set root/library/lock manifests to 1.2.0 and finalize the changelog there.
- [ ] Rebuild, lint, coverage, six clean packed consumers, package/archives,
      website production/security/browser/performance and deployment checks.
- [ ] Release PR into main: review, resolved discussions and current-head CI.
- [ ] Tag merged main commit exactly 1.2.0; GitHub Release name exactly 1.2.0.
- [ ] Publish the same verified archive after npm authentication/2FA if required;
      verify npm version and dist-tag afterward.
- [ ] Open main-to-develop synchronization PR and update the Notion sprint.

As of 2026-10-01, 1.1.0 release PR #28 is merged, but npm still reports 1.0.5,
npm view extra-pipe@1.1.0 returns E404 and only the 1.0.5 Git tag exists.
Vercel connector access is unavailable. Do not imply these external steps happened.
