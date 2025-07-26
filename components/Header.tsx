import * as React from 'react'
import {Menu} from './Menu'
import {Link} from './Link'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.content}>
        <Link href="/" className={styles.siteName}>
          <span>Espen</span>
          <span className={styles.optional}>.</span>
          <span>Codes</span>
        </Link>

        <div className={styles.spacer} style={{backgroundImage: 'url(/api/spacer)'}}>
          &nbsp;
        </div>

        <Menu />
      </div>
    </header>
  )
}
