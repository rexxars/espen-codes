import * as React from 'react'
import {groq} from 'next-sanity'
import Layout from '../../components/Layout'
import {sanityClient} from '../../config/sanity'
import Head from 'next/head'
import {ProjectCardList} from '../../components/ProjectCardList'

const query = groq`
  *[_type == $type]
    | order (priority asc)
    | {
      ...,
      legacyImage {
        ...,
        asset->{_id, metadata { palette { dominant { background, title } } }}
      }
    }
`

export async function getStaticProps() {
  return {
    props: {
      projects: await sanityClient.fetch(query, {type: 'project'}),
    },
  }
}

export default function ProjectsPage({projects = []}) {
  return (
    <Layout>
      <Head>
        <title>Projects - Espen.Codes</title>
      </Head>
      <ProjectCardList projects={projects} />
    </Layout>
  )
}
