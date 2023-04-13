import puppeteer from 'puppeteer'

declare global {
  interface Window {
    jQuery?: { fn: { jquery: string } }
    $?: { fn: { jquery: string } }
  }
}

export default async function getVersion(url: string) {
  const launchOpts = process.env.CHROMIUM_FLAGS
    ? { args: process.env.CHROMIUM_FLAGS.split(/\s+/) }
    : {}
  const browser = await puppeteer.launch(launchOpts)
  const page = await browser.newPage()
  await page.goto(url)

  const version = await page.evaluate(() => {
    const $ = window.jQuery || window.$
    if ($) {
      return $.fn.jquery
    }
  })

  await browser.close()

  return version
}
