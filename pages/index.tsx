import * as React from 'react'
import Avatar from '../components/Avatar'
import {Intro} from '../components/Intro'
import Layout from '../components/Layout'

export default function IndexPage() {
  return (
    <Layout>
      <Avatar />
      <Intro />
    </Layout>
  )
}
