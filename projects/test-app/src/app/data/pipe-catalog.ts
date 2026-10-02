import { DOC_REDIRECTS } from './documentation-redirects';
import { EXAMPLES_BY_SELECTOR, PIPE_EXAMPLES } from './pipe-examples';
import type { PipeCategory, PipeDoc } from './pipe-example.model';
export type { PipeCategory, PipeDoc } from './pipe-example.model';
export const PIPE_DOCS: readonly PipeDoc[] = PIPE_EXAMPLES;

export const CATEGORIES: readonly PipeCategory[] = [
  'Text',
  'Numbers',
  'Dates',
  'Localization',
  'Collections',
  'Utilities',
];
export function filterPipes(query: string, category = 'All'): readonly PipeDoc[] {
  const search = query.trim().toLowerCase();
  return PIPE_DOCS.filter(
    (pipe) =>
      (category === 'All' || pipe.category === category) &&
      [
        pipe.selector,
        pipe.description,
        pipe.category,
        pipe.className,
        ...DOC_REDIRECTS.filter((alias) => alias.target === pipe.selector).map(
          (alias) => alias.selector,
        ),
      ]
        .join(' ')
        .toLowerCase()
        .includes(search),
  );
}
export function standaloneCode(pipe: PipeDoc): string {
  const needsJson = pipe.json ?? (pipe.category === 'Collections' && pipe.selector !== 'includes');
  return (
    "import { Component } from '@angular/core';\n" +
    (needsJson
      ? 'import { JsonPipe' +
        (pipe.keyValue ? ', KeyValuePipe' : '') +
        " } from '@angular/common';\n"
      : '') +
    'import { ' +
    pipe.className +
    " } from 'extra-pipe';\n\n@Component({\n  standalone: true,\n  imports: [" +
    pipe.className +
    (needsJson ? ', JsonPipe' + (pipe.keyValue ? ', KeyValuePipe' : '') : '') +
    '],\n  template: \x60' +
    templateCode(pipe) +
    '\x60,\n})\nexport class ExampleComponent {\n' +
    (EXAMPLES_BY_SELECTOR.get(pipe.selector)?.componentContext ?? '') +
    '\n}'
  );
}

export function templateCode(pipe: PipeDoc): string {
  return (pipe.json ?? (pipe.category === 'Collections' && pipe.selector !== 'includes'))
    ? pipe.example.replace(
        /\s*\}\}$/,
        (pipe.keyValue ? ' | keyvalue: keepInsertionOrder' : '') + ' | json }}',
      )
    : pipe.example;
}
