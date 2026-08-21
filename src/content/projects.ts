import {PROJECTS_QUERY} from '../sanity/queries'
import {sanityClient} from 'sanity:client'
import type {Project} from '../types/content'

export async function getProjects(): Promise<Project[]> {
  return sanityClient.fetch<Project[]>(PROJECTS_QUERY)
}
