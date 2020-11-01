import React from 'react'
import {useRouter} from 'next/router'
import {Link} from './Link'
import styles from './Menu.module.css'

export function Menu() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink href="/">About</NavLink>
        </li>

        <li>
          <NavLink href="/projects">Projects</NavLink>
        </li>

        <li>
          <NavLink href="/resume">Résumé</NavLink>
        </li>
      </ul>
    </nav>
  )
}

const NavLink = ({children, href}) => {
  const {asPath} = useRouter()
  const anchorClass = asPath === href ? styles.activeLink : styles.link

  return (
    <Link href={href}>
      <a className={anchorClass}>{children}</a>
    </Link>
  )
}
