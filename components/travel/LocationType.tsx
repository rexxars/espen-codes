import {FaBeer, FaCity, FaRegEye} from 'react-icons/fa'
import {GiKnifeFork} from 'react-icons/gi'
import {ProjectedLocation} from '../../types'
import styles from './LocationType.module.css'

const icons = {
  neighbourhood: FaCity,
  attraction: FaRegEye,
  bar: FaBeer,
  restaurant: GiKnifeFork,
}

export function LocationType({
  type,
  className,
}: {
  type: ProjectedLocation['type']
  className?: string
}) {
  const Icon = icons[type.slug.current]
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {Icon && <Icon className={styles.icon} />}
      <span className={styles.title}>{type.name}</span>
    </div>
  )
}
