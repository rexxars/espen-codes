import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import styles from './Menu.module.css'

export default function Menu() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <ActiveLink href="/">Posts</ActiveLink>
        </li>

        <li>
          <ActiveLink href="/projects">Projects</ActiveLink>
        </li>

        <li>
          <ActiveLink href="/resume">Résumé</ActiveLink>
        </li>
      </ul>
    </nav>
  )
}

const ActiveLink = ({children, href}) => {
  const {asPath} = useRouter()
  const anchorClass = asPath === href ? styles.activeLink : styles.link

  return (
    <Link href={href}>
      <a className={anchorClass}>{children}</a>
    </Link>
  )
}
