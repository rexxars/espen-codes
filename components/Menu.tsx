import React from 'react'
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
  const pathName = 'nope' // @todo figure out how to get at it in server components
  const anchorClass = pathName === href ? styles.activeLink : styles.link

  return (
    <Link href={href} className={anchorClass}>
      {children}
    </Link>
  )
}
