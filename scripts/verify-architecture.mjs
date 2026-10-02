import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import ts from 'typescript';

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory()
      ? files(path)
      : path.endsWith('.ts') && !path.endsWith('.spec.ts')
        ? [path]
        : [];
  });
}
function imports(file) {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
  return source.statements
    .filter(
      statement =>
        ts.isImportDeclaration(statement) && !statement.importClause?.isTypeOnly
    )
    .map(statement => statement.moduleSpecifier.text);
}
for (const file of files('projects/extra-pipe/src/lib/internal')) {
  assert.ok(
    imports(file).every(
      specifier =>
        !specifier.startsWith('@angular/') && !specifier.includes('domains')
    ),
    'Internal helpers cannot depend on Angular or domains: ' + file
  );
}
for (const file of files('projects/extra-pipe/src/lib/domains').filter(
  file => file.endsWith('.functions.ts') || file.endsWith('.types.ts')
)) {
  assert.ok(
    imports(file).every(
      specifier =>
        !specifier.startsWith('@angular/') &&
        !specifier.includes('/pipes/') &&
        !specifier.includes('test-app')
    ),
    'Pure transformations cannot depend on adapters/framework/website: ' + file
  );
}
for (const file of files('projects/test-app/src/app/data')) {
  assert.ok(
    imports(file).every(specifier => specifier.startsWith('.')),
    'Example metadata cannot import executable library/framework code: ' + file
  );
}
for (const file of files('projects/test-app/src/app/features/playground')) {
  const code = readFileSync(file, 'utf8');
  assert.ok(
    !/\bas\s+(?:never|any)\b|\beval\s*\(|new\s+Function\s*\(/.test(code),
    'Playground cannot force unknown values or execute source: ' + file
  );
}
for (const file of [
  'projects/test-app/src/app/app.ts',
  'projects/test-app/src/app/features/home.ts',
  'projects/test-app/src/app/features/catalog.ts',
]) {
  assert.ok(
    imports(file).every(
      specifier =>
        !specifier.includes('playground') && !specifier.includes('adapters')
    ),
    'Executable playground must remain lazy: ' + file
  );
}
const routes = readFileSync('projects/test-app/src/app/app.routes.ts', 'utf8');
assert.ok(
  routes.includes('loadComponent:'),
  'Website routes must lazy-load components'
);
assert.ok(
  !imports('projects/test-app/src/app/app.routes.ts').some(specifier =>
    specifier.includes('/features/')
  ),
  'Route table must not eagerly import pages'
);
console.log(
  'PASS architecture: framework-free transformations, dependency-directed helpers, inert metadata, typed whitelist and lazy playground.'
);
