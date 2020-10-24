import * as React from 'react'
import Avatar from './Avatar'
import Menu from './Menu'
import Person from './Person'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.root}>
      <div className={styles.items}>
        <Avatar />
        <Person />
        <Menu />
      </div>
    </header>
  )
}
