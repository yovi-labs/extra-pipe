import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
@Component({
  selector: 'app-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="code-heading">
      <span>{{ label() }}</span
      ><button type="button" (click)="copy()">Copy code</button>
    </div>
    <pre><code>{{code()}}</code></pre>
    <p class="copy-status" role="status">{{ status() }}</p>`,
})
export class CodeBlock {
  readonly code = input.required<string>();
  readonly label = input('Template');
  protected readonly status = signal('');
  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.status.set('Code copied.');
    } catch {
      this.status.set('Copy unavailable. Select and copy the code above.');
    }
  }
}
