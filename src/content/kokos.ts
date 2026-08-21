import {KOKOS_QUERY} from '../sanity/queries'
import {sanityClient} from 'sanity:client'
import type {Pet} from '../types/content'

export async function getKokos(): Promise<Pet | null> {
  return sanityClient.fetch<Pet | null>(KOKOS_QUERY)
}
