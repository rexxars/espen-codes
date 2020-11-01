import * as React from 'react'
import Link from 'next/link'
import Menu from './Menu'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.content}>
        <Link href="/">
          <a className={styles.siteName}>
            <span>Espen</span>
            <span className={styles.optional}>.</span>
            <span>Codes</span>
          </a>
        </Link>

        <Menu />
      </div>
    </header>
  )
}
