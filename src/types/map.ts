export interface MapPoint {
  lat: number
  lng: number
}

export type MapPath = MapPoint[]

export interface SfMapProps {
  paths: MapPath[]
}

export interface UserLocation {
  accuracy: number
  latLng: {lat: number; lng: number}
}
