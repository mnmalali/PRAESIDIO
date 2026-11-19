async page => {
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:3001/');await page.locator('.logo-journey[data-path="active"]').waitFor();
 const frames=await page.locator('.logo-journey').evaluate(el=>el.getAnimations()[0].effect.getKeyframes().map(f=>f.offset));
 const checks=[];
 for(const [index,selector,side] of [[2,'.scenario-picker','left'],[5,'.feature-switcher','left'],[7,'.context-feature','top'],[8,'.review-feature','top'],[9,'.evidence-visual','left'],[10,'.self-host h2','left']]) {
 const progress=(frames[index*25]+frames[index*25+1])/2;
 await page.evaluate(p=>window.scrollTo({top:p*(document.documentElement.scrollHeight-innerHeight),behavior:'instant'}),progress);await page.waitForTimeout(100);
 const a=await page.locator('.logo-journey').boundingBox(),b=await page.locator(selector).boundingBox();
 const gap=side==='left'?b.x-a.x-a.width:b.y-a.y-a.height;
 const alignment=side==='left'?Math.abs(a.y+a.height/2-b.y-b.height/2):Math.abs(a.x+a.width/2-b.x-b.width/2);
 if(Math.abs(gap-20)>2||alignment>2)throw Error(JSON.stringify({selector,gap,alignment}));
 checks.push({selector,gap,alignment});
 if(index===2||index===8)await page.screenshot({path:`output/playwright/refined-landing-${index}.png`});
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.documentElement.dataset.motion==='off');
 if(await page.locator('.logo-journey').evaluate(el=>el.getAnimations().length))throw Error('Motion not disabled');
 await page.emulateMedia({reducedMotion:'no-preference'});
 return {checks,reducedMotion:'PASS'};
}
