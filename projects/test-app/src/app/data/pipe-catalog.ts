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
// Normalize stable catalog data once, not for all 101 entries on every keystroke.
const SEARCH_INDEX = PIPE_DOCS.map((pipe) => ({
  pipe,
  text: [
    pipe.selector,
    pipe.description,
    pipe.category,
    pipe.className,
    ...DOC_REDIRECTS.filter((redirect) => redirect.target === pipe.selector).map(
      (redirect) => redirect.selector,
    ),
  ]
    .join(' ')
    .toLowerCase(),
}));
export function filterPipes(query: string, category = 'All'): readonly PipeDoc[] {
  const search = query.trim().toLowerCase();
  return SEARCH_INDEX.filter(
    (entry) =>
      (category === 'All' || entry.pipe.category === category) && entry.text.includes(search),
  ).map((entry) => entry.pipe);
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
