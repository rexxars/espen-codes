import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {jsonResume} from '../plugins/sanity-plugin-jsonresume/src'
import {schemaTypes} from '../schemas/schema'
import {SANITY_DATASET, SANITY_PROJECT_ID} from './constants'
import {structure} from './structure'

export const sanityConfig = defineConfig({
  name: 'EspenCodes',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  plugins: [deskTool({structure}), jsonResume()],
  schema: {types: schemaTypes},
  basePath: '/studio',
})
