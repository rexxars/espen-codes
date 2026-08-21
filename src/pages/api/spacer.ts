import type {APIRoute} from 'astro'

export const prerender = false

const PING_URL = 'https://rubysrealm.net/ping/espen-codes'
const PIXEL =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

function decodeBase64(value: string): ArrayBuffer {
  const decoded = atob(value)
  const buffer = new ArrayBuffer(decoded.length)
  const bytes = new Uint8Array(buffer)

  for (let index = 0; index < decoded.length; index += 1) {
    bytes[index] = decoded.charCodeAt(index)
  }

  return buffer
}

export const GET: APIRoute = ({locals}) => {
  const ping = fetch(PING_URL).catch((error: unknown) => {
    console.error('Unable to ping spacer endpoint', error)
  })

  locals.cfContext.waitUntil(ping)

  return new Response(decodeBase64(PIXEL), {
    headers: {
      'Cache-Control': 'max-age=0, s-maxage=0, no-cache, no-store, must-revalidate',
      'Content-Type': 'image/png',
    },
  })
}
