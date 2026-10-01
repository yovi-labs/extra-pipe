import { spawnSync } from 'node:child_process';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

if (!process.env.npm_execpath) throw new Error('Use npm run check:package.');
const directory=resolve('dist/extra-pipe');
const result=spawnSync(process.execPath,[process.env.npm_execpath,'pack','--dry-run','--json'],{
  cwd:directory,encoding:'utf8',stdio:['ignore','pipe','inherit'],
});
if(result.error) throw result.error;
if(result.status!==0) throw new Error('npm pack verification failed.');
const [pack]=JSON.parse(result.stdout);
const files=new Set(pack.files.map(file=>file.path));
for(const required of ['package.json','README.md','LICENSE','CHANGELOG.md']) {
  if(!files.has(required)) throw new Error('Missing '+required);
}
for(const file of files) {
  if(/(?:^|\/)(?:node_modules|projects|test|tests|\.env|\.vercel)(?:\/|$)|\.spec\./.test(file))
    throw new Error('Unexpected development/private artifact: '+file);
}
const manifest=JSON.parse(readFileSync(resolve(directory,'package.json'),'utf8'));
if(manifest.private) throw new Error('Private workspace was packed instead of library.');
if(manifest.peerDependencies['@angular/core']!=='>=17.0.0 <23.0.0') throw new Error('Angular compatibility drift.');
if(Object.keys(manifest.dependencies).some(name=>!['tslib','unicode-segmenter'].includes(name)))
  throw new Error('Unexpected runtime dependency.');
const publicApi=readFileSync(resolve(directory,'public-api.d.ts'),'utf8');
for(const pipe of ['list-format','format-unit','display-name','date-range','number-range','byte-size',
  'truncate-middle','slugify','group-by','order-by','unique-by']) {
  if(!publicApi.includes('/'+pipe+'.pipe')) throw new Error('Missing public export: '+pipe);
}
mkdirSync('.artifacts/package',{recursive:true});
writeFileSync('.artifacts/package/surface.json',JSON.stringify(pack,null,2));
console.log(JSON.stringify({name:pack.name,version:pack.version,files:pack.entryCount,bytes:pack.size,peer:manifest.peerDependencies}));
console.log('Verified library only; not published.');

