import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {jsonResume} from './plugins/sanity-plugin-jsonresume/src'
import {diarySchemaTypes} from './schemas/diary/schema'
import {schemaTypes} from './schemas/schema'
import {DIARY_DATASET, DIARY_PROJECT_ID, SANITY_DATASET, SANITY_PROJECT_ID} from './src/constants'
import {structure} from './src/sanity/structure'

export default defineConfig([
  {
    name: 'website',
    title: 'Espen.Codes',
    subtitle: SANITY_DATASET,
    basePath: '/content',
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    plugins: [structureTool({structure}), jsonResume()],
    schema: {types: schemaTypes},
  },
  {
    name: 'workouts',
    title: 'Workouts',
    subtitle: DIARY_DATASET,
    basePath: '/workouts',
    projectId: DIARY_PROJECT_ID,
    dataset: DIARY_DATASET,
    plugins: [structureTool()],
    schema: {types: diarySchemaTypes},
  },
])
