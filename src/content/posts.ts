import {POSTS_QUERY} from '../sanity/queries'
import {sanityClient} from 'sanity:client'
import type {Post} from '../types/content'

export async function getPosts(): Promise<Post[]> {
  return sanityClient.fetch<Post[]>(POSTS_QUERY)
}
