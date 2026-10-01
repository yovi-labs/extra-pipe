# Website accessibility and search readiness

The static Angular 22 website uses semantic headings, labeled inputs, a skip link,
route-change focus on the main landmark, visible focus rings, and 44px controls.
Code is escaped text, with explicit clipboard success/failure feedback.
Reduced-motion preferences are respected. No external fonts are requested.

The bright orange mark is decorative; darker orange is used for readable text and
buttons. Measured WCAG contrast ratios: body/canvas 14.81:1, secondary/canvas
7.01:1, white/primary button 6.43:1, control border/white 4.36:1,
tag text/background 7.37:1. This is not a claim of a complete WCAG certification.

Manual checks: 320px homepage and catalog have no horizontal page overflow;
navigation moves keyboard focus to main. Code blocks can scroll independently.
The previous homepage min-content overflow was corrected rather than hidden.

Each route sets a title, description, canonical URL and social metadata.
Compatibility URLs redirect to canonical selectors. Unknown routes are noindex.
Production indexing requires a validated HTTPS SITE_URL (or Vercel production
origin) and production context; previews remain noindex. The build finalizer
creates a real 404.html, robots.txt and a deduplicated sitemap from prerendered
canonical tags. With a configured QA origin, the sitemap has 37 canonical URLs.
Without an origin it deliberately does not invent a deployed address.

Verification: 17 website unit tests passed, static production build passed.
Initial JS/CSS remains above the 250kB warning budget (below the 350kB hard cap);
performance work and controlled Lighthouse measurement are tracked in #47.
Hosting response headers, redirects and deployment verification are tracked in
#46 and #48. Screen-reader and deployed-site checks remain part of release review.
