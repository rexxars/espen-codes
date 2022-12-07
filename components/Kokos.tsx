import type {PortableTextBlock} from '@portabletext/types'
import React from 'react'
import {PortableText} from '@portabletext/react'
import {KokosAvatar} from './KokosAvatar'
import styles from './Kokos.module.css'

export function Kokos({bio}: {bio: PortableTextBlock[]}) {
  return (
    <div className={styles.root}>
      <KokosAvatar />
      <div className={styles.bio}>
        <PortableText value={bio} />
      </div>
    </div>
  )
}
