import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from '../schemas/schema'
import {SANITY_DATASET, SANITY_PROJECT_ID} from './constants'

export const sanityConfig = defineConfig({
  name: 'EspenCodes',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  plugins: [deskTool()],
  schema: {types: schemaTypes},
})
