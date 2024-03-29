import * as React from 'react'
import Head from 'next/head'
import {groq} from 'next-sanity'
import {Layout} from '../../components/Layout'
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
        <title key="title">Projects - Espen.Codes</title>
      </Head>
      <ProjectCardList projects={projects} />
    </Layout>
  )
}
