async page => {
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:3001/');await page.locator('.logo-journey[data-path="active"]').waitFor();
 const frames=await page.locator('.logo-journey').evaluate(el=>el.getAnimations()[0].effect.getKeyframes().length);
 if(frames<250)throw Error('Missing path anchors: '+frames);
 const samples=[];
 for(const [name,selector] of [['demo','.scenario-picker'],['workflow','.feature-switcher'],['features','.review-feature'],['end','.closing-mark']]) {
 await page.locator(selector).evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.46,behavior:'instant'}));
 await page.waitForTimeout(200);
 samples.push({name,box:await page.locator('.logo-journey').boundingBox()});
 await page.screenshot({path:`output/playwright/pdf-path-${name}.png`});
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.documentElement.dataset.motion==='off');
 const reduced=await page.locator('.logo-journey').evaluate(el=>el.getAnimations().length);if(reduced)throw Error('Reduced motion still animates');
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width:375,height:900});
 await page.waitForTimeout(100); const mobile=await page.locator('.logo-journey').evaluate(el=>el.getAnimations().length);if(mobile)throw Error('Mobile path active');
 return {frames,samples,reduced,mobile};
}
