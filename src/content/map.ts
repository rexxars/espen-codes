// @env worker

import {createClient} from '@sanity/client'
import {env} from 'cloudflare:workers'

import {DIARY_API_VERSION, DIARY_DATASET, DIARY_PROJECT_ID} from '../constants'
import type {MapPath} from '../types/map'

const MAP_PATHS_QUERY = `
  *[_type == "activity" && hidden != true] {
    "path": path.points[] {
      lat,
      lng
    }
  }.path
`

export async function getMapPaths(): Promise<MapPath[]> {
  if (!env.DIARY_API_TOKEN) {
    console.warn('DIARY_API_TOKEN is not configured; rendering the map without activity paths.')
    return []
  }

  const diaryClient = createClient({
    apiVersion: DIARY_API_VERSION,
    dataset: DIARY_DATASET,
    projectId: DIARY_PROJECT_ID,
    token: env.DIARY_API_TOKEN,
    useCdn: false,
  })

  return diaryClient.fetch<MapPath[]>(MAP_PATHS_QUERY)
}
