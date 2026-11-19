// Public website links and demo isolation; no third-party requests.
async page => {
  const results={links:[],anchors:[],assets:[]}
  for(const path of ['/','/product','/security','/docs','/changelog','/about','/contact']) {
    await page.goto('http://127.0.0.1:3001'+path)
    const links=await page.locator('a[href]').evaluateAll(els=>els.map(a=>a.getAttribute('href')))
    for(const href of [...new Set(links)]) {
      if(href.startsWith('#')) {
        const exists=await page.locator(href).count()>0
        if(!exists)throw Error(`Missing anchor ${path}${href}`)
        results.anchors.push({path,href,exists})
      } else if(href.startsWith('/')) {
        const response=await page.request.get('http://127.0.0.1:3001'+href)
        if(response.status()!==200)throw Error(`Broken link ${href}`)
        results.links.push({href,status:response.status()})
      }
    }
  }
  for(const path of ['/robots.txt','/sitemap.xml','/opengraph-image','/icon.png','/praesidio-logo.png','/LICENSE.txt','/licenses/geist-OFL.txt']) {
    const res=await page.request.get('http://127.0.0.1:3001'+path)
    if(res.status()!==200)throw Error(`Missing asset ${path}`)
    results.assets.push({path,status:res.status(),type:res.headers()['content-type']})
  }
  await page.goto('http://127.0.0.1:3001/')
  await page.waitForLoadState('networkidle')
  const requests=[]
  const track=req=>requests.push({method:req.method(),url:req.url()})
  page.on('request',track)
  for(const name of ['Routine action','Human review','Risky action'])await page.getByRole('radio',{name,exact:true}).check()
  page.off('request',track)
  if(requests.length)throw Error('Demo triggered network requests')
  results.demoRequests=requests.length
  return results
}
