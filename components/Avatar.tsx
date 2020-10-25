import React, {useCallback, useRef, useState} from 'react'
import {AVATAR_ASSET_FILENAME, SANITY_DATASET, SANITY_PROJECT_ID} from '../config/constants'
import {SvgAvatar} from './SvgAvatar'
import styles from './Avatar.module.css'

const VANITY = 'espen-hovlandsdal.jpg'
const AVATAR_SIZE = 400
const AVATAR_BASE_URL = `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${AVATAR_ASSET_FILENAME}/${VANITY}?auto=format&q=90`
const AVATAR_SRCSET = `
  ${AVATAR_BASE_URL}&w=${AVATAR_SIZE}&dpr=3 3x,
  ${AVATAR_BASE_URL}&w=${AVATAR_SIZE}&dpr=2 2x,
  ${AVATAR_BASE_URL}&w=${AVATAR_SIZE}
`.trim()

export default function Avatar() {
  const [polys, setPolys] = useState(0)

  // When the actual avatar image has loaded, bump the number of polys _only_ to trigger
  // the side-effect of re-computing `loaded` based on the images' natural width prop
  // We're checking naturalWidth because `onLoad` won't trigger if image is cached
  const isDone = polys >= 100
  const img = useRef<HTMLImageElement>()
  const imgEl = img.current
  const setLoaded = useCallback(() => isDone && setPolys(102), [isDone])
  const loaded = imgEl && imgEl.naturalWidth > 0

  // Keeps adding to the number of displayed polygons, until it reached the limit of 100
  React.useEffect(() => {
    if (polys >= 100) {
      return () => {
        /* intentional noop */
      }
    }

    const raf = requestAnimationFrame(() => setPolys((prev) => prev + 1))
    return () => cancelAnimationFrame(raf)
  }, [polys, imgEl])

  const showImg = loaded && polys > 95

  return (
    <div className={styles.root}>
      <picture className={styles.picture}>
        <source srcSet={AVATAR_SRCSET} />
        <SvgAvatar
          className={`${styles.img} ${showImg ? styles.hidden : styles.visible}`}
          numPolys={polys}
        />
        <img
          ref={img}
          src={`${AVATAR_BASE_URL}&w=${AVATAR_SIZE}`}
          alt="Espen Hovlandsdal"
          className={`${styles.img} ${showImg ? styles.visible : styles.hidden}`}
          onLoad={setLoaded}
        />
      </picture>
    </div>
  )
}
