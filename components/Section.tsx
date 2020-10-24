import * as React from 'react'
import styles from './Section.module.css'

export default function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <section className={styles.root}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </section>
  )
}
