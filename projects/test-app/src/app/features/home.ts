import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompactNumberPipe } from 'extra-pipe';
import { CodeBlock } from '../shared/code-block';
@Component({
  selector: 'app-home',
  imports: [RouterLink, CompactNumberPipe, CodeBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <section class="hero">
      <div>
        <p class="eyebrow">The standalone Angular toolbox</p>
        <h1>Small pipes.<br />Better interfaces.</h1>
        <p class="intro">
          Less formatting code. More thoughtful details. Locale-aware numbers, Unicode text, and
          immutable collections — ready for your next interface.
        </p>
        <div class="actions">
          <a class="button primary" routerLink="/pipes"
            >Explore the pipes <span aria-hidden="true">→</span></a
          ><a class="button secondary" routerLink="/pipes/compactNumber">Try an example</a>
        </div>
        <p class="support-note">Angular 17–22 · Standalone imports · MIT licensed</p>
      </div>
      <div class="hero-example panel">
        <div class="panel-heading">
          <span class="tag">A small transformation</span><span class="muted">compactNumber</span>
        </div>
        <app-code-block [code]="example" />
        <p class="result-label">Rendered output · English</p>
        <p class="hero-result">{{ 12500 | compactNumber: 'compact' : 1 : 'en' }}</p>
        <p class="muted">Readable counts. No custom suffix logic.</p>
      </div>
    </section>
    <section aria-labelledby="toolbox-title">
      <div class="section-heading">
        <div>
          <p class="eyebrow">Useful by design</p>
          <h2 id="toolbox-title">A toolbox, not another framework.</h2>
        </div>
        <a routerLink="/pipes">View all pipes →</a>
      </div>
      <div class="feature-grid">
        <article class="panel">
          <span class="feature-icon" aria-hidden="true">01</span>
          <h3>Display & localization</h3>
          <p>Format counts, units and time with explicit locale choices.</p>
          <a routerLink="/pipes/compactNumber">Explore formatting →</a>
        </article>
        <article class="panel">
          <span class="feature-icon" aria-hidden="true">02</span>
          <h3>Text that holds together</h3>
          <p>Truncate and mask without breaking a user-perceived character.</p>
          <a routerLink="/pipes/truncate">Explore text →</a>
        </article>
        <article class="panel">
          <span class="feature-icon" aria-hidden="true">03</span>
          <h3>Predictable collections</h3>
          <p>Clear ordering and retention rules. Input objects stay untouched.</p>
          <a routerLink="/pipes/groupBy">Explore collections →</a>
        </article>
      </div>
    </section>
    <section class="install-panel" aria-labelledby="install-title">
      <div>
        <p class="eyebrow">Start small</p>
        <h2 id="install-title">Import only what you need.</h2>
        <p>No module to configure. Add a pipe to your standalone component.</p>
      </div>
      <app-code-block code="npm install extra-pipe" label="Install the published package" />
    </section>
    <p class="release-note">
      The catalog includes 1.2 preview APIs currently in review. Check each pipe’s release label
      before installing.
    </p>`,
})
export class Home {
  protected readonly example = "{{ 12500 | compactNumber: 'compact': 1: 'en' }}";
}
