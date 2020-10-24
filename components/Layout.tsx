import * as React from 'react'
import Header from './header/Header'
import styles from './Layout.module.css'

export default function Layout({children}) {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  )
}
