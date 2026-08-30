#!/usr/bin/env node
/**
 * Measures the built dist/ as a phone on a throttled connection would see it:
 * iPhone-sized viewport at dpr 3, ~4 Mbps with 150 ms latency, and a 4x CPU
 * slowdown. Run after `npm run build` when changing anything image-related.
 *
 * This is what showed the homepage was shipping 9 MB of images to a phone and
 * taking 20 seconds to finish loading.
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { chromium } from "playwright";
const dist = resolve("dist");
const MIME={".html":"text/html",".js":"text/javascript",".css":"text/css",".webp":"image/webp",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".woff2":"font/woff2",".otf":"font/otf",".json":"application/json",".mp4":"video/mp4"};
const srv=createServer((q,r)=>{let f=join(dist,decodeURIComponent(new URL(q.url,"http://x").pathname));
 if(existsSync(join(f,"index.html")))f=join(f,"index.html");
 if(!existsSync(f)||statSync(f).isDirectory())f=join(dist,"index.html");
 try{r.writeHead(200,{"Content-Type":MIME[extname(f)]||"application/octet-stream"});r.end(readFileSync(f));}catch{r.writeHead(500).end();}});
const port=await new Promise(o=>srv.listen(0,()=>o(srv.address().port)));

const b=await chromium.launch();
const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});
const p=await c.newPage();
const cdp=await c.newCDPSession(p);
await cdp.send("Network.emulateNetworkConditions",{offline:false,downloadThroughput:(4*1024*1024)/8,uploadThroughput:(1024*1024)/8,latency:150});
await cdp.send("Emulation.setCPUThrottlingRate",{rate:4});
const t0=Date.now();
await p.goto(`http://127.0.0.1:${port}/`,{waitUntil:"load",timeout:120000});
await p.waitForTimeout(4000);
const m=await p.evaluate(()=>{
  const n=performance.getEntriesByType("navigation")[0];
  const r=performance.getEntriesByType("resource");
  const paint=performance.getEntriesByType("paint");
  const picked=r.filter(x=>/\.(webp|png|jpe?g)$/.test(x.name.split("?")[0]))
    .sort((a,b)=>(b.transferSize||0)-(a.transferSize||0)).slice(0,8)
    .map(x=>Math.round((x.transferSize||0)/1024)+" KB  "+x.name.split("/").pop());
  return {fcp:Math.round(paint.find(x=>x.name==="first-contentful-paint")?.startTime||0),
    dcl:Math.round(n.domContentLoadedEventEnd),load:Math.round(n.loadEventEnd),
    kb:Math.round((r.reduce((s,x)=>s+(x.transferSize||0),0)+n.transferSize)/1024), picked};
});
console.log(`  first paint : ${m.fcp} ms`);
console.log(`  DOM ready   : ${m.dcl} ms`);
console.log(`  load event  : ${m.load} ms`);
console.log(`  transferred : ${m.kb} KB`);
console.log(`  variants the phone chose:`);
m.picked.forEach(x=>console.log("     "+x));
await b.close(); srv.close();
