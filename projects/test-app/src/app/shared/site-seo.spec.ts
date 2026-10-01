import { TestBed } from '@angular/core/testing';
import { SiteSeo, SITE_ORIGIN, SITE_INDEXABLE } from './site-seo';
import { siteOrigin } from './site-origin.server';
describe('static SEO', () => {
  it('uses the verified origin, canonical path and preview indexing policy', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SITE_ORIGIN, useValue: 'https://example.invalid' },
        { provide: SITE_INDEXABLE, useValue: false },
      ],
    });
    TestBed.inject(SiteSeo).update(
      'localizedDate — Extra Pipe',
      'Date formatting',
      '/pipes/localizedDate',
    );
    expect(document.querySelector('link[rel=canonical]')?.getAttribute('href')).toBe(
      'https://example.invalid/pipes/localizedDate',
    );
    expect(document.querySelector('meta[name=robots]')?.getAttribute('content')).toBe(
      'noindex, follow',
    );
    expect(document.title).toBe('localizedDate — Extra Pipe');
  });
  it('does not invent a production origin and validates supplied metadata', () => {
    expect(siteOrigin({})).toBe('');
    expect(siteOrigin({ VERCEL_PROJECT_PRODUCTION_URL: 'demo.vercel.app' })).toBe(
      'https://demo.vercel.app',
    );
    [
      'http://example.com',
      'https://user:password@example.com',
      'https://example.com/path',
      'https://example.com/?x=1',
    ].forEach((value) => expect(() => siteOrigin({ SITE_URL: value })).toThrow());
  });
});
