/* eslint-disable react/no-danger, react/no-unused-prop-types */
import * as React from 'react'

interface LDJSONData {
  '@context': string
  '@type': string
  [key: string]: unknown
}

export default function LDJson(props: LDJSONData) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(props, null, 2)}}
    />
  )
}
