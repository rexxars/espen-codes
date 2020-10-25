import * as React from 'react'
import Menu from './Menu'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.content}>
        <h2 className={styles.siteName}>
          <span>Espen</span>
          <span className={styles.optional}>.</span>
          <span>Codes</span>
        </h2>

        <Menu />
      </div>
    </header>
  )
}
