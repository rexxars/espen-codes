const PING_URL = 'https://rubysrealm.net/ping/espen-codes'

const image = atob(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
)

export default async function handler(_req, res) {
  res
    .status(200)
    .setHeader('Content-Type', 'image/png')
    .setHeader('Cache-Control', 'max-age=0, s-maxage=0, no-cache, no-store, must-revalidate')
    .send(image)

  fetch(PING_URL).catch((err) => {
    console.error('Error pinging URL: %s', `${err}`)
  })
}
