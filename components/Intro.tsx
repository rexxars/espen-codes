import * as React from 'react'
import {Link} from './Link'
import {LDJson} from './LDJson'
import {SocialIcons} from './SocialIcons'
import {ExternalLink} from './ExternalLink'
import styles from './Intro.module.css'

const data = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Espen Hovlandsdal',
  born: '1986-06-03',
  url: 'https://espen.codes',
}

export function Intro() {
  return (
    <section className={styles.root}>
      <h1 className={styles.heading}>Hi! I'm Espen.</h1>
      <h2 className={styles.subheading}>I do software development for fun and profit.</h2>

      <p className={styles.aboutMe}>
        For the past few years I've been pushing code at{' '}
        <ExternalLink href="https://www.sanity.io/">Sanity.io</ExternalLink>. Occasionally I do
        talks at conferences and meetups. I also write open-source software that is downloaded
        around 115 million times a month. My{' '}
        <Link href="/kokos">
          <a>miniature schnauzer</a>
        </Link>{' '}
        takes me on walks and keeps me healthy. Sometimes I make (and write about) silly{' '}
        <span className={styles.nobreak}>(and not so silly)</span> side-projects.
      </p>

      <SocialIcons />
      <LDJson {...data} />
    </section>
  )
}
