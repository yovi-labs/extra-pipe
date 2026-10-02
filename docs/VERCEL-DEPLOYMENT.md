# Free Vercel deployment runbook

Status: the 2.0.0 static build configuration is locally verified. No deployment
URL is claimed. On 2026-10-02 a new empty `extra-pipe` project was created in the
owner's signed-in Hobby account and its build settings saved. The connector still
returns no accessible teams. Git connection, origin, eligibility and deployment
remain separate gates. See the
[current deployment candidate](DEPLOYMENT-2.0-CANDIDATE.md) for evidence and gates.

## Scope and costs

Deploy only the Angular 22 static output. No functions, database, analytics,
marketplace integration, custom domain purchase or paid add-on is required.
Hobby is for personal, non-commercial use; confirm that this project qualifies
before creating or linking it. If the account/repository combination is not
eligible, stop and discuss another genuinely free destination. Do not change
Git authorship or remove repository identity to bypass plan restrictions.

[Vercel Hobby terms](https://vercel.com/docs/plans/hobby)
[Static configuration reference](https://vercel.com/docs/project-configuration/vercel-json)

## Project settings after account connection

- Root directory: repository root.
- Framework preset: Other; this is static output, not a running Angular server.
- Node.js build setting: 24.x (at least 24.15).
- Install command: npm ci --ignore-scripts.
- Build command: npm run build:vercel.
- Output: projects/test-app/dist/extra-pipe-website/browser.
- Production branch: main, only after the reviewed Sprint 2 release lands there.
- Public SITE_URL: the actual plain HTTPS production origin; it is not a secret.
  Alternatively use the Vercel production URL exposed by project configuration.
- Keep Vercel tokens/project IDs outside Git; never paste a token into an issue.

The orchestrator uses Node 24.15+ throughout: Angular 20.3 partial compilation for
the library, then the isolated Angular 22 website toolchain. It verifies the
packed 2.0.0 package, installs that archive into the website without modifying its
lockfile, runs website tests, renders static pages and checks the response policy.
`npm run build:vercel` prepares output only; it never uploads or deploys.

## Preview, verification and production

Use a pinned Vercel CLI selected at connection time, not an unreviewed latest
version in an automatic workflow. Pull the correct project/environment first.
Prefer a prebuilt deployment to separate build verification from upload.
Preview deployments stay noindex; record their URL, commit and build status.

Check homepage, search, all documented routes, aliases (particularly fileSize
versus filesize), French/Arabic outputs, copy controls, null/invalid input,
immutable item interaction, mobile reflow, keyboard focus and browser errors.
Check deployed response headers, a real unknown-path 404, hashed-asset caching,
TLS, canonical origin, robots and sitemap. Repeat mobile performance runs on the
deployment; local results are not proof of CDN or network behavior.

Production requires reviewed current-head CI and an owner-approved destination.
Because preview noindex metadata intentionally differs from production metadata,
do not blindly promote a preview artifact that remains noindex. Build the final
candidate using production context, verify that exact artifact again and deploy
it prebuilt. If reusing an artifact, verify its indexing context before promotion.
Record the deployment URL and commit; scan deployment errors after delivery.

## Rollback and release separation

Record the previous healthy deployment before changing a production alias.
Rollback to that verified deployment if the smoke tests fail. Do not publish
npm or create a release tag as part of website deployment. The 2.0.0 package
publication workflow remains separate from hosting. The documented APIs must
match the package available to visitors before the website is presented as the
published release; currently npm serves 1.0.5, not this 2.0.0 candidate.

Ticket #48 remains open until repository connection and free-plan eligibility are
confirmed, a free preview is deployed and the deployed checks are recorded.

