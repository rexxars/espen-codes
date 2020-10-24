import * as React from 'react'
import Section from './Section'

export default function AboutMe() {
  return (
    <Section title="About me">
      <p>
        I live in San Francisco and work for <a href="https://sanity.io">Sanity.io</a>. Occasionally
        I do talks at conferences and meetups. I also maintain open-source software that is
        downloaded ~115M times a month. My miniature schnauzer takes me on walks and keeps me
        healthy.
      </p>
    </Section>
  )
}
