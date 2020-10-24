import * as React from 'react'
import Head from 'next/head'
import type {AppProps} from 'next/app'
import Layout from '../components/Layout'
import '../styles/global.css'

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title key="title">Espen.Codes</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
