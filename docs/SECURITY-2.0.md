# 2.0 security boundaries

The library and website process display data, not executable expressions. Pipe output is not a sanitization, access-control or data-protection boundary. `mask`, `hide`, `escapeRegExp`, and `base64ImageUrl` do not make untrusted data safe for HTML, script, URL or storage contexts. Keep Angular's built-in context sanitization enabled; do not use a trust bypass for pipe output.

## Playground

- An exhaustive, statically imported whitelist maps 101 canonical selectors to typed adapters. Maps prevent prototype names from resolving as executable adapters.
- JSON is parsed, never evaluated or compiled. Typed argument guards check primitives, tuples, collections, date inputs, option enums and own-property option shapes before invoking the library. Invalid shapes produce readable errors; valid-but-out-of-range inputs retain the library's documented fallback. Nullable contracts still accept null.
- Object guards reject getters and non-plain prototypes without reading accessor values. Unknown option names are rejected instead of silently ignoring typos. `getPath` rejects prototype traversal; no global state is changed.
- Limits: 20,000 input characters, 5,000 parameter characters, eight parameters overall and the actual pipe-specific parameter count, 128-character string parameters, 500 items per nested collection, 5,000 visited values, 12 nesting levels and 20,000 rendered-output characters. Library algorithms also bound fraction denominators, flatten depth and generated date sequences. These are demo limits, not a guarantee of constant-time library execution.
- Outputs are rendered through Angular text interpolation. Highlight segments are data, not HTML. There is no arbitrary template execution, dynamic function construction or sanitizer bypass.

## Dependencies and deployment

On 2026-10-02, both installed lockfiles (`npm audit`, including development dependencies) reported **zero known advisories**. CI audits both lockfiles and fails on high/critical advisories; audit results are time-specific, not a claim of perfect security.

The Angular 20 builder's vulnerable Piscina 5.2.0 is replaced by patched 5.3.2 through a narrowly scoped override. Unused legacy Webpack development tooling was removed rather than forced into a different major version. The website remains separately locked on Angular 22. Node 24 is required.

Existing static-deployment headers, same-origin CSP, frame restrictions and generated HTML checks remain enforced by `npm run check:security`. No production deployment is part of this refactor. Local Windows Application Control blocks Angular 22's native parser; do not weaken security policy or replace the loader to work around it. Linux CI is the build authority until the local runtime is approved.

Tests cover typed argument rejection before execution, immutable references, getters, malformed JSON, unknown selectors, prototype keys, option typos, collection/depth bounds and costly numeric/date requests. See `json-contracts.spec.ts`, `pipe-runner.spec.ts`, domain transformation tests and `scripts/website-security.test.mjs`.
