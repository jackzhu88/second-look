import puppeteer from 'puppeteer-core';
import fs from 'fs';
const W=new URL('./work', import.meta.url).pathname;
const sc = JSON.parse(fs.readFileSync(`${W}/timed.json`));
const S = Object.fromEntries(sc.map(s => { let t=0.3; const L=s.durs.map(d=>{const a=t; t+=d+0.35; return a;}); return [s.id,{...s,L}]; }));
const only = process.argv[2];
const b = await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--hide-scrollbars']});
const p = await b.newPage(); await p.setViewport({width:1280,height:720});
const CURSOR = `(()=>{const add=()=>{if(document.getElementById('fc'))return;const c=document.createElement('div');c.id='fc';
c.innerHTML='<svg width="28" height="28" viewBox="0 0 24 24"><path d="M4 2l16 11-7 1.5L9 22z" fill="#111" stroke="#fff" stroke-width="1.6"/></svg>';
c.style.cssText='position:fixed;left:0;top:0;z-index:99999;pointer-events:none;transform:translate(640px,400px);transition:none';
document.body.appendChild(c);const r=document.createElement('div');r.id='fr';r.style.cssText='position:fixed;z-index:99998;pointer-events:none;width:36px;height:36px;border-radius:50%;border:3px solid #0F6B6B;opacity:0;left:0;top:0';document.body.appendChild(r);
addEventListener('mousemove',e=>{c.style.transform='translate('+(e.clientX-3)+'px,'+(e.clientY-2)+'px)'},true);
addEventListener('mousedown',e=>{r.style.transition='none';r.style.left=(e.clientX-18)+'px';r.style.top=(e.clientY-18)+'px';r.style.opacity='1';r.style.transform='scale(.5)';requestAnimationFrame(()=>{r.style.transition='all .5s ease-out';r.style.opacity='0';r.style.transform='scale(1.6)'})},true);};
if(document.body)add();else addEventListener('DOMContentLoaded',add);})();`;
await p.evaluateOnNewDocument(CURSOR);
let mx=640,my=400;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function moveTo(sel, steps=22, frame=p){ const h=typeof sel==='string'?await frame.$(sel):sel; const bb=await h.boundingBox(); const x=bb.x+Math.min(bb.width/2,60), y=bb.y+bb.height/2; await p.mouse.move(x,y,{steps}); mx=x;my=y; }
async function click(sel){ await moveTo(sel); await sleep(150); await p.mouse.down(); await sleep(60); await p.mouse.up(); }
async function chip(label){ const hs=await p.$$('#sample-buttons .chip'); for(const h of hs){ if((await h.evaluate(e=>e.textContent)).includes(label)) return click(h);} throw new Error('chip '+label); }
async function mark(tactic){ return p.$(`#highlighted mark[data-tactic="${tactic}"]`); }
async function scrollTo(js){ await p.evaluate(js); await sleep(900); }
async function run(id, fn){
  if(only && only!==id) return;
  const s=S[id]; const D=s.total; const rec=await p.screencast({path:`${W}/${id}.webm`});
  await sleep(500); const t0=Date.now(); const at=async t=>{const w=t*1000-(Date.now()-t0); if(w>0) await sleep(w);};
  await fn(at, s.L); await at(D+0.3); await rec.stop(); console.log(id,'done',((Date.now()-t0)/1000).toFixed(1),'/',D);
}
await p.goto('http://localhost:8931/index.html',{waitUntil:'networkidle0'});
await p.evaluate(()=>{localStorage.clear()}); await p.reload({waitUntil:'networkidle0'});
const prep = async (id)=>{ // bring page to the state that the scene starts from when recording one scene alone
  if(!only) return;
  if(['s5','s6'].includes(id)){} 
  if(id==='s6'){ await chip('Grandma'); await sleep(1200);} 
  if(id==='s8'){ await chip('Normal'); await sleep(1200);} 
};
await prep(only);
await run('s3', async(at,L)=>{ await at(0.2); await moveTo('#message',30); await at(L[1]); await moveTo('.badge',30); await at(L[1]+3.2); await moveTo('#sample-buttons .chip',30); });
await run('s4', async(at,L)=>{ await at(0.3); await chip('Package'); await at(L[1]); await moveTo('#verdict-title');
  await at(L[2]); const ms=await p.$$('#highlighted mark[data-tactic]'); for(const m of ms){ await moveTo(m,14); await sleep(1300);} 
  await at(L[3]); await click('#highlighted mark.link'); await sleep(1500); await moveTo('#links li',20); });
await run('s5', async(at,L)=>{ await at(0.1); await scrollTo(()=>scrollTo({top:0,behavior:'smooth'})); await chip('Grandma');
  await at(L[1]); const ms=await p.$$('#highlighted mark[data-tactic]'); for(const m of ms.slice(0,3)){ await moveTo(m,12); await sleep(500);} 
  await at(L[2]); await click(await mark('secrecy')); await at(L[3]); await click(await mark('payment')); });
await run('s6', async(at,L)=>{ await at(0.2); await scrollTo(()=>document.getElementById('steps-card').scrollIntoView({behavior:'smooth',block:'start'}));
  await moveTo('#steps li:last-child',30);
  await at(L[1]); await click('#ask'); await sleep(900); await moveTo('#ask-status',25); });
await run('s7', async(at,L)=>{ await at(0.1); await scrollTo(()=>scrollTo({top:0,behavior:'smooth'})); await chip('Normal'); await sleep(1600); await moveTo('#verdict-advice',25); });
await run('s8', async(at,L)=>{ await at(0.3); await click('#large-toggle'); await sleep(300); await scrollTo(()=>document.getElementById('verdict').scrollIntoView({behavior:'smooth',block:'start'})); await moveTo('#verdict-title',25);
  await at(3.2); await p.goto('http://localhost:8931/video/slides/phone.html',{waitUntil:'networkidle0'});
  const f=p.frames().find(fr=>fr.url().endsWith('/index.html'));
  await f.evaluate(()=>{const c=[...document.querySelectorAll('#sample-buttons .chip')].find(x=>x.textContent.includes('Grandma')); c.click();}); });
await b.close();
