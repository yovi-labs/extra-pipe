import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { PipeDoc } from '../../data/pipe-catalog';
import { EXAMPLES_BY_SELECTOR } from '../../data/pipe-examples';
import { CodeBlock } from '../../shared/code-block';
import { evaluateInput, SAMPLES } from './pipe-runner';

@Component({
  selector: 'app-playground',
  imports: [CodeBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <section class="playground" aria-labelledby="playground-title">
    <div class="section-heading">
      <div>
        <h2 id="playground-title">Try it live.</h2>
        <p class="muted">The output below runs the packed library. Edit data, not code.</p>
      </div>
      <button type="button" (click)="reset()">Reset example</button>
    </div>
    <div class="playground-fields">
      <div class="field">
        <label for="playground-input">Input (JSON)</label
        ><textarea
          id="playground-input"
          rows="5"
          spellcheck="false"
          [value]="inputText()"
          (input)="editInput($event)"
          [attr.aria-invalid]="result().error ? 'true' : null"
          [attr.aria-describedby]="result().error ? 'input-help playground-error' : 'input-help'"
        ></textarea
        ><small id="input-help"
          >Use double quotes for text, or a number, array, object or null.</small
        >
      </div>
      <div class="field">
        <label for="playground-parameters">Parameters (JSON array)</label
        ><textarea
          id="playground-parameters"
          rows="5"
          spellcheck="false"
          [value]="parameters()"
          (input)="editParameters($event)"
          [attr.aria-invalid]="result().error ? 'true' : null"
          [attr.aria-describedby]="
            result().error ? 'parameters-help playground-error' : 'parameters-help'
          "
        ></textarea
        ><small id="parameters-help">{{ parameterHelp() }} Locale is controlled separately.</small>
      </div>
    </div>
    <div class="playground-tools">
      <div class="field">
        <label for="playground-locale">Output locale</label
        ><select
          id="playground-locale"
          [value]="locale()"
          (change)="editLocale($event)"
          [disabled]="!supportsLocale()"
          aria-describedby="locale-help"
        >
          <option value="en-US">English · en-US</option>
          <option value="fr-FR">French · fr-FR</option>
          <option value="ar-MA">Arabic · ar-MA</option>
        </select>
        <small id="locale-help">{{
          supportsLocale() ? 'Applied to the live output.' : 'This pipe has no locale override.'
        }}</small>
      </div>
      <button type="button" (click)="tryNull()">Try null input</button>
      @if (pipe().selector === 'removeByKey') {
        <button type="button" (click)="addItem()" [disabled]="!canAdd()">Add an item</button>
      }
    </div>
    <app-code-block [code]="liveCode()" label="Live template data" />
    @if (result().error) {
      <p id="playground-error" class="notice" role="alert">{{ result().error }}</p>
    } @else {
      <p class="result-label">Rendered output</p>
      <pre
        class="output live-output"
        dir="auto"
        aria-live="polite"
      ><code>{{result().output||'Empty string'}}</code></pre>
    }
    @if (pipe().selector === 'removeByKey') {
      <p class="muted">Adding an item creates a new array. Existing records stay untouched.</p>
      <app-code-block
        code="items = [...items, { id: nextId, name: 'New item' }];"
        label="Component update"
      />
    }
    @if (pipe().selector === 'relativeTime') {
      <p class="notice">
        Update the reference-time parameter to refresh this output. This pipe does not start a
        timer.
      </p>
    }
  </section>`,
})
export class Playground {
  readonly pipe = input.required<PipeDoc>();
  protected readonly inputText = signal('null');
  protected readonly parameters = signal('[]');
  protected readonly locale = signal('en-US');
  protected readonly supportsLocale = computed(
    () => EXAMPLES_BY_SELECTOR.get(this.pipe().selector)?.localeParameterIndex !== undefined,
  );
  protected readonly parameterHelp = computed(() => {
    const names = EXAMPLES_BY_SELECTOR.get(this.pipe().selector)?.parameterNames ?? [];
    return names.length
      ? 'Ordered parameters: ' + names.join(', ') + '.'
      : 'No parameters: use [].';
  });
  protected readonly result = computed(() =>
    evaluateInput(this.pipe().selector, this.inputText(), this.parameters(), this.locale()),
  );
  protected readonly canAdd = computed(
    () => Array.isArray(this.result().value) && !this.result().error,
  );
  protected readonly liveCode = computed(() => {
    // JSON text is only displayed, never compiled or evaluated as a template.
    let params: unknown;
    try {
      params = JSON.parse(this.parameters());
    } catch {
      return 'Enter valid JSON to see the template data.';
    }
    if (!Array.isArray(params)) return 'Parameters must be a JSON array.';
    const localeIndex = EXAMPLES_BY_SELECTOR.get(this.pipe().selector)?.localeParameterIndex;
    const args = params.map((parameter) => JSON.stringify(parameter));
    if (localeIndex !== undefined) {
      while (args.length < localeIndex) args.push('undefined');
      args.length = localeIndex;
      args.push(JSON.stringify(this.locale()));
    }
    const json =
      (this.pipe().json ??
      (this.pipe().category === 'Collections' && this.pipe().selector !== 'includes'))
        ? (this.pipe().keyValue ? ' | keyvalue: keepInsertionOrder' : '') + ' | json'
        : '';
    if (this.pipe().selector === 'unzip') {
      return 'readonly pairs = ' + this.inputText() + ' as const;\n{{ pairs | unzip | json }}';
    }
    const context = this.pipe().keyValue ? 'readonly keepInsertionOrder = () => 0;\n' : '';
    return (
      context +
      '{{ ' +
      this.inputText() +
      ' | ' +
      this.pipe().selector +
      (args.length ? ': ' + args.join(': ') : '') +
      json +
      ' }}'
    );
  });
  constructor() {
    effect(() => {
      this.pipe();
      this.reset();
    });
  }
  protected reset(): void {
    const sample = SAMPLES[this.pipe().selector] ?? { input: null, parameters: [] };
    this.inputText.set(JSON.stringify(sample.input, null, 2));
    this.parameters.set(JSON.stringify(sample.parameters, null, 2));
    this.locale.set('en-US');
  }
  protected editInput(event: Event): void {
    this.inputText.set((event.target as HTMLTextAreaElement).value);
  }
  protected editParameters(event: Event): void {
    this.parameters.set((event.target as HTMLTextAreaElement).value);
  }
  protected editLocale(event: Event): void {
    this.locale.set((event.target as HTMLSelectElement).value);
  }
  protected tryNull(): void {
    this.inputText.set('null');
  }
  protected addItem(): void {
    const items = this.result().value;
    if (!Array.isArray(items) || items.length >= 500) return;
    const largest = items.reduce(
      (max: number, item: unknown) =>
        item &&
        typeof item === 'object' &&
        'id' in item &&
        typeof item.id === 'number' &&
        Number.isSafeInteger(item.id)
          ? Math.max(max, item.id)
          : max,
      0,
    );
    if (!Number.isSafeInteger(largest + 1)) return;
    this.inputText.set(JSON.stringify([...items, { id: largest + 1, name: 'New item' }], null, 2));
  }
}
