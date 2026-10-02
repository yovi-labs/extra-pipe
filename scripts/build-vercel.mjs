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
// Compile with Angular 20 partial compilation on Node 24; the website uses Angular 22.
npm(['run', 'build:lib']);
npm(['run', 'check:package']);
run(['scripts/prepare-website.mjs']);
npm(['--prefix', 'projects/test-app', 'run', 'test:ci']);
npm(['--prefix', 'projects/test-app', 'run', 'build']);
npm(['run', 'check:security']);
console.log('Verified static output ready. This command does not deploy.');
