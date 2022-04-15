import Head from 'next/head'
import memoize from 'lodash/memoize'
import React, {useCallback, useEffect, useState} from 'react'
import {LatLng, Map, Polyline as LeafletPolyline} from 'leaflet'
import {Circle, MapContainer, Polyline, TileLayer} from 'react-leaflet'
import {MAPBOX_API_KEY} from '../../config/constants'
import '../MapEnvironmentInit'
import styles from './SfMap.module.css'

const DEFAULT_ZOOM = 13
const USE_LOCATION = true
const CAN_USE_LOCATION =
  USE_LOCATION && typeof navigator !== 'undefined' && typeof navigator.geolocation !== 'undefined'

const getPolyLine = memoize((paths) => new LeafletPolyline(paths))
const getPolyBounds = memoize((line) => line.getBounds())

export default function SanFranMap(props) {
  const [userLocation, setUserLocation] = useState(null)
  const [mapRef, setMapRef] = useState<Map | undefined>()

  const handleUserLocation = useCallback((evt) => {
    const coords = evt.coords || evt
    const {latitude: lat, longitude: lng, accuracy} = coords
    if (!userLocation) {
      setUserLocation({latLng: new LatLng(lat, lng), accuracy})
      return
    }

    if (
      userLocation.lat === lat &&
      userLocation.lng === lng &&
      userLocation.accuracy === accuracy
    ) {
      return
    }

    setUserLocation({latLng: new LatLng(lat, lng), accuracy})
  }, [])

  useEffect(() => {
    if (!CAN_USE_LOCATION || !mapRef) {
      return
    }

    mapRef.locate({setView: true, maxZoom: Math.round(DEFAULT_ZOOM * 1.15)})

    const locationRequest = navigator.geolocation.watchPosition(
      handleUserLocation,
      (err) => console.error(err),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 30000,
      },
    )

    return () => {
      navigator.geolocation.clearWatch(locationRequest)
    }
  }, [mapRef])

  const poly = getPolyLine(props.paths)
  const bounds = getPolyBounds(poly)

  return (
    <>
      <Head>
        <title key="title">San Francisco Map</title>
      </Head>

      <div style={{position: 'relative'}}>
        <MapContainer
          whenCreated={setMapRef}
          center={bounds.getCenter()}
          zoom={13}
          scrollWheelZoom={false}
          className={styles.map}
        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            id="mapbox/outdoors-v11"
            attribution={'Something credits something'}
            tileSize={512}
            maxZoom={18}
            zoomOffset={-1}
            accessToken={MAPBOX_API_KEY}
          />

          <Polyline positions={poly.getLatLngs()} />

          {userLocation && (
            <Circle
              key="user-location"
              center={userLocation.latLng}
              color="red"
              radius={Math.ceil(userLocation.accuracy / 2)}
            />
          )}
        </MapContainer>
      </div>
    </>
  )
}
