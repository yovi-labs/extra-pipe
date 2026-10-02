// Local production verification only: deployment serves static files, not this server.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, extname, relative, isAbsolute } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const repo = resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = resolve(repo, 'projects/test-app/dist/extra-pipe-website/browser');
const config = JSON.parse(readFileSync(resolve(repo, 'vercel.json'), 'utf8'));
const commonHeaders = Object.fromEntries(config.headers[0].headers.map(({key,value})=>[key,value]));
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.json':'application/json'};
export function createStaticServer() {
  if (!existsSync(resolve(output, '404.html'))) throw new Error('Build and finalize the website first.');
  return createServer((req,res)=>{
    const headers = {...commonHeaders, 'Cache-Control':'no-cache', Vary:'Accept-Encoding'};
    try {
      if (!['GET','HEAD'].includes(req.method)) {
        res.writeHead(405,{...headers,Allow:'GET, HEAD'}); return res.end();
      }
      const url = new URL(req.url, 'http://localhost');
      const route = decodeURIComponent(url.pathname);
      if (route.includes('\\') || route.includes('\0')) throw new Error('Invalid path');
      const redirect = config.redirects.find(item=>item.source===route.replace(/\/$/,''));
      if (redirect) {
        res.writeHead(308,{...headers,Location:redirect.destination+url.search}); return res.end();
      }
      const target = resolve(output, '.'+route);
      const rel = relative(output,target);
      if (rel.startsWith('..') || isAbsolute(rel)) throw new Error('Invalid path');
      let file = target;
      if (existsSync(file) && statSync(file).isDirectory()) file = resolve(file,'index.html');
      if (!existsSync(file) && !extname(file) && existsSync(file+'.html')) file += '.html';
      const found = existsSync(file) && statSync(file).isFile();
      if (!found) file = resolve(output,'404.html');
      const extension = extname(file);
      headers['Content-Type'] = types[extension] ?? 'application/octet-stream';
      if (found && /-[A-Za-z0-9_-]{8,16}\.(?:js|css)$/.test(file)) headers['Cache-Control']='public, max-age=31536000, immutable';
      let body = readFileSync(file);
      if (/\bgzip\b/.test(req.headers['accept-encoding'] ?? '') && body.length>256) {
        body=gzipSync(body); headers['Content-Encoding']='gzip';
      }
      res.writeHead(found?200:404,{...headers,'Content-Length':body.length});
      res.end(req.method==='HEAD'?undefined:body);
    } catch {
      res.writeHead(400,headers);res.end('Invalid request');
    }
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port=Number(process.env.STATIC_PORT ?? 4203);
  createStaticServer().listen(port,'127.0.0.1',()=>console.log('Static preview: http://127.0.0.1:'+port));
}
