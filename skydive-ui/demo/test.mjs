import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:5179/'
const output = process.argv[3] || 'demo.png'

const run = async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  await page.goto(url, { waitUntil: 'networkidle' })

  // Wait for Topology svg to exist
  await page.waitForSelector('svg', { timeout: 10000 })
  // Trigger the reset view button to apply centering
  await page.click('button.demoReset')
  await page.waitForTimeout(300)

  const overlayText = await page.$eval('body', (el) => el.innerText)
  const nodes = await page.$$eval('g.node', els => els.length)
  const links = await page.$$eval('path.link', els => els.length)

  console.log(`nodes: ${nodes} links: ${links}`)
  console.log(`overlay: ${overlayText.replace(/\s+/g, ' ').trim()}`)

  await page.screenshot({ path: output, fullPage: true })
  await browser.close()

  if (nodes < 3 || links < 2) {
    process.exitCode = 1
  }
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
