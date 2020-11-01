import {Block} from '@sanity/types'
import React from 'react'
import {PortableText} from '../config/sanity'
import {KokosAvatar} from './KokosAvatar'
import styles from './Kokos.module.css'

export function Kokos({bio}: {bio: Block[]}) {
  return (
    <div className={styles.root}>
      <KokosAvatar />
      <PortableText blocks={bio} className={styles.bio} />
    </div>
  )
}
