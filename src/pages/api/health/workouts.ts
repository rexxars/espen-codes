// @env worker

import {createClient} from '@sanity/client'
import {env} from 'cloudflare:workers'
import type {APIRoute} from 'astro'

import {DIARY_API_VERSION, DIARY_DATASET, DIARY_PROJECT_ID} from '../../../constants'
import {createActivityDocuments} from '../../../lib/health-auto-export'

export const prerender = false

export const POST: APIRoute = async ({request}) => {
  if (!env.HEALTH_AUTO_EXPORT_TOKEN || !env.DIARY_API_TOKEN) {
    console.error('Health workout import is not configured')
    return json({error: 'Import is not configured', success: false}, 503)
  }

  if (!isAuthorized(request, env.HEALTH_AUTO_EXPORT_TOKEN)) {
    return json({error: 'Unauthorized', success: false}, 401)
  }

  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return json({error: 'Expected an application/json request', success: false}, 415)
  }

  let payload: unknown

  try {
    payload = await request.json()
  } catch {
    return json({error: 'Invalid JSON', success: false}, 400)
  }

  const activityImport = createActivityDocuments(payload)

  if (!activityImport) {
    return json({error: 'Expected a Health Auto Export workouts payload', success: false}, 400)
  }

  const {documents, received, skipped} = activityImport

  if (documents.length === 0) {
    return json({imported: 0, received, skipped, success: true})
  }

  const diaryClient = createClient({
    apiVersion: DIARY_API_VERSION,
    dataset: DIARY_DATASET,
    projectId: DIARY_PROJECT_ID,
    token: env.DIARY_API_TOKEN,
    useCdn: false,
  })

  try {
    await documents
      .reduce(
        (transaction, document) => transaction.createOrReplace(document),
        diaryClient.transaction(),
      )
      .commit({visibility: 'async'})
  } catch (error: unknown) {
    console.error('Unable to import Health workouts', error)
    return json({error: 'Unable to save workouts', success: false}, 502)
  }

  console.info('Imported Health workouts', {imported: documents.length, received, skipped})

  return json({imported: documents.length, received, skipped, success: true})
}

function isAuthorized(request: Request, expectedToken: string): boolean {
  const authorization = request.headers.get('authorization')

  if (!authorization?.startsWith('Bearer ')) {
    return false
  }

  return constantTimeEqual(authorization.slice('Bearer '.length), expectedToken)
}

function constantTimeEqual(value: string, expected: string): boolean {
  const length = Math.max(value.length, expected.length)
  let difference = value.length ^ expected.length

  for (let index = 0; index < length; index += 1) {
    difference |= (value.charCodeAt(index) || 0) ^ (expected.charCodeAt(index) || 0)
  }

  return difference === 0
}

function json(body: Record<string, unknown>, status = 200): Response {
  return Response.json(body, {
    status,
    headers: {'Cache-Control': 'no-store'},
  })
}
