import type {MapPoint} from '../types/map'

const PATH_TOLERANCE = 0.00005
const EARTH_RADIUS_METERS = 6_371_000
const HEALTH_DATE_PATTERN =
  /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))? ([+-])(\d{2}):?(\d{2})$/
const WORKOUT_ID_PATTERN = /^[A-Za-z0-9._-]{1,100}$/

interface Quantity {
  qty: number
  units: string
}

interface HealthAutoExportWorkout {
  distance?: Quantity
  end: string
  id: string
  name: string
  route: unknown[]
  start: string
}

export interface ActivityDocument {
  _id: string
  _type: 'activity'
  distance: number
  name: string
  path: {
    _type: 'geoPath'
    points: Array<MapPoint & {_type: 'geopoint'}>
  }
  time: string
}

export interface ActivityImport {
  documents: ActivityDocument[]
  received: number
  skipped: number
}

export function createActivityDocuments(payload: unknown): ActivityImport | undefined {
  const workouts = getWorkouts(payload)

  if (!workouts) {
    return undefined
  }

  const documents = workouts.flatMap((workout) => {
    const document = createActivityDocument(workout)
    return document ? [document] : []
  })

  return {
    documents,
    received: workouts.length,
    skipped: workouts.length - documents.length,
  }
}

function getWorkouts(payload: unknown): unknown[] | undefined {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!isRecord(payload)) {
    return undefined
  }

  if (Array.isArray(payload.workouts)) {
    return payload.workouts
  }

  if (isRecord(payload.data) && Array.isArray(payload.data.workouts)) {
    return payload.data.workouts
  }

  return undefined
}

function createActivityDocument(value: unknown): ActivityDocument | undefined {
  const workout = parseWorkout(value)

  if (!workout) {
    return undefined
  }

  const points = workout.route.flatMap((point) => {
    const parsed = parseRoutePoint(point)
    return parsed ? [parsed] : []
  })

  if (points.length < 2) {
    return undefined
  }

  const distance = toMeters(workout.distance) ?? calculateDistance(points)
  const time = toIsoDate(workout.start)

  if (!time) {
    return undefined
  }

  return {
    _id: `activity-health-${workout.id}`,
    _type: 'activity',
    distance,
    name: workout.name,
    time,
    path: {
      _type: 'geoPath',
      points: simplifyPath(points, PATH_TOLERANCE).map((point) => ({
        _type: 'geopoint',
        ...point,
      })),
    },
  }
}

function parseWorkout(value: unknown): HealthAutoExportWorkout | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  const id = asNonEmptyString(value.id)
  const name = asNonEmptyString(value.name)
  const start = asNonEmptyString(value.start)
  const end = asNonEmptyString(value.end)

  if (
    !id ||
    !WORKOUT_ID_PATTERN.test(id) ||
    !name ||
    !start ||
    !end ||
    !Array.isArray(value.route)
  ) {
    return undefined
  }

  const distance = parseQuantity(value.distance)

  return {
    id,
    name,
    start,
    end,
    route: value.route,
    ...(distance ? {distance} : {}),
  }
}

function parseRoutePoint(value: unknown): MapPoint | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  const lat = asFiniteNumber(value.latitude) ?? asFiniteNumber(value.lat)
  const lng = asFiniteNumber(value.longitude) ?? asFiniteNumber(value.lon)

  if (lat === undefined || lng === undefined || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return undefined
  }

  return {lat, lng}
}

function parseQuantity(value: unknown): Quantity | undefined {
  if (!isRecord(value)) {
    return undefined
  }

  const qty = asFiniteNumber(value.qty)
  const units = asNonEmptyString(value.units)

  return qty === undefined || !units ? undefined : {qty, units}
}

function toMeters(quantity: Quantity | undefined): number | undefined {
  if (!quantity) {
    return undefined
  }

  const multipliers: Record<string, number> = {
    ft: 0.3048,
    km: 1_000,
    m: 1,
    mi: 1_609.344,
    yd: 0.9144,
  }
  const multiplier = multipliers[quantity.units.toLowerCase()]

  return multiplier === undefined ? undefined : quantity.qty * multiplier
}

