import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import ts from 'typescript';

function parse(file) {
  return ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
}
function property(object, name) {
  const member = object.properties.find(
    p =>
      ts.isPropertyAssignment(p) &&
      p.name.getText().replace(/^['"]|['"]$/g, '') === name
  );
  return member?.initializer;
}
function text(node) {
  return node && ts.isStringLiteral(node) ? node.text : undefined;
}
function arrayObjects(file, variable) {
  const source = parse(file),
    objects = [];
  for (const statement of source.statements)
    if (ts.isVariableStatement(statement))
      for (const declaration of statement.declarationList.declarations) {
        if (declaration.name.getText() !== variable) continue;
        let array = declaration.initializer;
        if (ts.isAsExpression(array)) array = array.expression;
        assert.ok(ts.isArrayLiteralExpression(array));
        for (const item of array.elements)
          if (ts.isObjectLiteralExpression(item)) objects.push(item);
      }
  return objects;
}
const aliases = arrayObjects(
  'projects/test-app/src/app/data/pipe-aliases.ts',
  'PIPE_ALIASES'
).map(o => ({
  selector: text(property(o, 'selector')),
  target: text(property(o, 'target')),
  className: text(property(o, 'className')),
}));
const aliasNames = new Set(aliases.map(a => a.selector)),
  visited = new Set(),
  pipes = [],
  functions = new Set();
function exportsFrom(file, declarations = false) {
  file = resolve(file);
  if (visited.has(file)) return;
  visited.add(file);
  const source = parse(file);
  for (const statement of source.statements) {
    if (ts.isExportDeclaration(statement) && statement.moduleSpecifier) {
      const spec = text(statement.moduleSpecifier);
      if (!spec?.startsWith('.')) continue;
      const target = resolve(
        dirname(file),
        spec + (declarations ? '.d.ts' : '.ts')
      );
      assert.ok(existsSync(target), 'Missing exported module ' + target);
      exportsFrom(target, declarations);
    }
    if (
      ts.isFunctionDeclaration(statement) &&
      statement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
    )
      functions.add(statement.name.text);
    if (
      declarations ||
      !ts.isClassDeclaration(statement) ||
      !statement.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)
    )
      continue;
    for (const decorator of ts.getDecorators(statement) ?? []) {
      const expression = decorator.expression;
      if (
        !ts.isCallExpression(expression) ||
        expression.expression.getText() !== 'Pipe'
      )
        continue;
      const metadata = expression.arguments[0],
        selector = text(property(metadata, 'name'));
      assert.ok(selector);
      assert.equal(
        property(metadata, 'standalone')?.kind,
        ts.SyntaxKind.TrueKeyword,
        'Not standalone: ' + selector
      );
      pipes.push({
        selector,
        className: statement.name.text,
        pure: property(metadata, 'pure')?.kind !== ts.SyntaxKind.FalseKeyword,
      });
    }
  }
}
exportsFrom('projects/extra-pipe/src/public-api.ts');
assert.equal(
  new Set(pipes.map(p => p.selector)).size,
  pipes.length,
  'Duplicate selector'
);
const canonical = pipes.filter(p => !aliasNames.has(p.selector));
assert.equal(canonical.length, 101, 'Canonical pipe count');
assert.equal(aliases.length, 0, '2.0 must expose no compatibility pipe aliases');
assert.ok(canonical.every(pipe => pipe.pure), 'All 101 canonical pipes must be pure');
const docs = [
  'projects/test-app/src/app/data/pipe-catalog.ts',
  'projects/test-app/src/app/data/expanded-pipe-docs.ts',
]
  .flatMap(file =>
    arrayObjects(
      file,
      file.includes('expanded') ? 'EXPANDED_PIPE_DOCS' : 'PIPE_DOCS'
    )
  )
  .map(o => ({
    selector: text(property(o, 'selector')),
    className: text(property(o, 'className')),
  }));
assert.equal(docs.length, 101);
assert.equal(new Set(docs.map(d => d.selector)).size, 101);
for (const pipe of canonical)
  assert.ok(
    docs.some(
      d => d.selector === pipe.selector && d.className === pipe.className
    ),
    'Missing/mismatched documentation ' + pipe.selector
  );
for (const alias of aliases) {
  assert.ok(
    pipes.some(
      p => p.selector === alias.selector && p.className === alias.className
    )
  );
  assert.ok(canonical.some(p => p.selector === alias.target));
}
const backlog = JSON.parse(readFileSync('docs/PIPE-101-BACKLOG.json', 'utf8'));
for (const entry of backlog.features) {
  assert.ok(
    functions.has(entry.name),
    'Missing public typed function ' + entry.name
  );
  assert.ok(
    canonical.some(
      p => p.selector === entry.name && p.className === entry.className
    )
  );
}
if (process.argv.includes('--packed')) {
  visited.clear();
  const manifest = JSON.parse(readFileSync('dist/extra-pipe/package.json', 'utf8'));
  exportsFrom(resolve('dist/extra-pipe', manifest.exports['.'].types), true);
  const declarationFiles = [...visited]
    .map(file => readFileSync(file, 'utf8'))
    .join('\n');
  for (const pipe of pipes) {
    assert.ok(
      declarationFiles.includes(
        'ɵɵPipeDeclaration<' + pipe.className + ', "' + pipe.selector + '"'
      ),
      'Missing packed declaration ' + pipe.selector
    );
  }
}
mkdirSync('.artifacts/inventory', { recursive: true });
writeFileSync(
  '.artifacts/inventory/canonical.json',
  JSON.stringify(
    {
      canonical: canonical.sort((a, b) => a.selector.localeCompare(b.selector)),
      aliases,
      additionalFunctions: backlog.features.map(f => f.name),
    },
    null,
    2
  )
);
console.log(
  'PASS: 101 canonical standalone pipes, no compatibility aliases, 67 new public functions, aligned documentation' +
    (process.argv.includes('--packed') ? ' and packed declarations' : '') +
    '.'
);
