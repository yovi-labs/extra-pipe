import { spawnSync } from 'node:child_process';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
// Install the pinned QA toolchain: npm ci --prefix tools/quality
const cli=resolve('tools/quality/node_modules/lighthouse/cli/index.js');
const url=process.argv[2] ?? 'http://127.0.0.1:4203/';
const output=resolve('.artifacts/lighthouse');
mkdirSync(output,{recursive:true});
const reports=[];
for(let run=1;run<=3;run++) {
  const path=resolve(output,'mobile-'+run+'.json');
  const result=spawnSync(process.execPath,[cli,url,'--output=json','--output-path='+path,
    '--only-categories=performance,accessibility,best-practices,seo',
    '--chrome-flags=--headless --no-sandbox','--quiet'],{stdio:'inherit'});
  if(result.error) throw result.error;
  if(result.status!==0) throw new Error('Lighthouse failed.');
  const report=JSON.parse(readFileSync(path,'utf8'));
  reports.push({run,scores:Object.fromEntries(Object.entries(report.categories).map(([key,value])=>[key,Math.round(value.score*100)])),
    fcpMs:report.audits['first-contentful-paint'].numericValue,
    lcpMs:report.audits['largest-contentful-paint'].numericValue,
    tbtMs:report.audits['total-blocking-time'].numericValue});
  console.log(JSON.stringify(reports.at(-1)));
}
const median=reports.map(report=>report.scores.performance).sort((a,b)=>a-b)[1];
writeFileSync(resolve(output,'summary.json'),JSON.stringify({url,medianPerformance:median,reports},null,2));
if(median<90) throw new Error('Median mobile Lighthouse score below 90: '+median);
console.log('Median mobile performance: '+median+' (controlled local lab; verify deployed site separately)');

