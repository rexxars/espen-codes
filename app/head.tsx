export default function Head({title = 'Espen.Codes'}: {title?: string}) {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title key="title">{title}</title>
      <meta
        name="description"
        content="Espen Hovlandsdal's home on the internet. Blog posts, projects, resume - all that kind of stuff."
      />

      <link rel="icon" href="/favicons/favicon-32.png" sizes="32x32" />
      <link rel="icon" href="/favicons/favicon-96.png" sizes="96x96" />
      <link rel="icon" href="/favicons/favicon-128.png" sizes="128x128" />
      <link rel="icon" href="/favicons/favicon.svg" type="image/svg" sizes="32x32 96x96 128x128" />
    </>
  )
}
