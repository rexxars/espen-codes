import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {jsonResume} from './plugins/sanity-plugin-jsonresume/src'
import {schemaTypes} from './schemas/schema'
import {SANITY_DATASET, SANITY_PROJECT_ID} from './src/constants'
import {structure} from './src/sanity/structure'

export default defineConfig({
  name: 'EspenCodes',
  title: 'Espen.Codes',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  plugins: [structureTool({structure}), jsonResume()],
  schema: {types: schemaTypes},
})
