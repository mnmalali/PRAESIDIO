// Design regression checks: genuine interactions, native scroll motion, opt-out and fallback.
async page => {
  const results={workflow:[],motion:{},safety:{}}
  await page.emulateMedia({reducedMotion:'no-preference'})
  await page.setViewportSize({width:1440,height:900})
  await page.goto('http://127.0.0.1:3001/')
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='on')
  const shield=page.getByRole('button',{name:'Animate the PRAESIDIO shield',exact:true})
  await shield.focus()
  await page.keyboard.press('Enter')
  await page.waitForFunction(()=>document.querySelector('.logo-object > span').getAnimations().some(a=>a.playState==='running'))
  results.motion.keyboardAnimation='PASS'
  await page.waitForFunction(()=>document.querySelector('.logo-object > span').getAnimations().every(a=>a.playState==='finished'))
  await shield.hover({position:{x:140,y:80}})
  await page.waitForFunction(()=>getComputedStyle(document.querySelector('.logo-object > span')).transform!=='none')
  results.motion.pointerTilt='PASS'
  await page.getByRole('button',{name:'Pause motion',exact:true}).click()
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='off')
  if(!await shield.isDisabled())throw Error('Paused shield still interactive')
  if(await page.locator('.logo-journey').evaluate(el=>getComputedStyle(el).animationName)!=='none')throw Error('Scroll motion not disabled')
  results.motion.pause='PASS'
  await page.getByRole('button',{name:'Enable motion',exact:true}).click()
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='on')
  const initial=await page.locator('.logo-journey').evaluate(el=>getComputedStyle(el).transform)
  await page.evaluate(()=>window.scrollTo({top:(document.documentElement.scrollHeight-innerHeight)*.35,behavior:'instant'}))
  await page.waitForFunction(start=>getComputedStyle(document.querySelector('.logo-journey')).transform!==start,initial)
  results.motion.scrollTravel='PASS'
  results.safety.offHeroPointerEvents=await shield.evaluate(el=>getComputedStyle(el).pointerEvents)
  if(results.safety.offHeroPointerEvents!=='none')throw Error('Companion may intercept content controls')
  await page.screenshot({path:'output/playwright/redesign-logo-midjourney.png'})
  const states=[['01 Observe','See the action in context.'],['02 Assess','Give every verdict a reason.'],['03 Intervene','Keep a human in the decision.'],['04 Investigate','Follow the evidence back.']]
  for(const [name,title] of states){
    await page.getByRole('radio',{name,exact:true}).check()
    await page.getByRole('heading',{name:title,exact:true}).waitFor()
    results.workflow.push({name,content:'PASS'})
  }
  await page.getByRole('radio',{name:'01 Observe',exact:true}).focus()
  await page.keyboard.press('ArrowRight')
  if(!await page.getByRole('radio',{name:'02 Assess',exact:true}).isChecked())throw Error('Workflow keyboard navigation failed')
  results.workflow.push({keyboard:'PASS'})
  await page.emulateMedia({reducedMotion:'reduce'})
  await page.getByRole('button',{name:'Motion disabled by system preference',exact:true}).waitFor()
  await page.waitForFunction(()=>document.documentElement.dataset.motion==='off')
  results.motion.reducedMotion={animation:await page.locator('.logo-journey').evaluate(el=>getComputedStyle(el).animationName),toggleDisabled:await page.getByRole('button',{name:'Motion disabled by system preference',exact:true}).isDisabled()}
  if(results.motion.reducedMotion.animation!=='none'||!results.motion.reducedMotion.toggleDisabled)throw Error('System preference not honored')
  await page.emulateMedia({reducedMotion:'no-preference'})
  await page.goto('http://127.0.0.1:3001/')
  await page.setViewportSize({width:375,height:900})
  results.safety.mobileCompanionPosition=await page.locator('.logo-journey').evaluate(el=>getComputedStyle(el).position)
  if(results.safety.mobileCompanionPosition!=='absolute')throw Error('Mobile companion overlays scrolling content')
  await page.setViewportSize({width:1440,height:900})
  return results
}
