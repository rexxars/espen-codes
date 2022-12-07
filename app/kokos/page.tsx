import * as React from 'react'
import type {PortableTextBlock} from '@portabletext/types'
import {groq} from 'next-sanity'
import {Kokos} from '../../components/Kokos'
import {sanityClient} from '../../config/sanity'

export default async function KokosPage() {
  const bio = await sanityClient.fetch<PortableTextBlock[]>(
    groq`*[_type == $type && slug.current == $slug][0].bio`,
    {
      type: 'pet',
      slug: 'kokos',
    },
  )

  return <Kokos bio={bio} />
}
