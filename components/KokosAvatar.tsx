import React from 'react'
import {KOKOS_ASSET_FILENAME, SANITY_DATASET, SANITY_PROJECT_ID} from '../config/constants'
import styles from './KokosAvatar.module.css'

const VANITY = 'kokos-the-schnauzer.jpg'
const AVATAR_SIZE = 600
const AVATAR_BASE_URL = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${KOKOS_ASSET_FILENAME}/${VANITY}?fm=jpg&bg=ceccca&q=90&rect=70,150,4362,4142`
const AVATAR_SRCSET = `
  ${AVATAR_BASE_URL}&w=${AVATAR_SIZE}&dpr=2 2x,
  ${AVATAR_BASE_URL}&w=${AVATAR_SIZE}
`.trim()

export function KokosAvatar() {
  return (
    <div className={styles.root}>
      <picture className={styles.picture}>
        <img
          className={styles.img}
          srcSet={AVATAR_SRCSET}
          src={`${AVATAR_BASE_URL}&w=${AVATAR_SIZE}`}
          alt="Kokos the miniature schnauzer"
        />
      </picture>
    </div>
  )
}
