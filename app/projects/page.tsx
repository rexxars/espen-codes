import * as React from 'react'
import {groq} from 'next-sanity'
import {ProjectCardList} from '../../components/ProjectCardList'
import {sanityClient} from '../../config/sanity'

const query = groq`
  *[_type == $type] | order(priority asc) {
    ...,
    legacyImage {
      ...,
      asset->{_id, metadata { palette { dominant { background, title } } }}
    }
  }
`

export default async function ProjectsPage() {
  const projects = await sanityClient.fetch(query, {type: 'project'})
  return <ProjectCardList projects={projects} />
}
