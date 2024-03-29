import type {Image} from '@sanity/types'
import {createClient} from 'next-sanity'
import {isMaterializedImage, MaterializedImage} from '../types/types'
import {SANITY_DATASET, SANITY_PROJECT_ID} from './constants'

const apiVersion = '2021-12-15'
const projectId = SANITY_PROJECT_ID
const dataset = SANITY_DATASET
const config = {projectId, dataset, apiVersion, useCdn: true}

export const sanityClient = createClient(config)

export const urlForImage = (image: Image | MaterializedImage): string => {
  const id = isMaterializedImage(image) ? image.asset._id : image.asset._ref
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${idToFilename(id)}`
}

function idToFilename(id: string): string {
  return id.replace(/^image-/, '').replace(/-([a-z]+)$/, '.$1')
}
