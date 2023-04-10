import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://detect.jquery.com',
  integrations: [mdx(), sitemap()],
  output: 'server'
})
