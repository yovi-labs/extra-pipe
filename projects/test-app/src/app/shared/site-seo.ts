import { DOCUMENT } from '@angular/common';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_INDEXABLE = new InjectionToken<boolean>('SITE_INDEXABLE', {
  providedIn: 'root',
  factory: () =>
    !inject(DOCUMENT)
      .querySelector('meta[name="robots"]')
      ?.getAttribute('content')
      ?.includes('noindex'),
});
export const SITE_ORIGIN = new InjectionToken<string>('SITE_ORIGIN', {
  providedIn: 'root',
  factory: () => inject(DOCUMENT).location?.origin ?? '',
});
@Injectable({ providedIn: 'root' })
export class SiteSeo {
  private readonly document = inject(DOCUMENT);
  private readonly origin = inject(SITE_ORIGIN);
  private readonly indexable = inject(SITE_INDEXABLE);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  update(title: string, description: string, path: string, noindex = false): void {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({
      name: 'robots',
      content: noindex || !this.indexable ? 'noindex, follow' : 'index, follow',
    });
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!this.origin) {
      canonical?.remove();
      return;
    }
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = new URL(path, this.origin).href;
    this.meta.updateTag({ property: 'og:url', content: canonical.href });
  }
}
