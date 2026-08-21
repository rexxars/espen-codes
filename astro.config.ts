import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import sanity from '@sanity/astro'
import {defineConfig} from 'astro/config'

import {SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID} from './src/constants'

export default defineConfig({
  site: 'https://espen.codes',
  server: {port: 3333},
  output: 'static',
  session: false,
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [
    sanity({
      apiVersion: SANITY_API_VERSION,
      dataset: SANITY_DATASET,
      projectId: SANITY_PROJECT_ID,
      studioBasePath: '/studio',
      studioRouterHistory: 'browser',
      useCdn: false,
    }),
    react(),
  ],
})
