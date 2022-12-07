import * as React from 'react'
import {GitHubIcon} from './icons/GitHubIcon'
import {TwitterIcon} from './icons/TwitterIcon'
import {SchnauzerIcon} from './icons/SchnauzerIcon'
import {ExternalLink} from './ExternalLink'
import {Link} from './Link'
import styles from './SocialIcons.module.css'

export function SocialIcons() {
  return (
    <ul className={styles.icons}>
      <li>
        <ExternalLink href="https://github.com/rexxars/">
          <GitHubIcon />
        </ExternalLink>
      </li>

      <li>
        <ExternalLink href="https://twitter.com/rexxars">
          <TwitterIcon />
        </ExternalLink>
      </li>

      <li>
        <Link href="/kokos">
          <SchnauzerIcon />
        </Link>
      </li>
    </ul>
  )
}
