import normalizeUrl from './normalizeUrl'
import puppeteer from 'puppeteer'

declare global {
  interface Window {
    jQuery?: { fn: { jquery: string } }
    $?: { fn: { jquery: string } }
  }
}

const launchOpts = process.env.CHROMIUM_FLAGS
  ? { args: process.env.CHROMIUM_FLAGS.split(/\s+/) }
  : {}
const browser = await puppeteer.launch(launchOpts)

export default async function getVersion(url: string) {
  const context = await browser.createIncognitoBrowserContext()
  const page = await context.newPage()

  let version
  function evalVersion() {
    return page.evaluate(() => {
      const $ = window.jQuery || window.$
      if ($) {
        return $.fn.jquery
      }
    })
  }

  try {
    await page.goto(normalizeUrl(url), {
      timeout: 60000,
      waitUntil: 'domcontentloaded'
    })
    version = await evalVersion()
    if (version) return version

    // Wait longer if version not detected
    console.log(`Waiting until network idle for ${url}...`)
    await page.waitForNetworkIdle({ timeout: 60000 })
    version = await evalVersion()
  } catch (error) {
    throw error
  } finally {
    await context.close()
  }

  return version
}
