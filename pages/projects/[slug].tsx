import * as React from 'react'
import Layout from '../../components/Layout'
import {sanityClient} from '../../config/sanity'

export default function ProjectPage(props) {
  return (
    <Layout>
      <pre>
        <code>{JSON.stringify(props, null, 2)}</code>
      </pre>
    </Layout>
  )
}

export async function getStaticProps({params}) {
  const project = await sanityClient.fetch(`*[_type == "project" && slug.current == $slug][0]`, {
    slug: params.slug,
  })

  return {
    props: {project},
  }
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "project" && defined(slug.current) && _id in path("*")][] {"slug": slug.current}`,
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}
