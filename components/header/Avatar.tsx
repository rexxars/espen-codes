import * as React from 'react'
import {AVATAR_ASSET_FILENAME, SANITY_DATASET, SANITY_PROJECT_ID} from '../../constants'
import styles from './Avatar.module.css'

const VANITY = 'espen-hovlandsdal.jpg'
const AVATAR_SIZE = 100
const AVATAR_BASE_URL = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${AVATAR_ASSET_FILENAME}/${VANITY}?auto=format&q=90`
const AVATAR_SRCSET = `
  ${AVATAR_BASE_URL}&w=${AVATAR_SIZE}&dpr=3 3x,
  ${AVATAR_BASE_URL}&w=${AVATAR_SIZE}&dpr=2 2x,
  ${AVATAR_BASE_URL}&w=${AVATAR_SIZE}
`.trim()

export default function Avatar() {
  return (
    <picture className={styles.avatar}>
      <source srcSet={AVATAR_SRCSET} />
      <img
        src={`${AVATAR_BASE_URL}&w=${AVATAR_SIZE}`}
        alt="Espen Hovlandsdal"
        className={styles.img}
      />
    </picture>
  )
}