function toIsoDate(value: string): string | undefined {
  const match = HEALTH_DATE_PATTERN.exec(value)

  if (match) {
    const [
      ,
      year,
      month,
      day,
      hour,
      minute,
      second,
      milliseconds = '0',
      sign,
      offsetHour,
      offsetMinute,
    ] = match
    const values = [year, month, day, hour, minute, second, offsetHour, offsetMinute].map(Number)

    if (values.some((part) => !Number.isFinite(part))) {
      return undefined
    }

    const [
      yearValue,
      monthValue,
      dayValue,
      hourValue,
      minuteValue,
      secondValue,
      offsetHourValue,
      offsetMinuteValue,
    ] = values

    if (
      yearValue === undefined ||
      monthValue === undefined ||
      dayValue === undefined ||
      hourValue === undefined ||
      minuteValue === undefined ||
      secondValue === undefined ||
      offsetHourValue === undefined ||
      offsetMinuteValue === undefined
    ) {
      return undefined
    }

    const offset = (offsetHourValue * 60 + offsetMinuteValue) * (sign === '+' ? 1 : -1)
    const timestamp =
      Date.UTC(
        yearValue,
        monthValue - 1,
        dayValue,
        hourValue,
        minuteValue,
        secondValue,
        Number(milliseconds.padEnd(3, '0')),
      ) -
      offset * 60_000

    return new Date(timestamp).toISOString()
  }

  if (!value.includes('T')) {
    return undefined
  }

  const timestamp = Date.parse(value)
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined
}

function calculateDistance(points: MapPoint[]): number {
  let distance = 0

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1]
    const current = points[index]

    if (!previous || !current) {
      continue
    }

    const latitudeDelta = toRadians(current.lat - previous.lat)
    const longitudeDelta = toRadians(current.lng - previous.lng)
    const previousLatitude = toRadians(previous.lat)
    const currentLatitude = toRadians(current.lat)
    const haversine =
      Math.sin(latitudeDelta / 2) ** 2 +
      Math.cos(previousLatitude) * Math.cos(currentLatitude) * Math.sin(longitudeDelta / 2) ** 2

    distance += 2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  }

  return distance
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180
}

function simplifyPath(points: MapPoint[], tolerance: number): MapPoint[] {
  if (points.length <= 2) {
    return points
  }

  const sqTolerance = tolerance * tolerance
  const last = points.length - 1
  const simplified = [points[0] as MapPoint]

  simplifyDPStep(points, 0, last, sqTolerance, simplified)
  simplified.push(points[last] as MapPoint)

  return simplified
}

function simplifyDPStep(
  points: MapPoint[],
  first: number,
  last: number,
  sqTolerance: number,
  simplified: MapPoint[],
): void {
  let index = -1
  let maxSqDistance = sqTolerance

  for (let cursor = first + 1; cursor < last; cursor += 1) {
    const point = points[cursor]
    const firstPoint = points[first]
    const lastPoint = points[last]

    if (!point || !firstPoint || !lastPoint) {
      continue
    }

    const sqDistance = getSqSegmentDistance(point, firstPoint, lastPoint)

    if (sqDistance > maxSqDistance) {
      index = cursor
      maxSqDistance = sqDistance
    }
  }

  if (index === -1) {
    return
  }

  if (index - first > 1) {
    simplifyDPStep(points, first, index, sqTolerance, simplified)
  }

  const point = points[index]
  if (point) {
    simplified.push(point)
  }

  if (last - index > 1) {
    simplifyDPStep(points, index, last, sqTolerance, simplified)
  }
}

function getSqSegmentDistance(point: MapPoint, start: MapPoint, end: MapPoint): number {
  let lat = start.lat
  let lng = start.lng
  let latDelta = end.lat - lat
  let lngDelta = end.lng - lng

  if (latDelta !== 0 || lngDelta !== 0) {
    const position =
      ((point.lat - lat) * latDelta + (point.lng - lng) * lngDelta) /
      (latDelta * latDelta + lngDelta * lngDelta)

    if (position > 1) {
      lat = end.lat
      lng = end.lng
    } else if (position > 0) {
      lat += latDelta * position
      lng += lngDelta * position
    }
  }

  latDelta = point.lat - lat
  lngDelta = point.lng - lng

  return latDelta * latDelta + lngDelta * lngDelta
}

function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function asNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  const result = value.trim()
  return result.length > 0 ? result : undefined
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
