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
  [-122.35650273975521, 37.765375941221166],
  [-122.35660926599658, 37.7815640278059],
  [-122.3564777436546, 37.80973043308961],
  [-122.3569361299756, 37.82222350032323],
  [-122.36667683929488, 37.835529007145226],
  [-122.38283495710733, 37.835076478302156],
].map(([lng, lat]) => new LatLng(lat, lng))

const tier1Line: Array<LatLng> = [
  [-122.50801816880471, 37.73544361760953],
  [-122.50252330527181, 37.73552880387865],
  [-122.50063785821567, 37.734932367163495],
  [-122.4982137009496, 37.733952499414684],
  [-122.49428118635339, 37.73382468623596],
  [-122.47176473633027, 37.73476188821388],
  [-122.46626844009981, 37.734936496468876],
  [-122.4661479388883, 37.733864381211944],
  [-122.46527430510247, 37.73283990101679],
  [-122.46400904237856, 37.73198218576634],
  [-122.46352703753121, 37.73105298303312],
  [-122.46205089768652, 37.73002846393963],
  [-122.46093626147723, 37.73014759479521],
  [-122.45973124935907, 37.73074324619709],
  [-122.45738147572854, 37.730957679529595],
  [-122.45497145149224, 37.73152949871205],
  [-122.43681805492642, 37.73153714121267],
  [-122.43108605735961, 37.732294821829186],
  [-122.42830763412186, 37.73193935988844],
  [-122.42563135879715, 37.73148695131458],
  [-122.4229959426379, 37.73148695131458],
  [-122.42023794898287, 37.7319070450818],
  [-122.41607467585251, 37.731982857277316],
  [-122.41335754136264, 37.73272609349718],
  [-122.40925119525392, 37.73439026928378],
  [-122.4056579488635, 37.73554978554668],
  [-122.40267896061137, 37.73707860811736],
  [-122.40085670715902, 37.738632461001274],
  [-122.39629315068743, 37.743607077080796],
  [-122.39244055159949, 37.74867704975978],
  [-122.39036991007004, 37.74779993888052],
  [-122.38689419035914, 37.747955870463485],
  [-122.38526725772886, 37.748423663240416],
  [-122.35475690837339, 37.7496408565641],
  [-122.35592079596141, 37.75447215963598],
  [-122.35650273975521, 37.765375941221166],
  [-122.35660926599658, 37.7815640278059],
  [-122.3564777436546, 37.80973043308961],
  [-122.3569361299756, 37.82222350032323],
  [-122.36667683929488, 37.835529007145226],
  [-122.38283495710733, 37.835076478302156],
].map(([lng, lat]) => new LatLng(lat, lng))

const sfCenter = new LatLng(37.76578720301821, -122.44688605344325)

const getPolyLine = memoize((paths) => new LeafletPolyline(paths))

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
  const accessToken = encodeURIComponent(MAPBOX_API_KEY)

  return (
    <>
      <Head>
        <title key="title">San Francisco Map</title>
      </Head>

      <div style={{position: 'relative'}}>
        <MapContainer
          ref={setMapRef}
          center={sfCenter}
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
          <Polyline positions={tier1Line} color="orange" />
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
