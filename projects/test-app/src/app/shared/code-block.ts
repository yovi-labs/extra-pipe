import { ChangeDetectionStrategy, Component, input, linkedSignal } from '@angular/core';
@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.compact]': 'compact()' },
  styles: `
    pre {
      white-space: var(--code-white-space, pre);
      overflow-wrap: var(--code-overflow-wrap, normal);
    }
    :host(.compact) {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
      gap: 16px;
      padding: 6px 8px 6px 20px;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--surface);
    }
    :host(.compact) .code-heading {
      display: contents;
    }
    :host(.compact) button {
      grid-column: 2;
      grid-row: 1;
    }
    :host(.compact) pre {
      grid-column: 1;
      grid-row: 1;
      margin: 0;
      padding: 0;
      background: transparent;
      color: var(--ink);
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
    :host(.compact) .code-heading span,
    :host(.compact) .copy-status:not(.copy-error) {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    :host(.compact) .copy-error {
      grid-column: 1 / -1;
      margin: 0 0 6px;
    }
  `,
  template: `<div class="code-heading">
      <span>{{ label() }}</span
      ><button type="button" (click)="copy()" [attr.aria-label]="'Copy ' + label()">
        <svg
          aria-hidden="true"
          focusable="false"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          @if (status() === 'Code copied.') {
            <path d="m5 12 4 4L19 6" />
          } @else {
            <rect x="8" y="8" width="13" height="13" rx="2" />
            <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
          }
        </svg>
        {{ status() === 'Code copied.' ? 'Copied' : 'Copy code' }}
      </button>
    </div>
    <pre><code>{{code()}}</code></pre>
    <p
      class="copy-status"
      [class.copy-error]="status() !== '' && status() !== 'Code copied.'"
      role="status"
    >
      {{ status() }}
    </p>`,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly label = input('Template');
  readonly compact = input(false);
  protected readonly status = linkedSignal({ source: this.code, computation: () => '' });
  protected async copy(): Promise<void> {
    const copiedCode = this.code();
    try {
      await navigator.clipboard.writeText(copiedCode);
      if (this.code() === copiedCode) this.status.set('Code copied.');
    } catch {
      if (this.code() === copiedCode) {
        this.status.set('Copy unavailable. Select and copy the code above.');
      }
    }
  }
}
