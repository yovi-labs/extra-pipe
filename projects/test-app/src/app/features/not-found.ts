import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SiteSeo } from '../shared/site-seo';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p class="eyebrow">404</p>
    <h1>This page took a wrong turn.</h1>
    <p>Find a pipe, or head back to the toolbox.</p>
    <a routerLink="/pipes">Browse the catalog →</a>`,
})
export class NotFound {
  constructor() {
    inject(SiteSeo).update(
      'Page not found — Extra Pipe',
      'Find a useful Angular pipe in the Extra Pipe catalog.',
      '/404',
      true,
    );
  }
}
