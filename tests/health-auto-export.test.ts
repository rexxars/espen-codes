import assert from 'node:assert/strict'
import test from 'node:test'

import {createActivityDocuments} from '../src/lib/health-auto-export.ts'

test('converts Health Auto Export v2 workouts to activity documents', () => {
  const result = createActivityDocuments({
    data: {
      workouts: [
        {
          id: '550e8400-e29b-41d4-a716-446655440000',
          name: 'Walking',
          start: '2026-08-23 07:00:00 -0700',
          end: '2026-08-23 07:30:00 -0700',
          duration: 1_800,
          distance: {qty: 1.5, units: 'mi'},
          route: [
            {latitude: 37.7749, longitude: -122.4194},
            {latitude: 37.775, longitude: -122.4193},
            {latitude: 37.7751, longitude: -122.4192},
          ],
        },
      ],
    },
  })

  assert.ok(result)
  assert.equal(result.received, 1)
  assert.equal(result.skipped, 0)
  assert.equal(result.documents.length, 1)
  assert.equal(result.documents[0]?._id, 'activity-health-550e8400-e29b-41d4-a716-446655440000')
  assert.equal(result.documents[0]?.distance, 2_414.016)
  assert.equal(result.documents[0]?.time, '2026-08-23T14:00:00.000Z')
  assert.deepEqual(result.documents[0]?.path.points, [
    {_type: 'geopoint', lat: 37.7749, lng: -122.4194},
    {_type: 'geopoint', lat: 37.7751, lng: -122.4192},
  ])
})

test('accepts legacy route coordinate names and calculates a missing distance', () => {
  const result = createActivityDocuments({
    workouts: [
      {
        id: 'legacy-compatible-id',
        name: 'Hiking',
        start: '2026-08-23T15:00:00.000Z',
        end: '2026-08-23T15:30:00.000Z',
        route: [
          {lat: 37.8, lon: -122.4},
          {lat: 37.801, lon: -122.4},
        ],
      },
    ],
  })

  assert.ok(result)
  assert.equal(result.documents.length, 1)
  assert.ok((result.documents[0]?.distance ?? 0) > 100)
})

test('skips workouts without valid route data', () => {
  const result = createActivityDocuments([
    {
      id: 'indoor-workout',
      name: 'Indoor Walk',
      start: '2026-08-23 07:00:00 -0700',
      end: '2026-08-23 07:30:00 -0700',
      route: [],
    },
  ])

  assert.deepEqual(result, {documents: [], received: 1, skipped: 1})
})

test('rejects payloads that do not contain workouts', () => {
  assert.equal(createActivityDocuments({data: {metrics: []}}), undefined)
})
