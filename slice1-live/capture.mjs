import { chromium } from '/home/uni/Code/cohere-wt-slice1/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const dir='/home/uni/.hermes/cache/scratch/slice1-live';
const browser=await chromium.launch({headless:true});
const results=[];
let eventUrl;
for(const [width,height] of [[390,844],[800,1067],[1067,800],[1280,800]]) {
 for(const kind of ['calendar','event']) for(const lang of ['en','es']) {
  const context=await browser.newContext({viewport:{width,height}});
  const page=await context.newPage(); const errors=[];const blocked=[];
  page.on('pageerror',e=>errors.push(e.message));
  await context.route('**/*',route=>{const r=route.request();if(!['GET','HEAD','OPTIONS'].includes(r.method())){blocked.push(r.method()+' '+r.url());return route.abort();}return route.continue();});
  await page.goto(kind==='calendar'?'https://cohereboulder.org/calendar':eventUrl,{waitUntil:'networkidle'});
  if(kind==='calendar') {await page.locator('[data-testid="event-card"]').first().waitFor();eventUrl=await page.locator('[data-testid="event-card"]').first().locator('h3 a').evaluate(a=>a.href);}
  if(lang==='es') await page.getByRole('button',{name:'En/Es',exact:true}).filter({visible:true}).first().click();
  await page.waitForTimeout(700);await page.evaluate(async()=>{await document.fonts.ready; await Promise.all([...document.images].map(i=>i.complete?Promise.resolve():new Promise(r=>{i.onload=r;i.onerror=r})));});
  const data=await page.evaluate(()=>{
   const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}};
   const cards=[...document.querySelectorAll('[data-testid="event-card"]')].map(c=>{const d=c.querySelector('[data-testid="card-description"]');const more=[...c.querySelectorAll('a')].filter(a=>['More','Más','…'].includes(a.textContent.trim()));return {title:c.querySelector('h3')?.textContent,rsvps:[...c.querySelectorAll('[data-testid="card-rsvp"]')].map(b=>({text:b.textContent,background:getComputedStyle(b).backgroundColor})),overflow:d?d.scrollHeight>d.clientHeight:false,more:more.map(a=>({text:a.textContent,href:a.href})),description:d?.textContent}});
   const group=document.querySelector('article > div.border-t');
   const secondary=group?[...group.querySelectorAll('button')].map(b=>({text:b.textContent,rect:rect(b)})):[];
   return {title:document.querySelector('h1')?.textContent,body:document.body.innerText,chrome:[...document.querySelectorAll('nav,footer,button, input')].map(e=>e.innerText||e.placeholder||'').filter(Boolean),footer:document.querySelector('footer')?.innerText,brokenImages:[...document.images].filter(i=>i.naturalWidth===0).map(i=>({src:i.src,alt:i.alt})),cards,secondary};
  });
  const file=`${kind}-${width}x${height}-${lang}.png`;await page.screenshot({path:`${dir}/${file}`,fullPage:true});
  if(width===800){await page.addStyleTag({content:'html {filter: grayscale(1) !important;}'});await page.screenshot({path:`${dir}/${kind}-${width}x${height}-${lang}-grey.png`,fullPage:true});}
  results.push({kind,lang,width,height,url:page.url(),file,errors,blocked,...data});
  await context.close();
 }
}
await fs.writeFile(`${dir}/verification.json`,JSON.stringify({eventUrl,results},null,2));
await browser.close();console.log(JSON.stringify({eventUrl,pages:results.length,errors:results.filter(r=>r.errors.length),broken:results.filter(r=>r.brokenImages.length),titles:results.slice(0,4).map(r=>r.title)}));
