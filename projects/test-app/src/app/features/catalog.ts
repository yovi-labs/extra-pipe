import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SiteSeo } from '../shared/site-seo';
import { RouterLink } from '@angular/router';
import { CATEGORIES, filterPipes, PIPE_DOCS } from '../data/pipe-catalog';
@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="page-heading">
      <p class="eyebrow">The catalog</p>
      <h1>Find your next shortcut.</h1>
      <p class="intro">
        Explicit inputs, predictable outputs. Browse {{ count }} pure standalone pipes.
      </p>
    </div>
    <div class="catalog-controls">
      <div class="field">
        <label for="pipe-search">Search pipes</label
        ><input
          id="pipe-search"
          type="search"
          placeholder="Try: duration, text, fileSize…"
          [value]="query()"
          (input)="setQuery($event)"
        />
      </div>
      <div class="field">
        <label for="pipe-category">Category</label
        ><select id="pipe-category" [value]="category()" (change)="setCategory($event)">
          <option>All</option>
          @for (item of categories; track item) {
            <option>{{ item }}</option>
          }
        </select>
      </div>
    </div>
    <p class="muted" role="status">
      {{ filtered().length }} {{ filtered().length === 1 ? 'pipe' : 'pipes' }} found
    </p>
    <div class="catalog-grid">
      @for (pipe of filtered(); track pipe.selector) {
        <a class="catalog-card" [routerLink]="['/pipes', pipe.selector]"
          ><div class="panel-heading">
            <span class="tag">{{ pipe.category }}</span
            ><span class="release-tag">{{
              pipe.status === 'preview' ? '2.0 preview' : 'Existing API'
            }}</span>
          </div>
          <h2>{{ pipe.selector }}<span class="card-arrow" aria-hidden="true">↗</span></h2>
          <p>{{ pipe.description }}</p>
          <span class="card-meta">{{ pipe.pure ? 'Pure' : 'Legacy impure' }} · Standalone</span></a
        >
      } @empty {
        <div class="panel">
          <h2>No matches yet.</h2>
          <p>Try another name or select All categories.</p>
          <button type="button" (click)="reset()">Clear filters</button>
        </div>
      }
    </div>`,
})
export class Catalog {
  constructor() {
    inject(SiteSeo).update(
      'Pipe catalog — Extra Pipe',
      'Search pure standalone Angular pipes, contracts and runnable examples.',
      '/pipes',
    );
  }
  protected readonly count = PIPE_DOCS.length;
  protected readonly categories = CATEGORIES;
  protected readonly query = signal('');
  protected readonly category = signal('All');
  protected readonly filtered = computed(() => filterPipes(this.query(), this.category()));
  protected setQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
  protected setCategory(event: Event): void {
    this.category.set((event.target as HTMLSelectElement).value);
  }
  protected reset(): void {
    this.query.set('');
    this.category.set('All');
  }
}
