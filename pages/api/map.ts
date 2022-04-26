import util from 'util'
import {pick, keyBy, isEqual} from 'lodash'
import geoPolyline from 'geojson-polyline'
import ActivitiesStream from 'strava-activities-stream'
import {diaryClient} from '../../config/sanity.server'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({
      error: 'Method Not Supported',
      message: 'Method Not Supported',
      statusCode: 405,
      success: false,
      updated: 0,
    })
    return
  }

  try {
    const result = await getDataFromStrava()
    res.status(200).json({success: true, updated: result.updated})
  } catch (err) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message,
      statusCode: 500,
      success: false,
      updated: 0,
    })
  }
}

async function getDataFromStrava(options = {refreshOnFail: true}): Promise<{updated: number}> {
  return new Promise(async (resolve, reject) => {
    const {accessToken} = await getStravaTokenState()

    const stream = new ActivitiesStream({
      token: accessToken,
      after: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    })

    stream.on('error', async (err) => {
      if (err.message.indexOf('Received 40') === -1) {
        reject(err)
        return
      }

      if (options.refreshOnFail) {
        console.log('[strava] Refreshing Strava token')
        await refreshStravaToken()
        resolve(getDataFromStrava({refreshOnFail: false}))
        return
      }

      reject(err)
    })

    const docs = []
    stream.on('data', (act) => {
      const {name, distance, id, start_date: time, map} = act
      const {coordinates} = geoPolyline.decode({
        type: 'LineString',
        coordinates: map.summary_polyline,
      })

      const _id = `activity-${id}`
      const doc = {
        _id,
        _type: 'activity',
        distance,
        name,
        time,
        path: convertCoordinates(coordinates, {simplify: true}),
      }

      docs.push(doc)
    })

    stream.on('end', async () => {
      if (!docs.length) {
        console.log('[strava] No activities found')
        resolve({updated: 0})
        return
      }

      console.log(`Diffing ${docs.length} docs against Sanity`)
      const compareKeys = Object.keys(docs[0])
      const remoteDocs = keyBy(
        (await diaryClient.fetch(`*[_id in $ids]`, {ids: docs.map((doc) => doc._id)})).map((doc) =>
          pick(doc, compareKeys),
        ),
        '_id',
      )

      const updated = docs.filter((local) => !isEqual(local, remoteDocs[local._id]))
      if (updated.length === 0) {
        console.log('[strava] No activities has changed, falling back')
        resolve({updated: 0})
        return
      }

      console.log(`[strava] Creating/updating ${updated.length} activities`)
      await updated
        .reduce((trx, doc) => trx.createOrReplace(doc), diaryClient.transaction())
        .commit({visibility: 'async'})

      console.log('[strava] Done.')
      resolve({updated: updated.length})
    })
  })
}

function convertCoordinates(coordinates, options = {simplify: false}) {
  const points = coordinates.map(convertPoint)
  return {
    _type: 'geoPath',
    points: options.simplify ? simplifyPath(points, 0.00005) : points,
  }
}

function convertPoint(point) {
  return {_type: 'geopoint', lat: point[1], lng: point[0]}
}

async function refreshStravaToken() {
  const {accessToken, clientId, clientSecret, refreshToken} = await getStravaTokenState()

  const query = new URLSearchParams()
  query.append('client_id', clientId)
  query.append('client_secret', clientSecret)
  query.append('refresh_token', refreshToken)
  query.append('grant_type', 'refresh_token')

  const url = new URL(`https://www.strava.com/oauth/token?${query.toString()}`)

  let response
  let body
  try {
    response = await fetch(url.toString(), {method: 'POST'})
    body = await response.json()
  } catch (err) {
    console.error('Failed to refresh strava token: ', err.body)
    process.exit(1)
  }

  if (!body.access_token) {
    throw new Error(
      `Unexpected response on strava token refresh: ${util.inspect(body || response, {
        depth: 3,
      })}`,
    )
  }

  const newState = {
    _id: 'secrets.strava',
    _type: 'secret',
    clientId,
    clientSecret,
    refreshToken: body.refresh_token || refreshToken,
    accessToken: body.access_token || accessToken,
  }

  if (body.refresh_token !== refreshToken || body.access_token !== accessToken) {
    console.log('[strava] Updating Strava tokens')
    await diaryClient.createOrReplace(newState)
  }

  return newState
}

async function getStravaTokenState() {
  try {
    const content = await diaryClient.getDocument('secrets.strava')
    if (!content) {
      throw new Error('Not found!')
    }

    return content
  } catch (err) {
    throw new Error('Strava tokens not found')
  }
}

// square distance between 2 points
function getSqDist(p1, p2) {
  const dx = p1.lat - p2.lat
  const dy = p1.lng - p2.lng

  return dx * dx + dy * dy
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {
  let x = p1.lat
  let y = p1.lng
  let dx = p2.lat - x
  let dy = p2.lng - y

  if (dx !== 0 || dy !== 0) {
    const t = ((p.lat - x) * dx + (p.lng - y) * dy) / (dx * dx + dy * dy)

    if (t > 1) {
      x = p2.lat
      y = p2.lng
    } else if (t > 0) {
      x += dx * t
      y += dy * t
    }
  }

  dx = p.lat - x
  dy = p.lng - y

  return dx * dx + dy * dy
}

function simplifyRadialDist(points, sqTolerance) {
  let point
  let prevPoint = points[0]
  const newPoints = [prevPoint]

  for (let i = 1, len = points.length; i < len; i++) {
    point = points[i]

    if (getSqDist(point, prevPoint) > sqTolerance) {
      newPoints.push(point)
      prevPoint = point
    }
  }

  if (prevPoint !== point) newPoints.push(point)

  return newPoints
}

function simplifyDPStep(points, first, last, sqTolerance, simplified) {
  let maxSqDist = sqTolerance
  let index

  for (let i = first + 1; i < last; i++) {
    const sqDist = getSqSegDist(points[i], points[first], points[last])

    if (sqDist > maxSqDist) {
      index = i
      maxSqDist = sqDist
    }
  }

  if (maxSqDist > sqTolerance) {
    if (index - first > 1) {
      simplifyDPStep(points, first, index, sqTolerance, simplified)
    }

    simplified.push(points[index])

    if (last - index > 1) {
      simplifyDPStep(points, index, last, sqTolerance, simplified)
    }
  }
}

// simplification using Ramer-Douglas-Peucker algorithm
function simplifyDouglasPeucker(points, sqTolerance) {
  const last = points.length - 1

  const simplified = [points[0]]
  simplifyDPStep(points, 0, last, sqTolerance, simplified)
  simplified.push(points[last])

  return simplified
}

// both algorithms combined for awesome performance
function simplifyPath(points, tolerance, highestQuality = true) {
  if (points.length <= 2) {
    return points
  }

  const sqTolerance = tolerance === undefined ? 1 : tolerance * tolerance

  let simplifiedPoints = highestQuality ? points : simplifyRadialDist(points, sqTolerance)
  simplifiedPoints = simplifyDouglasPeucker(points, sqTolerance)

  return simplifiedPoints
}
