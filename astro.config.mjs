import { defineConfig } from 'astro/config'
import image from '@astrojs/image'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://detect.jquery.com',
  integrations: [sitemap(), image()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 8000
  }
})
