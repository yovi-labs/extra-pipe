import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import {
  CompactNumberPipe,
  FormatUnitPipe,
  InitialsPipe,
  MaskPipe,
  UniqueByPipe,
  OrderByPipe,
} from 'extra-pipe';
import { CodeBlock } from '../shared/code-block';
@Component({
  selector: 'app-recipes',
  imports: [
    JsonPipe,
    CompactNumberPipe,
    FormatUnitPipe,
    InitialsPipe,
    MaskPipe,
    UniqueByPipe,
    OrderByPipe,
    CodeBlock,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="page-heading">
      <p class="eyebrow">Recipes</p>
      <h1>Useful together.</h1>
      <p class="intro">
        Small, practical combinations for the interfaces developers build every day.
      </p>
    </div>
    <article class="panel">
      <span class="tag">Dashboard metrics</span>
      <h2>Readable numbers, explicit units.</h2>
      <app-code-block [code]="metricsCode" label="Standalone component" />
      <div class="recipe-output">
        <p>
          <span class="muted">Visitors</span
          ><strong>{{ 12500 | compactNumber: 'compact' : 1 : 'en' }}</strong>
        </p>
        <p>
          <span class="muted">Distance</span
          ><strong>{{ 12.5 | formatUnit: 'kilometer' : { unitDisplay: 'long' } : 'fr' }}</strong>
        </p>
      </div>
    </article>
    <article class="panel">
      <span class="tag">Profile & account</span>
      <h2>Show just enough information.</h2>
      <app-code-block [code]="accountCode" label="Standalone component" />
      <div class="recipe-output">
        <p>
          <span class="muted">Avatar label</span><strong>{{ 'Ana María' | initials: 2 }}</strong>
        </p>
        <p>
          <span class="muted">Account ending</span
          ><strong>{{ '4242424242424242' | mask: 0 : 4 }}</strong>
        </p>
      </div>
      <p class="notice">
        Masking only changes displayed text. Never send secrets to the browser just because the
        label is masked.
      </p>
    </article>
    <article class="panel">
      <span class="tag">Immutable collections · 1.2 preview</span>
      <h2>Keep the newest record. Then sort.</h2>
      <app-code-block [code]="collectionCode" label="Standalone component" />
      <pre
        class="output"
      ><code>{{records | uniqueBy:'id':'last' | orderBy:'name':'asc':'en' | json}}</code></pre>
      <p class="muted">
        Both pipes return new arrays and retain object identity. Precompute large collections
        outside the template.
      </p>
    </article>`,
})
export class Recipes {
  readonly records = [
    { id: 1, name: 'old Ana' },
    { id: 2, name: 'Sam' },
    { id: 1, name: 'Ana' },
  ];
  protected readonly metricsCode =
    "import { Component } from '@angular/core';\nimport { CompactNumberPipe, FormatUnitPipe } from 'extra-pipe';\n\n@Component({\n standalone:true,\n imports:[CompactNumberPipe, FormatUnitPipe],\n template: \x60{{12500 | compactNumber:'compact':1:'en'}}\n{{12.5 | formatUnit:'kilometer':{unitDisplay:'long'}:'fr'}}\x60,\n})\nexport class MetricsComponent {}";
  protected readonly accountCode =
    "import { Component } from '@angular/core';\nimport { InitialsPipe, MaskPipe } from 'extra-pipe';\n\n@Component({\n standalone:true,\n imports:[InitialsPipe, MaskPipe],\n template: \x60{{'Ana María' | initials:2}}\n{{'4242424242424242' | mask:0:4}}\x60,\n})\nexport class AccountComponent {}";
  protected readonly collectionCode =
    "import { Component } from '@angular/core';\nimport { JsonPipe } from '@angular/common';\nimport { UniqueByPipe, OrderByPipe } from 'extra-pipe';\n\n@Component({\n standalone:true,\n imports:[JsonPipe, UniqueByPipe, OrderByPipe],\n template: \x60{{records | uniqueBy:'id':'last' | orderBy:'name':'asc':'en' | json}}\x60,\n})\nexport class RecordsComponent {\n readonly records=[{id:1,name:'old Ana'},{id:2,name:'Sam'},{id:1,name:'Ana'}];\n}";
}
