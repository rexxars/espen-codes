import * as React from 'react'
import {Block} from '@sanity/types'
import {groq} from 'next-sanity'
import {Kokos} from '../components/Kokos'
import {Layout} from '../components/Layout'
import {sanityClient} from '../config/sanity'

export async function getStaticProps() {
  return {
    props: {
      kokos: await sanityClient.fetch(groq`*[_type == $type && slug.current == $slug][0] { bio }`, {
        type: 'pet',
        slug: 'kokos',
      }),
    },
  }
}

export default function KokosPage({kokos}: {kokos: {bio: Block[]}}) {
  return (
    <Layout>
      <Kokos bio={kokos.bio} />
    </Layout>
  )
}
