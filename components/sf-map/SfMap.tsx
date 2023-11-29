import Head from 'next/head'
import memoize from 'lodash/memoize'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {LatLng, Map, Polyline as LeafletPolyline} from 'leaflet'
import {Circle, MapContainer, Polyline, TileLayer, useMapEvent} from 'react-leaflet'
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
  const hasMoved = useRef(false)
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

  const onLocationFound = useCallback(
    (loc) => {
      if (!hasMoved.current) {
        mapRef.setView(loc.latlng)
      }
    },
    [mapRef],
  )

  useEffect(() => {
    if (!CAN_USE_LOCATION || !mapRef) {
      return
    }

    mapRef.locate({setView: false, maxZoom: Math.round(DEFAULT_ZOOM * 1.15)})
    mapRef.on('locationfound', onLocationFound)

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
      mapRef.removeEventListener('locationfound', onLocationFound)
      navigator.geolocation.clearWatch(locationRequest)
    }
  }, [mapRef])

  const handleMove = useCallback((evt) => {
    hasMoved.current = true
  }, [])

  const poly = getPolyLine(props.paths)
  const bounds = getPolyBounds(poly)

  return (
    <>
      <Head>
        <title key="title">San Francisco Map</title>
      </Head>

      <div style={{position: 'relative'}}>
        <MapContainer
          ref={setMapRef}
          center={bounds.getCenter()}
          zoom={13}
          scrollWheelZoom={false}
          className={styles.map}
        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            id="mapbox/outdoors-v11"
            attribution={'Data from <a href="https://www.strava.com/">Strava</a>'}
            tileSize={512}
            maxZoom={18}
            zoomOffset={-1}
            accessToken={MAPBOX_API_KEY}
          />

          <Polyline positions={poly.getLatLngs()} />

          <MapEventListener onMove={handleMove} />

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

function MapEventListener(props: {onMove: (any: any) => void}) {
  useMapEvent('move', props.onMove)
  return null
}
