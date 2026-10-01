import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { createStaticServer } from './serve-static.mjs';

let server, origin;
before(async()=>{
  server=createStaticServer();
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  origin='http://127.0.0.1:'+server.address().port;
});
after(()=>new Promise(resolve=>server.close(resolve)));
test('production headers constrain scripts, framing, capabilities and MIME sniffing', async()=>{
  const response=await fetch(origin);
  assert.equal(response.status,200);
  const csp=response.headers.get('content-security-policy');
  assert.match(csp,/script-src 'self';/);
  assert.doesNotMatch(csp,/unsafe-eval/);
  assert.match(csp,/frame-ancestors 'none'/);
  assert.match(csp,/require-trusted-types-for 'script'/);
  assert.equal(response.headers.get('x-content-type-options'),'nosniff');
  assert.equal(response.headers.get('x-frame-options'),'DENY');
  assert.match(response.headers.get('permissions-policy'),/camera=\(\)/);
});
test('all compatibility aliases redirect with exact selector casing',async()=>{
  const config=JSON.parse(readFileSync(new URL('../vercel.json',import.meta.url),'utf8'));
  for (const item of config.redirects) {
    const response=await fetch(origin+item.source,{redirect:'manual'});
    assert.equal(response.status,308);
    assert.equal(response.headers.get('location'),item.destination);
  }
  assert.equal((await fetch(origin+'/pipes/filesize',{redirect:'manual'})).status,200);
});
test('unknown URLs return real 404, unsupported mutations return 405',async()=>{
  const response=await fetch(origin+'/does-not-exist');
  assert.equal(response.status,404);
  assert.match(await response.text(),/noindex/);
  assert.equal((await fetch(origin,{method:'POST'})).status,405);
});
test('HTML is revalidated and hashed assets are immutable',async()=>{
  const html=await fetch(origin);
  assert.equal(html.headers.get('cache-control'),'no-cache');
  const directory=resolve('projects/test-app/dist/extra-pipe-website/browser');
  const asset=readdirSync(directory).find(name=>/^main-.*\.js$/.test(name));
  assert.ok(asset);
  const response=await fetch(origin+'/'+asset);
  assert.match(response.headers.get('cache-control'),/immutable/);
});
test('built pages contain no executable inline scripts',()=>{
  const directory=resolve('projects/test-app/dist/extra-pipe-website/browser');
  const visit=path=>{
    for (const file of readdirSync(path,{withFileTypes:true})) {
      const target=resolve(path,file.name);
      if(file.isDirectory()) visit(target);
      else if(file.name.endsWith('.html')) {
        const html=readFileSync(target,'utf8');
        for(const tag of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
          const attrs=tag[1];
          assert.ok(/\bsrc=/.test(attrs)||/type="application\/(?:json|ld\+json)"/.test(attrs),target+' has executable inline script');
        }
      }
    }
  };
  visit(directory);
});

