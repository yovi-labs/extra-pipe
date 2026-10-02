import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import ts from 'typescript';

const root = fileURLToPath(new URL('../', import.meta.url));
const data = resolve(root, 'projects/test-app/src/app/data');
const temporary = mkdtempSync(resolve(tmpdir(), 'extra-pipe-example-source-'));
const visited = new Set();

// Compile trusted repository metadata as modules, never user-entered playground text.
function compileMetadata(file) {
  file = resolve(file);
  assert.ok(
    !relative(data, file).startsWith('..'),
    'Metadata must stay in its data domain'
  );
  const destination = resolve(
    temporary,
    relative(data, file).replace(/\.ts$/, '.mjs')
  );
  if (visited.has(file)) return destination;
  visited.add(file);
  const output = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText;
  const source = ts.createSourceFile(
    file,
    output,
    ts.ScriptTarget.Latest,
    true
  );
  const edits = [];
  for (const statement of source.statements) {
    if (
      !ts.isImportDeclaration(statement) &&
      !ts.isExportDeclaration(statement)
    )
      continue;
    const specifier = statement.moduleSpecifier;
    if (!specifier) continue;
    assert.ok(
      ts.isStringLiteral(specifier) && specifier.text.startsWith('.'),
      'Metadata cannot import executable packages'
    );
    compileMetadata(resolve(dirname(file), specifier.text + '.ts'));
    edits.push({
      start: specifier.getStart(source),
      end: specifier.end,
      text: JSON.stringify(specifier.text + '.mjs'),
    });
  }
  let compiled = output;
  for (const edit of edits.sort((a, b) => b.start - a.start))
    compiled =
      compiled.slice(0, edit.start) + edit.text + compiled.slice(edit.end);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, compiled);
  return destination;
}

const catalog = await import(
  pathToFileURL(compileMetadata(resolve(data, 'pipe-catalog.ts'))).href
);
assert.equal(catalog.PIPE_DOCS.length, 101);
const destination = resolve(root, '.artifacts/examples');
mkdirSync(destination, { recursive: true });
const imports = [],
  components = [],
  tags = [];
for (const [index, pipe] of catalog.PIPE_DOCS.entries()) {
  const name = 'Example' + index,
    selector = 'app-example-' + index;
  const code = catalog
    .standaloneCode(pipe)
    .replace('@Component({', `@Component({\n  selector: '${selector}',`)
    .replace('export class ExampleComponent', 'export class ' + name);
  assert.ok(
    code.includes("from 'extra-pipe'"),
    'Missing package import for ' + pipe.selector
  );
  writeFileSync(resolve(destination, `example-${index}.ts`), code);
  imports.push(`import { ${name} } from './example-${index}';`);
  components.push(name);
  tags.push(`<${selector} />`);
}
writeFileSync(
  resolve(destination, 'examples.component.ts'),
  "import { Component } from '@angular/core';\n" +
    imports.join('\n') +
    `\n@Component({selector:'app-examples',standalone:true,imports:[${components.join(',')}],template:\`${tags.join('\n')}\`})\nexport class ExamplesComponent {}\n`
);
console.log(
  'Generated all 101 actual website snippets for packed-consumer template compilation.'
);
