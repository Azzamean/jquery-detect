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
  try {
    await page.goto(normalizeUrl(url), {
      timeout: 60000,
      waitUntil: 'load'
    })

    version = await page.evaluate(() => {
      const $ = window.jQuery || window.$
      if ($) {
        return $.fn.jquery
      }
    })
  } catch (error) {
    throw error
  } finally {
    await context.close()
  }

  return version
}
