import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PIPE_DOCS, standaloneCode, templateCode } from '../data/pipe-catalog';
import { SiteSeo } from '../shared/site-seo';
import { CodeBlock } from '../shared/code-block';
import { Playground } from './playground/playground';
@Component({
  selector: 'app-pipe-detail',
  imports: [RouterLink, CodeBlock, Playground],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` @if (pipe(); as current) {
      <a class="back-link" routerLink="/pipes">← All pipes</a>
      <div class="page-heading">
        <div class="panel-heading">
          <span class="tag">{{ current.category }}</span>
        </div>
        <h1>{{ current.selector }}</h1>
        <p class="intro">{{ current.description }}</p>
      </div>
      <div class="detail-grid">
        <section class="panel">
          <h2>Use it in your component</h2>
          <app-code-block [code]="componentCode()" label="Standalone component" /><app-code-block
            [code]="templateCode(current)"
          />
          <app-playground [pipe]="current" />
        </section>
        <aside class="panel">
          <h2>The contract</h2>
          <p>{{ current.contract }}</p>
          <dl>
            <dt>Null / invalid input</dt>
            <dd>{{ current.invalid }}</dd>
            <dt>Locale behavior</dt>
            <dd>{{ current.locale }}</dd>
            <dt>Change detection</dt>
            <dd>Pure: replace changed input references.</dd>
          </dl>
          <p class="notice">
            These are display utilities, not validation, data protection or sanitization boundaries.
          </p>
        </aside>
      </div>
    } @else {
      <section class="page-heading">
        <p class="eyebrow">404</p>
        <h1>Pipe not found.</h1>
        <p>That selector is not in this catalog.</p>
        <a routerLink="/pipes">Browse all pipes →</a>
      </section>
    }`,
})
export class PipeDetail {
  protected readonly templateCode = templateCode;
  private readonly seo = inject(SiteSeo);
  private readonly params = toSignal(inject(ActivatedRoute).paramMap);
  protected readonly pipe = computed(() =>
    PIPE_DOCS.find((item) => item.selector === this.params()?.get('selector')),
  );
  protected readonly componentCode = computed(() =>
    this.pipe() ? standaloneCode(this.pipe()!) : '',
  );
  constructor() {
    effect(() => {
      const current = this.pipe();
      this.seo.update(
        (current?.selector ?? 'Pipe not found') + ' — Extra Pipe',
        current?.description ?? 'Browse the Extra Pipe Angular documentation catalog.',
        current ? '/pipes/' + current.selector : '/404',
        !current,
      );
    });
  }
}
