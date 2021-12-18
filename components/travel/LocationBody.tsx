import React from 'react'
import dynamic from 'next/dynamic'
import {ProjectedTravelGuideLocation, ProjectedLocation} from '../../types/types'
import {LocationType} from './LocationType'
import {LocationArea} from './LocationArea'
import {TravelPortableText} from './TravelPortableText'
import styles from './LocationBody.module.css'

const Map = dynamic(() => import('./Map'), {ssr: false})

export function LocationBody({
  location,
  guide,
}: {
  location: ProjectedLocation
  guide: ProjectedTravelGuideLocation['guide']
}) {
  const {position} = location
  return (
    <>
      <div className={styles.meta}>
        <LocationType type={location.type} />
        {location.area && <LocationArea area={location.area} />}
      </div>

      <TravelPortableText blocks={location.description} guide={guide} />

      <Map
        withHeader
        center={position}
        marker={position}
        className={styles.map}
        attribution={!guide.disableIndexing}
      />
    </>
  )
}
