import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import {groq} from 'next-sanity'
import {travelGuideClient} from '../../../config/sanity'
import {ProjectedTravelGuideSplash} from '../../../types'
import {GuideHeader} from '../../../components/travel/GuideHeader'
import {TravelContent} from '../../../components/travel/TravelContent'
import {TravelPortableText} from '../../../components/travel/TravelPortableText'
import {LocationIndex} from '../../../components/travel/LocationIndex'

export default function TravelGuide(props: {guide: ProjectedTravelGuideSplash}) {
  const {guide} = props || {}
  if (!guide) {
    return null
  }

  return (
    <div>
      <Head>
        <title key="title">{guide.title}</title>
        {guide.disableIndexing && <meta name="robots" content="noindex,nofollow" />}
      </Head>

      <article>
        <GuideHeader guide={guide} />

        <TravelContent>
          <TravelPortableText blocks={guide.intro} guide={guide} />

          <Link href={`/travel-guides/${guide.slug}/1`}>
            <a style={{display: 'inline-block', marginBottom: '3rem'}}>
              First up: {guide.locationTitles[0]}
            </a>
          </Link>

          <LocationIndex locations={guide.locationTitles} guideSlug={guide.slug} />
        </TravelContent>
      </article>
    </div>
  )
}

const bySlugQuery = groq`
*[_type == $type && slug.current == $slug] {
  _id,
  title,
  disableIndexing,
  "locationIds": locations[]._ref,
  "locationTitles": locations[]->title,
  intro[] {
    ...,
    markDefs[] {
      ...,
      _type == 'annotation' => {...@->},
      _type,
    }
  },
  "slug": slug.current,
  coverImage {
    ...,
    "blurHash": asset->metadata.blurHash,
    "colors": asset->metadata.palette.dominant{
      background,
      "color": title
    }
  }
}[0]`

export async function getStaticProps({params}) {
  const guide = await travelGuideClient.fetch(bySlugQuery, {
    slug: params.slug,
    type: 'guide',
  })

  return {
    props: {guide},
  }
}

export async function getStaticPaths() {
  const slugs = await travelGuideClient.fetch(
    `*[_type == $type && defined(slug.current) && _id in path("*")][].slug.current`,
    {type: 'guide'},
  )

  return {
    paths: slugs.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}
