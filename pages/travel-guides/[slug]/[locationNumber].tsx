import * as React from 'react'
import Head from 'next/head'
import {groq} from 'next-sanity'
import {GetServerSideProps} from 'next'
import {travelGuideClient} from '../../../config/sanity'
import {getAssumedPortraitMode} from '../../../utils/assumePortraitMode'
import {ProjectedTravelGuideLocation} from '../../../types'
import {LocationHeader} from '../../../components/travel/LocationHeader'
import {LocationBody} from '../../../components/travel/LocationBody'
import {TravelContent} from '../../../components/travel/TravelContent'
import {LocationFooterNav} from '../../../components/travel/LocationFooterNav'

export default function TravelGuideLocation({
  queryResult,
  assumePortraitMode,
}: {
  queryResult: ProjectedTravelGuideLocation
  assumePortraitMode: boolean
}) {
  const {guide, location, locationIndex, prevLocationTitle, nextLocationTitle, locationTitles} =
    queryResult || {}
  if (!location) {
    return <div>Hmm, seems to have navigated beyond what we have content for!</div>
  }

  return (
    <div>
      <Head>
        <title key="title">
          {location.title} - {guide.title}
        </title>

        {guide.disableIndexing && <meta name="robots" content="noindex,nofollow" />}
      </Head>

      <article>
        <LocationHeader
          key={location._id}
          location={location}
          guide={guide}
          assumePortraitMode={assumePortraitMode}
        />

        <TravelContent>
          <LocationBody location={location} guide={guide} />
        </TravelContent>
      </article>

      <LocationFooterNav
        guideSlug={guide.slug}
        currentIndex={locationIndex}
        prevTitle={prevLocationTitle}
        nextTitle={nextLocationTitle}
        locationTitles={locationTitles}
      />
    </div>
  )
}

const bySlugQuery = groq`
*[_type == $type && slug.current == $slug] {
  "guide": {
    _id,
    title,
    disableIndexing,
    "locationIds": locations[]._ref,
    "slug": slug.current,
    "showHeaderOnLocations": showGuideHeaderOnLocations,
  },
  "locationIndex": $locationNumber + 1,
  "locationCount": count(locations),
  "prevLocationTitle": select(
    $locationNumber == 0 => null,
    locations[$locationNumber - 1]->title
  ),
  "nextLocationTitle": locations[$locationNumber + 1]->title,
  "locationTitles": locations[]->title,
  "location": locations[$locationNumber]->{
    _id,
    title,
    area,
    position,
    type->,
    description[] {
      ...,
      markDefs[] {
        ...,
        _type == 'annotation' => {...@->},
        _type,
      }
    },
    photos[] {
      ...,
      "blurHash": asset->metadata.blurHash,
      "colors": asset->metadata.palette.dominant{
        background,
        "color": title
      }
    }
  }
}[0]`

function toInt(num: string | number): number {
  const asInt = typeof num === 'string' ? parseInt(num, 10) : num
  return isNaN(asInt) ? 0 : Math.floor(asInt)
}

export const getServerSideProps: GetServerSideProps = async ({params, req, res}) => {
  const locationNumber = Array.isArray(params.locationNumber)
    ? params.locationNumber[0]
    : params.locationNumber

  const queryResult = await travelGuideClient.fetch(bySlugQuery, {
    slug: params.slug,
    type: 'guide',
    locationNumber: Math.max(0, toInt(locationNumber) - 1),
  })

  if (!queryResult || !queryResult.location) {
    return {notFound: true}
  }

  res.setHeader('Vary', 'sec-ch-ua-mobile')

  return {props: {queryResult, assumePortraitMode: getAssumedPortraitMode(req)}}
}
