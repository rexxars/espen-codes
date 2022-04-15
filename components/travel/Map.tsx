import React, {ReactNode} from 'react'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {FaMapMarkedAlt} from 'react-icons/fa'
import {MAPBOX_API_KEY} from '../../config/constants'
import {Geopoint} from '../../types'
import styles from './Map.module.css'
import '../MapEnvironmentInit'

export default function Map({
  center,
  marker,
  attribution,
  className,
  children,
  withHeader,
}: {
  center: Geopoint
  attribution: boolean
  marker?: Geopoint
  className?: string
  children?: ReactNode
  withHeader?: boolean
}) {
  const credits = attribution
    ? '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
    : ''

  return (
    <>
      {withHeader && (
        <div className={styles.header}>
          <FaMapMarkedAlt className={styles.headerIcon} />
          <span className={styles.headerText}>Hvor?</span>
        </div>
      )}

      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className={className}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
          id="mapbox/outdoors-v11"
          attribution={credits}
          tileSize={512}
          maxZoom={18}
          zoomOffset={-1}
          accessToken={MAPBOX_API_KEY}
        />
        {marker &&
          (children ? (
            <Marker position={marker}>
              <Popup>{children}</Popup>
            </Marker>
          ) : (
            <Marker position={marker} />
          ))}
      </MapContainer>
    </>
  )
}
