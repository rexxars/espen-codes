import {createClient} from '@sanity/client'

import {DIARY_API_TOKEN, DIARY_DATASET, DIARY_PROJECT_ID} from './constants'

export const diaryClient = createClient({
  apiVersion: '2022-04-12',
  projectId: DIARY_PROJECT_ID,
  dataset: DIARY_DATASET,
  token: DIARY_API_TOKEN,
  useCdn: false,
})
