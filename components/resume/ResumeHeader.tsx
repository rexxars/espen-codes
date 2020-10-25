import * as React from 'react'
import {JsonResume} from './Resume'
import styles from './ResumeHeader.module.css'

export function ResumeHeader({resume}: {resume: JsonResume}) {
  const {basics} = resume
  const {city, region} = basics.location || {}
  return (
    <section className={styles.root}>
      <div className={styles.row}>
        <div className={styles.basics}>
          <h2 className={styles.name}>{basics.name}</h2>
          <h3 className={styles.label}>{basics.label}</h3>
          {(city || region) && (
            <div className={styles.location}>{[city, region].filter(Boolean).join(', ')}</div>
          )}
        </div>

        <div className={styles.contact}>
          <ul>
            {basics.website && (
              <li>
                <span className={styles.icon}>🌐</span>{' '}
                <a href={basics.website}>{prettyUrl(basics.website)}</a>
              </li>
            )}
            {basics.phone && (
              <li>
                <span className={styles.icon}>📞</span>{' '}
                <a href={`tel:${basics.phone}`}>{basics.phone}</a>
              </li>
            )}
            {basics.email && (
              <li>
                <span className={styles.icon}>✉️</span>{' '}
                <a href={`mailto:${basics.email}`}>{basics.email}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      {basics.summary && <p className={styles.summary}>{basics.summary}</p>}
    </section>
  )
}

function prettyUrl(url: string) {
  return url.replace(/^https?:\/\//i, '').replace(/\/+$/g, '')
}
