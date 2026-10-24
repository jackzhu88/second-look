import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
const p = await b.newPage(); await p.setViewport({width:1280,height:720});
for (const n of ['title','problem','built','close']) {
  await p.goto(`http://localhost:8931/video/slides/${n}.html`,{waitUntil:'networkidle0'});
  await p.screenshot({path:new URL(`./work/${n}.png`, import.meta.url).pathname});
}
await b.close();
