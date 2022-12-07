import * as React from 'react'
import {groq} from 'next-sanity'
import {type JsonResume, Resume} from '../../components/resume'
import {sanityClient} from '../../config/sanity'

export default async function ResumePage() {
  const resume = await sanityClient.fetch<JsonResume>(groq`*[_id == $id][0]`, {id: 'resume'})
  return <Resume resume={resume} />
}
