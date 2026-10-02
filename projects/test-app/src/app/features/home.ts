import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteSeo } from '../shared/site-seo';
import { CodeBlock } from '../shared/code-block';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CodeBlock],
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<section class="home" aria-labelledby="home-title">
    <app-code-block
      class="install-command"
      code="npm install extra-pipe"
      label="Install"
      [compact]="true"
    />
    <div class="landing-hero">
      <h1 id="home-title" class="hero-highlight">
        The Angular Toolkit<br />for Everyday Interfaces
      </h1>
      <p class="hero-description">Less formatting code. More thoughtful interfaces.</p>
      <div class="hero-actions">
        <a class="button primary" routerLink="/pipes">
          Explore pipes
          <svg
            aria-hidden="true"
            focusable="false"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14m-6-6 6 6-6 6" />
          </svg>
        </a>
        <a class="button secondary" routerLink="/pipes/compactNumber">
          <svg
            aria-hidden="true"
            focusable="false"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16" />
          </svg>
          Try an example
        </a>
        <a class="button ghost source-link" href="https://github.com/yovi-labs/extra-pipe">
          View on GitHub
          <svg
            aria-hidden="true"
            focusable="false"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"
            />
          </svg>
        </a>
      </div>
    </div>
    <p class="support-strip">Standalone · Angular 20–22 · MIT</p>
    <div class="feature-row">
      <article>
        <h2>Standalone</h2>
        <p>Import the pipe you need. No extra module, no setup ceremony.</p>
        <a routerLink="/pipes">Browse pipes</a>
      </article>
      <article>
        <h2>Locale-aware</h2>
        <p>Format numbers, dates and text for the people using your app.</p>
        <a routerLink="/pipes/compactNumber">Explore formatting</a>
      </article>
      <article>
        <h2>Predictable</h2>
        <p>Pure transformations, immutable collections, and explicit contracts.</p>
        <a routerLink="/pipes/groupBy">Explore collections</a>
      </article>
    </div>
  </section>`,
})
export class Home {
  constructor() {
    inject(SiteSeo).update(
      'Extra Pipe — Standalone Angular toolbox',
      'Standalone Angular pipes for locale-aware formatting, Unicode text and immutable collections.',
      '/',
    );
  }
}
