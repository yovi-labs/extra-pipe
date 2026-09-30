import { spawnSync } from 'node:child_process';
import { mkdirSync, renameSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Run with Node 24; the website and package compiler have independent lockfiles.
if (Number(process.versions.node.split('.')[0]) !== 24) {
  throw new Error(
    'Website preparation requires Node 24.15+. Build the library first.'
  );
}
const root = fileURLToPath(new URL('../', import.meta.url));
const artifacts = resolve(root, '.artifacts');
const website = resolve(root, 'projects/test-app');
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Run this script using npm run prepare:website.');
function npm(args, cwd, capture = false) {
  const result = spawnSync(process.execPath, [npmCli, ...args], {
    cwd,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error('npm command failed: ' + args.join(' '));
  return result.stdout;
}
mkdirSync(artifacts, { recursive: true });
const packed = JSON.parse(
  npm(
    ['pack', '--json', '--pack-destination', artifacts],
    resolve(root, 'dist/extra-pipe'),
    true
  )
);
const tarball = resolve(artifacts, 'extra-pipe.tgz');
renameSync(resolve(artifacts, packed[0].filename), tarball);
npm(['ci', '--ignore-scripts'], website);
npm(
  ['install', '--no-save', '--package-lock=false', '--ignore-scripts', tarball],
  website
);
