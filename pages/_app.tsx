import * as React from 'react'
import Head from 'next/head'
import type {AppProps} from 'next/app'
import '../styles/global.css'

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title key="title">Espen.Codes</title>
        <meta
          name="description"
          content="Espen Hovlandsdal's home on the internet. Blog posts, projects, resume - all that kind of stuff."
        />
      </Head>

      <Component {...pageProps} />
    </>
  )
}
