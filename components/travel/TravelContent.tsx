import React, {ReactNode} from 'react'
import styles from './TravelContent.module.css'

export function TravelContent({children}: {children?: ReactNode}) {
  return <main className={styles.root}>{children}</main>
}
