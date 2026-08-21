import {RESUME_QUERY} from '../sanity/queries'
import {sanityClient} from 'sanity:client'
import type {JsonResume} from '../types/resume'

export async function getResume(): Promise<JsonResume | null> {
  return sanityClient.fetch<JsonResume | null>(RESUME_QUERY)
}
