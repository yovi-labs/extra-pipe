import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const output = resolve(root, 'dist/extra-pipe');
if (!existsSync(resolve(output, 'package.json'))) throw new Error('Build the library first.');
// Keep one canonical license/changelog; include them in the publishable artifact.
for (const name of ['LICENSE', 'CHANGELOG.md']) {
  copyFileSync(resolve(root, name), resolve(output, name));
}
