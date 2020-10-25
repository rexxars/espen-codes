import {createClient} from 'next-sanity'
import {SANITY_DATASET, SANITY_PROJECT_ID} from './constants'

const config = {projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET}

export const sanityClient = createClient(config)
