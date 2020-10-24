import * as React from 'react'
import Link from 'next/link'
import GitHubIcon from '../icons/GitHubIcon'
import SanityIcon from '../icons/SanityIcon'
import SchnauzerIcon from '../icons/SchnauzerIcon'
import LDJson from '../LDJson'
import styles from './Person.module.css'

const data = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Espen Hovlandsdal',
  born: '1986-06-03',
  url: 'https://espen.codes',
}

export default function Person() {
  return (
    <section className={styles.root}>
      <h1 className={styles.name}>{data.name}</h1>
      <ul className={styles.subtitle}>
        <li>
          <a href="https://www.sanity.io/">
            <SanityIcon />
          </a>
          <span> Full-stack developer,</span>
        </li>
        <li>
          <Link href="/kokos">
            <a>
              <SchnauzerIcon />
            </a>
          </Link>
          <span> minischnauzer daddy,</span>
        </li>
        <li>
          <a href="https://github.com/rexxars/">
            <GitHubIcon />
          </a>
          <span> open-sourcerer.</span>
        </li>
      </ul>
      <LDJson {...data} />
    </section>
  )
}
