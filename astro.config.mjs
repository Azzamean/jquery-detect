import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import svelte from '@astrojs/svelte'

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true
  },
  site: 'https://detect.jquery.com',
  integrations: [svelte()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    host: '0.0.0.0'
  }
})
