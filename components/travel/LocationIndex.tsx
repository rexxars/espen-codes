import React, {useCallback, useState} from 'react'
import Link from 'next/link'
import styles from './LocationIndex.module.css'

export function LocationIndex({
  locations,
  guideSlug,
  expanded,
}: {
  locations: string[]
  guideSlug: string
  expanded?: boolean
}) {
  const [forcedOpen, setForcedOpen] = useState(false)
  const toggleOpen = useCallback(
    (evt) => {
      evt.preventDefault()
      setForcedOpen(true)
    },
    [setForcedOpen],
  )

  return expanded || forcedOpen ? (
    <nav className={styles.root}>
      <h4>All locations</h4>
      <ul>
        {locations.map((title, index) => (
          <li key={title} className={styles.item}>
            <Link href={`/travel-guides/${guideSlug}/${index + 1}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <a href="#" className={styles.toggle} onClick={toggleOpen}>
      Se alle
    </a>
  )
}
