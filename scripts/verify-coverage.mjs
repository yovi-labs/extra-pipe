import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const summary = JSON.parse(
  readFileSync('coverage/extra-pipe/coverage-summary.json', 'utf8')
);
assert.ok(
  summary.total.lines.pct >= 90 && summary.total.branches.pct >= 80,
  'Existing overall coverage gates'
);
for (const domain of [
  'text',
  'collections',
  'objects',
  'metrics',
  'numbers',
  'dates',
]) {
  const entry = Object.entries(summary).find(([file]) =>
    file
      .replaceAll('\\', '/')
      .endsWith('/domains/' + domain + '/' + domain + '.functions.ts')
  );
  assert.ok(entry, 'Missing new transformation coverage ' + domain);
  assert.ok(
    entry[1].lines.pct >= 95 && entry[1].branches.pct >= 90,
    'New transformation coverage below 95% lines / 90% branches: ' + domain
  );
  console.log(
    domain +
      ': ' +
      entry[1].lines.pct +
      '% lines / ' +
      entry[1].branches.pct +
      '% branches'
  );
}
