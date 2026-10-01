import '@angular/compiler';
import { performance } from 'node:perf_hooks';
import { mkdirSync, writeFileSync } from 'node:fs';
import {
  groupBy, orderBy, uniqueBy, slugify, formatList, formatByteSize, truncateMiddle,
} from '../dist/extra-pipe/fesm2022/extra-pipe.mjs';

const items=Array.from({length:1000},(_,id)=>({id:id%100,team:id%10,name:'Item '+id}));
const longText='👩🏽‍💻 café مرحبًا '.repeat(100);
const cases=[
  ['groupBy 1000 records',()=>groupBy(items,'team')],
  ['uniqueBy 1000 records',()=>uniqueBy(items,'id')],
  ['orderBy 1000 records',()=>orderBy(items,'name')],
  ['slugify Unicode text',()=>slugify(longText)],
  ['truncateMiddle 1500+ graphemes',()=>truncateMiddle(longText,24)],
  ['listFormat 3 items',()=>formatList(['Angular','Extra Pipe','Unicode'])],
  ['byteSize formatting',()=>formatByteSize(123456789)],
];
const results=[];
for(const [name,run] of cases) {
  for(let i=0;i<50;i++) run();
  const samples=[];
  for(let sample=0;sample<5;sample++) {
    const start=performance.now();
    for(let i=0;i<200;i++) run();
    samples.push((performance.now()-start)/200);
  }
  samples.sort((a,b)=>a-b);
  results.push({name,medianMsPerCall:Number(samples[2].toFixed(4))});
}
mkdirSync('.artifacts/benchmarks',{recursive:true});
writeFileSync('.artifacts/benchmarks/functions.json',JSON.stringify({node:process.versions.node,results},null,2));
console.table(results);
console.log('Informational local baseline, not a cross-machine CI timing assertion.');

