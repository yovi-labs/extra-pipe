import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const [major, minor] = process.versions.node.split('.').map(Number);
if (major !== 24 || minor < 15)
  throw new Error('Vercel website builds require Node 24.15+.');
if (!process.env.npm_execpath) throw new Error('Use npm run build:vercel.');
const root = fileURLToPath(new URL('..', import.meta.url));
function run(args) {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error('Vercel build step failed.');
}
const npm = args => run([process.env.npm_execpath, ...args]);
// Node 20 is isolated to the Angular 17 compatibility compiler, never deployed.
// Pin the build helper; the public site itself builds/hydrates with Angular 22.
npm([
  'exec',
  '--yes',
  '--package=node@20.20.2',
  '--',
  'node',
  'node_modules/ng-packagr/cli/main.js',
  '-p',
  'projects/extra-pipe/ng-package.json',
  '-c',
  'projects/extra-pipe/tsconfig.lib.prod.json',
]);
run(['scripts/finalize-package.mjs']);
npm(['run', 'check:package']);
run(['scripts/prepare-website.mjs']);
npm(['--prefix', 'projects/test-app', 'run', 'test:ci']);
npm(['--prefix', 'projects/test-app', 'run', 'build']);
npm(['run', 'check:security']);
console.log('Verified static output ready. This command does not deploy.');
