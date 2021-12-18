import Link from 'next/link'
import {GrFormPrevious, GrFormNext} from 'react-icons/gr'
import styles from './LocationFooterNav.module.css'
import {LocationIndex} from './LocationIndex'

export function LocationFooterNav({
  guideSlug,
  currentIndex,
  prevTitle,
  nextTitle,
  locationTitles,
}: {
  guideSlug: string
  currentIndex: number
  prevTitle?: string
  nextTitle?: string
  locationTitles: string[]
}) {
  return (
    <footer className={styles.root}>
      <div className={styles.prevNext}>
        {prevTitle ? (
          <Link href={`/travel-guides/${guideSlug}/${currentIndex - 1}`}>
            <a className={styles.prevLink}>
              <GrFormPrevious className={styles.arrow} /> Forrige: {prevTitle}
            </a>
          </Link>
        ) : (
          <div />
        )}

        {nextTitle ? (
          <Link href={`/travel-guides/${guideSlug}/${currentIndex + 1}`}>
            <a className={styles.nextLink}>
              Neste: {nextTitle} <GrFormNext className={styles.arrow} />
            </a>
          </Link>
        ) : (
          <div />
        )}
      </div>

      <LocationIndex locations={locationTitles} guideSlug={guideSlug} />
    </footer>
  )
}
