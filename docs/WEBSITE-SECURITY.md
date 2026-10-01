# Website threat model and security review

The public website is prerendered at build time and served as static assets.
It has no authentication, API, database, server runtime, analytics, third-party
fonts, or executable user submissions. The playground parses bounded JSON
and dispatches to a fixed pipe adapter. Templates, code and results are escaped
Angular interpolation; no eval, dynamic compilation or sanitizer bypass is used.
The mask pipe is display formatting, not encryption or secure data redaction.

Vercel response configuration blocks framing, MIME sniffing, forms and device
permissions. Scripts are same-origin only; eval and inline executable scripts
are not permitted. The finalizer externalizes Angular's trusted hydration
bootstrap into content-addressed script files, preserving execution order.
Trusted Types allows only Angular and its bundler policies.
Inline critical CSS is disabled. Inline styles remain allowed for Angular
component styling; this limitation is explicit, not a static reusable nonce.
See [Angular security guidance](https://angular.dev/best-practices/security).

Local production response tests verify headers, real 404 status, alias casing,
asset caching and absence of executable inline scripts. Browser checks under
these headers and deployed-site checks are required before promotion.
The local test server is not a deployed function and binds only to loopback.

## Dependency findings (2026-10-01)

Angular 22 website audit: zero advisories across runtime and development.
The isolated Angular 17 workspace has legacy advisories, including eight
runtime packages (four moderate, four high). Full workspace tooling audit:
106 packages (10 low, 32 moderate, 60 high, 4 critical). These are tracked risks
in the legacy build toolchain, not deployed website dependencies.
These counts are dependency advisories,
not evidence that every advisory is exploitable in this application.

Angular 17 compatibility is not a security endorsement. Keep this fixture local
and build-only; do not deploy it. Consumers own their Angular patch level.
Do not run npm audit fix --force: it would silently break the approved compiler
and peer contract. Migration of the library compiler requires a separate
compatibility decision. The package contains only tslib/unicode-segmenter
runtime dependencies and Angular peers, not the development toolchain.

## Release gates

Review CSP with the deployed website; verify redirects and caching at Vercel.
Re-run both audits on the release head. Review open high/critical findings and
document acceptance or remediation before release; do not claim a clean audit
for the whole repository based only on the website result.
