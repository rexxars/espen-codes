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

const sfBoundaryLine: Array<LatLng> = [
  [-122.50248514011957, 37.70686362271401],
  [-122.48634752322461, 37.70798164498868],
  [-122.48528082788116, 37.708169552182824],
  [-122.47399855830403, 37.708071680119076],
  [-122.47086634586141, 37.70857579951739],
  [-122.46914603432317, 37.70857579951739],
  [-122.46919073711129, 37.71048831800759],
  [-122.46686820306073, 37.71140536749182],
  [-122.46698796247466, 37.71169054037175],
  [-122.46702742375851, 37.714357616175604],
  [-122.46796085191252, 37.71437361196412],
  [-122.46797036529635, 37.71786379685079],
  [-122.46799053885827, 37.71800745775563],
  [-122.46888293030989, 37.71797552703967],
  [-122.46887809364105, 37.719598272296736],
  [-122.46818889461811, 37.719606193227136],
  [-122.46817590945713, 37.72167016425668],
  [-122.46259423399317, 37.72168409988164],
  [-122.46223601233181, 37.72186944897389],
  [-122.45314496419786, 37.721897969993464],
  [-122.45306621898365, 37.723166333189155],
  [-122.45010950496848, 37.72195392874853],
  [-122.4495075190541, 37.722858954489595],
  [-122.448222151183, 37.72323817184771],
  [-122.44689413027861, 37.725632717287496],
  [-122.4452028184543, 37.72741172825768],
  [-122.44315915596185, 37.72867042001184],
  [-122.44015749334956, 37.73003509477046],
  [-122.43711492963476, 37.731220987523486],
  [-122.43250402717055, 37.732305071930355],
  [-122.4309390575269, 37.73247941803373],
  [-122.42937394850105, 37.73242129797947],
  [-122.42719851806191, 37.732014588798734],
  [-122.42548826544677, 37.73172422273824],
  [-122.4230676838605, 37.73185971233529],
  [-122.42088881620197, 37.732324441636905],
  [-122.41749278583416, 37.732324433472755],
  [-122.41553644010739, 37.732653798159006],
  [-122.41148151550496, 37.73460015934087],
  [-122.40627755221004, 37.73569217426143],
  [-122.40452440032388, 37.733004108679694],
  [-122.40227540857968, 37.72870072784143],
  [-122.3996426397117, 37.721288905829],
  [-122.39886062006545, 37.71946097625202],
  [-122.39838876827082, 37.71771795536786],
  [-122.39774846833242, 37.71557052705947],
  [-122.39601502272927, 37.7130483474305],
  [-122.39544194898818, 37.71166787417174],
  [-122.39487887896897, 37.70902046692369],
  [-122.39457921166183, 37.707914928573814],
  [-122.3907498641999, 37.707941878558486],
  [-122.36935510133523, 37.707676651590916],
  [-122.35417866877185, 37.72068954672869],
  [-122.351353721352, 37.767018076727254],
  [-122.35544322410533, 37.81450740180189],
  [-122.36796354832272, 37.835207068589085],
  [-122.38368458809852, 37.8343753515872],
].map(([lng, lat]) => new LatLng(lat, lng))

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
  const accessToken = encodeURIComponent(MAPBOX_API_KEY)

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
            url={`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`}
            id="mapbox/outdoors-v11"
            attribution={'Data from <a href="https://www.strava.com/">Strava</a>'}
            tileSize={512}
            maxZoom={18}
            zoomOffset={-1}
          />

          <Polyline positions={poly.getLatLngs()} />
          <Polyline positions={sfBoundaryLine} color="red" />

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
