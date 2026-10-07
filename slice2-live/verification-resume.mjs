import { chromium } from '/home/uni/Code/cohere-wt-slice2/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const out='/home/uni/.hermes/cache/scratch/slice2-live';
const browser=await chromium.launch({headless:true});
const prior=JSON.parse(fs.readFileSync(out+'/results.json'));const results=prior.results.filter(r=>r.width!==1280),errors=prior.errors,failed=prior.failed,blocked=prior.blocked;let eventPath=prior.eventPath;
for(const [width,height] of [[1280,800]]) for(const lang of ['en','es']) {
 const context=await browser.newContext({viewport:{width,height},locale:'en-US'});
 await context.route('**/*',async route=>{const r=route.request();if(!['GET','HEAD','OPTIONS'].includes(r.method())){blocked.push({method:r.method(),url:r.url()});await route.abort();}else await route.continue();});
 const page=await context.newPage();let current;
 page.on('pageerror',e=>errors.push({current,error:e.message}));
 page.on('response',r=>{if(r.status()>=400&&new URL(r.url()).origin==='https://cohereboulder.org')failed.push({current,status:r.status(),url:r.url(),type:r.request().resourceType()});});
 page.on('requestfailed',r=>failed.push({current,url:r.url(),failure:r.failure(),type:r.resourceType()}));
 for(const path of ['/events','/board','/','/calendar','/register']){
 current={width,height,lang,path};await page.goto('https://cohereboulder.org'+path,{waitUntil:'networkidle'});
 if(lang==='es' && await page.getByRole('button',{name:'En/Es',exact:true}).count())await page.getByRole('button',{name:'En/Es',exact:true}).click();
 await page.waitForTimeout(500);
 if(!eventPath)eventPath=await page.locator('a[href^="/events/"]').first().getAttribute('href').catch(()=>null);
 const data=await page.evaluate(()=>{const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom}};const visible=e=>!!(e&&e.getBoundingClientRect().height&&getComputedStyle(e).display!=='none'); const header=document.querySelector('body nav');const tabs=document.querySelector(innerWidth<768?'[data-testid="bottom-tabs"]':'[data-testid="header-tabs"]');return {scrollWidth:document.documentElement.scrollWidth,innerWidth,header:rect(header),headerItems:[...header.querySelectorAll('a,button')].filter(visible).map(e=>({text:e.innerText,...rect(e)})),tabsVisible:visible(tabs),tabs:[...tabs.querySelectorAll('a')].map(e=>({text:e.innerText,href:e.getAttribute('href'),active:e.getAttribute('aria-current'),weight:getComputedStyle(e).fontWeight,background:getComputedStyle(e).backgroundColor,border:getComputedStyle(e).borderBottomColor})),main:document.querySelector('main')?.innerText||'',bodyText:document.body.innerText,join:[...document.querySelectorAll('main a,main button')].filter(e=>/Join COhere|Únete a COhere/.test(e.innerText)).map(e=>({text:e.innerText,background:getComputedStyle(e).backgroundColor}))};});
 const stem=`${path==='/'?'home':path.slice(1)}-${width}x${height}-${lang}`;
 await page.screenshot({path:`${out}/${stem}.png`,fullPage:true});
 if(width===800){await page.addStyleTag({content:'html {filter:grayscale(1)!important}'});await page.screenshot({path:`${out}/${stem}-greyscale.png`,fullPage:true});await page.evaluate(()=>document.querySelector('style:last-of-type')?.remove());}
 if(width===390){await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight));await page.waitForTimeout(200);data.footer=await page.evaluate(()=>{const bar=document.querySelector('[data-testid="bottom-tabs"]').getBoundingClientRect();const f=document.querySelector('footer');const items=[...f.querySelectorAll('a,button,input,span')].filter(e=>e.getBoundingClientRect().height);return {barTop:bar.top,lastContentBottom:Math.max(...items.map(e=>e.getBoundingClientRect().bottom)),scrollY,maxScroll:document.documentElement.scrollHeight-innerHeight};});await page.screenshot({path:`${out}/${stem}-bottom.png`});}
 if(path==='/board'){
 await page.evaluate(()=>window.scrollTo(0,0));await page.getByRole('button',{name:lang==='en'?'Join COhere':'Únete a COhere',exact:true}).click();
 const dialog=page.getByRole('dialog');await dialog.waitFor();await page.waitForTimeout(350);data.dialogText=await dialog.innerText();await page.screenshot({path:`${out}/dialog-${width}x${height}-${lang}.png`});await dialog.getByRole('button',{name:lang==='en'?'Close dialog':'Cerrar diálogo',exact:true}).click();await dialog.waitFor({state:'hidden'});data.dialogClosed=await dialog.count()===0;
 }
 results.push({...current,...data});fs.writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,failed,blocked,eventPath},null,2));
 }
 await context.close();
}
if(eventPath){const p=await browser.newPage();await p.route('**/*',async route=>{if(!['GET','HEAD','OPTIONS'].includes(route.request().method()))await route.abort();else await route.continue();});p.on('pageerror',e=>errors.push({current:'event-detail',error:e.message}));const r=await p.goto('https://cohereboulder.org'+eventPath,{waitUntil:'networkidle'});await p.screenshot({path:`out` .replace('out',out+'/event-detail.png'),fullPage:true});results.push({path:eventPath,status:r.status(),text:await p.locator('body').innerText()});}
fs.writeFileSync(`${out}/results.json`,JSON.stringify({results,errors,failed,blocked,eventPath},null,2));await browser.close();
