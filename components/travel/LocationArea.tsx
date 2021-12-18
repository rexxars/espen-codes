import {FaMapSigns} from 'react-icons/fa'
import styles from './LocationType.module.css'

export function LocationArea({area, className}: {area: string; className?: string}) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <FaMapSigns className={styles.icon} />
      <span className={styles.title}>{area}</span>
    </div>
  )
}
