import {Block} from '@sanity/types'
import React from 'react'
import {PortableText} from '@portabletext/react'
import {KokosAvatar} from './KokosAvatar'
import styles from './Kokos.module.css'

export function Kokos({bio}: {bio: Block[]}) {
  return (
    <div className={styles.root}>
      <KokosAvatar />
      <div className={styles.bio}>
        <PortableText value={bio} />
      </div>
    </div>
  )
}
