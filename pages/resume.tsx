import * as React from 'react'
import Head from 'next/head'
import {groq} from 'next-sanity'
import {Layout} from '../components/Layout'
import {JsonResume, Resume} from '../components/resume'
import {sanityClient} from '../config/sanity'

export async function getStaticProps() {
  return {props: {resume: await sanityClient.fetch(groq`*[_id == $id][0]`, {id: 'resume'})}}
}

export default function ResumePage(props: {resume: JsonResume}) {
  return (
    <Layout>
      <Head>
        <title key="title">Résumé - Espen.Codes</title>
      </Head>
      <Resume resume={props.resume} />
    </Layout>
  )
}
