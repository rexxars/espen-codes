import * as React from 'react'
import Head from 'next/head'
import {groq} from 'next-sanity'
import {Layout} from '../../components/Layout'
import {travelGuideClient} from '../../config/sanity'

export async function getStaticProps() {
  return {
    props: {
      guide: await travelGuideClient.fetch(groq`*[_type == $type] { "slug": slug.current }`, {
        type: 'guide',
      }),
    },
  }
}

export default function TravelGuides() {
  return (
    <Layout>
      <Head>
        <title key="title">Travel guides - Espen.Codes</title>
      </Head>

      <p>Nothing to report here! Come back later?</p>
    </Layout>
  )
}
