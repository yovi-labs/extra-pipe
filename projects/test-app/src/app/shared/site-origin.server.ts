/** Public hosting metadata only. No credentials enter the browser build. */
export function siteOrigin(environment: Record<string, string | undefined>): string {
  const configured = environment['SITE_URL'];
  const deployed = environment['VERCEL_PROJECT_PRODUCTION_URL'];
  const value = configured ?? (deployed ? 'https://' + deployed : '');
  if (!value) return '';
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  ) {
    throw new Error('SITE_URL must be a plain HTTPS origin.');
  }
  return url.origin;
}
