import { spawnSync } from 'node:child_process';
import { mkdtempSync, copyFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const major = Number(process.argv[2]);
if (![17,18,19,20,21,22].includes(major)) throw new Error('Choose Angular 17–22.');
let tarball = resolve(process.argv[3] ?? '.artifacts/extra-pipe.tgz');
if (statSync(tarball).isDirectory()) {
  const files = readdirSync(tarball).filter(name => /^extra-pipe.*\.tgz$/.test(name));
  if (files.length !== 1) throw new Error('Expected exactly one packed library.');
  tarball = resolve(tarball, files[0]);
}
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Use npm run check:compat -- <major> <tarball>.');
const directory = mkdtempSync(resolve(tmpdir(), 'extra-pipe-angular'+major+'-'));
const consumer = resolve(directory, 'consumer');
function npm(args,cwd=directory,capture=false) {
  const result=spawnSync(process.execPath,[npmCli,...args], {
    cwd,encoding:'utf8',stdio:capture?['ignore','pipe','inherit']:'inherit',
    env:{...process.env,NG_CLI_ANALYTICS:'false'},
  });
  if(result.error) throw result.error;
  if(result.status!==0) throw new Error('Consumer check failed: '+args.join(' '));
  return result.stdout;
}
const available = JSON.parse(npm(['view','@angular/cli@'+major,'version','--json'],directory,true));
const cli = Array.isArray(available)?available.at(-1):available;
console.log('Testing Angular CLI '+cli+' on Node '+process.versions.node);
npm(['exec','--yes','--package=@angular/cli@'+cli,'--','ng','new','consumer',
  '--directory','consumer','--minimal','--defaults','--standalone','--skip-git',
  '--skip-tests','--skip-install','--package-manager','npm','--style','css']);
npm(['install','--ignore-scripts'],consumer);
npm(['install','--ignore-scripts',tarball],consumer);
copyFileSync(fileURLToPath(new URL('../fixtures/compatibility/consumer.component.ts',import.meta.url)),
  resolve(consumer,'src/compatibility.component.ts'));
writeFileSync(resolve(consumer,'src/main.ts'),
  "import { bootstrapApplication } from '@angular/platform-browser';\n"+
  "import { CompatibilityComponent } from './compatibility.component';\n"+
  "bootstrapApplication(CompatibilityComponent).catch(error => console.error(error));\n");
npm(['exec','--','ng','build','--configuration','production'],consumer);
console.log('PASS Angular '+major+' packed consumer: '+consumer);
