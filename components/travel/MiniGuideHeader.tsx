import {ProjectedTravelGuideLocation} from '../../types'
import styles from './MiniGuideHeader.module.css'

export function MiniGuideHeader({
  guide,
  className,
}: {
  guide: ProjectedTravelGuideLocation['guide']
  className?: string
}) {
  return (
    <header className={[styles.root, className].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>{guide.title}</h2>
    </header>
  )
}
