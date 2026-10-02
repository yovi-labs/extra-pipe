import { spawnSync } from 'node:child_process';
import {
  copyFileSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const requestedVersion = process.argv[2];
const major = Number(requestedVersion?.split('.')[0]);
if (![20, 21, 22].includes(major))
  throw new Error('Choose Angular 20–22.');
let tarball = resolve(process.argv[3] ?? '.artifacts/extra-pipe.tgz');
if (statSync(tarball).isDirectory()) {
  const files = readdirSync(tarball).filter(name =>
    /^extra-pipe.*\.tgz$/.test(name)
  );
  if (files.length !== 1)
    throw new Error('Expected exactly one packed library.');
  tarball = resolve(tarball, files[0]);
}
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Use npm run check:compat -- <major> <tarball>.');
const directory = mkdtempSync(
  resolve(tmpdir(), 'extra-pipe-angular' + major + '-')
);
const consumer = resolve(directory, 'consumer');
function npm(args, cwd = directory, capture = false) {
  const result = spawnSync(process.execPath, [npmCli, ...args], {
    cwd,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
    env: { ...process.env, NG_CLI_ANALYTICS: 'false' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error('Consumer check failed: ' + args.join(' '));
  return result.stdout;
}
const available = JSON.parse(
  npm(['view', '@angular/cli@' + requestedVersion, 'version', '--json'], directory, true)
);
const cli = Array.isArray(available) ? available.at(-1) : available;
console.log('Testing Angular CLI ' + cli + ' on Node ' + process.versions.node);
npm([
  'exec',
  '--yes',
  '--package=@angular/cli@' + cli,
  '--',
  'ng',
  'new',
  'consumer',
  '--directory',
  'consumer',
  '--minimal',
  '--defaults',
  '--standalone',
  '--skip-git',
  '--skip-tests',
  '--skip-install',
  '--package-manager',
  'npm',
  '--style',
  'css',
]);
npm(['install', '--ignore-scripts'], consumer);
npm(['install', '--ignore-scripts', tarball], consumer);
copyFileSync(
  fileURLToPath(
    new URL('../fixtures/compatibility/consumer.component.ts', import.meta.url)
  ),
  resolve(consumer, 'src/compatibility.component.ts')
);
for (const file of [
  'expansion.component.ts',
  'legacy.component.ts',
  'single.component.ts',
])
  copyFileSync(
    fileURLToPath(
      new URL('../fixtures/compatibility/' + file, import.meta.url)
    ),
    resolve(consumer, 'src/' + file)
  );
writeFileSync(
  resolve(consumer, 'src/main.ts'),
  "import { bootstrapApplication } from '@angular/platform-browser';\n" +
    "import { CompatibilityComponent } from './compatibility.component';\n" +
    'bootstrapApplication(CompatibilityComponent).catch(error => console.error(error));\n'
);
npm(['exec', '--', 'ng', 'build', '--configuration', 'production'], consumer);
if (major === 22) {
  function builtScripts(directory) {
    return readdirSync(directory, { withFileTypes: true })
      .flatMap(file => {
        const path = resolve(directory, file.name);
        return file.isDirectory()
          ? builtScripts(path)
          : file.name.endsWith('.js')
            ? [readFileSync(path, 'utf8')]
            : [];
      })
      .join('\n');
  }
  const all = builtScripts(resolve(consumer, 'dist'));
  const markers = ['weightedAverageBy', 'wordCount', 'businessDaysDifference'];
  for (const marker of markers)
    if (!all.includes(marker))
      throw new Error('Full-catalogue build missing ' + marker);
  writeFileSync(
    resolve(consumer, 'src/main.ts'),
    "import { bootstrapApplication } from '@angular/platform-browser';\nimport { SingleComponent } from './single.component';\nbootstrapApplication(SingleComponent).catch(error=>console.error(error));\n"
  );
  npm(['exec', '--', 'ng', 'build', '--configuration', 'production'], consumer);
  const single = builtScripts(resolve(consumer, 'dist'));
  for (const marker of markers)
    if (single.includes(marker))
      throw new Error('Unused catalogue retained: ' + marker);
  console.log(
    'PASS tree shaking: ' +
      Buffer.byteLength(all) +
      ' all-pipe JS bytes vs ' +
      Buffer.byteLength(single) +
      ' single-pipe JS bytes; unused text/metrics/date selectors removed.'
  );
}
console.log('PASS Angular ' + major + ' packed consumer: ' + consumer);
