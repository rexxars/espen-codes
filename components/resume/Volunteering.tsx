import * as React from 'react'
import {JsonResume} from './Resume'
import {MONTHS} from '../../config/constants'
import styles from './WorkExperience.module.css'
import sharedStyles from './shared.module.css'

export function Volunteering({volunteer = []}: {volunteer: JsonResume['volunteer']}) {
  return (
    <section className={styles.root}>
      <h2 className={sharedStyles.heading}>Volunteering</h2>

      <ol>
        {volunteer
          .sort((a, b) => (a.startDate > b.startDate ? -1 : 1))
          .map((job) => (
            <li key={job._key || job.organization}>
              <div className={styles.job}>
                <div className={styles.company}>
                  <h3 className={styles.companyName}>{job.organization}</h3>
                  <span className={styles.position}> - {job.position}</span>
                </div>
                <div className={styles.date}>
                  <time dateTime={job.startDate}>{formatDate(job.startDate)}</time>
                  {' - '}
                  <time dateTime={job.endDate}>{formatDate(job.endDate)}</time>
                </div>
              </div>

              {job.summary && <p className={styles.summary}>{job.summary}</p>}
            </li>
          ))}
      </ol>
    </section>
  )
}

function formatDate(dateStr = ''): string {
  if (!dateStr) {
    return 'Present'
  }

  const date = new Date(`${dateStr.slice(0, 10)}T12:00:00Z`)
  const month = MONTHS[date.getMonth()]
  return `${month} ${date.getFullYear()}`
}
