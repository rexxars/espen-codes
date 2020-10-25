import * as React from 'react'
import Link from 'next/link'
import GitHubIcon from './icons/GitHubIcon'
import TwitterIcon from './icons/TwitterIcon'
import SchnauzerIcon from './icons/SchnauzerIcon'
import styles from './SocialIcons.module.css'

export default function SocialIcons() {
  return (
    <ul className={styles.icons}>
      <li>
        <a href="https://github.com/rexxars/">
          <GitHubIcon />
        </a>
      </li>

      <li>
        <a href="https://twitter.com/rexxars">
          <TwitterIcon />
        </a>
      </li>

      <li>
        <Link href="/kokos">
          <a>
            <SchnauzerIcon />
          </a>
        </Link>
      </li>
    </ul>
  )
}
