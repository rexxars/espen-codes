import * as React from 'react'
import {JsonResume} from './Resume'
import {MONTHS} from '../../config/constants'
import styles from './WorkExperience.module.css'
import sharedStyles from './shared.module.css'

export function Education({education = []}: {education: JsonResume['education']}) {
  return (
    <section className={styles.root}>
      <h2 className={sharedStyles.heading}>Education</h2>

      <ol>
        {education
          .sort((a, b) => (a.startDate > b.startDate ? -1 : 1))
          .map((study) => (
            <li key={study._key || study.institution}>
              <div className={styles.study}>
                <div className={styles.institution}>
                  <h3 className={styles.institutionName}>{study.institution}</h3>
                </div>
                <div className={styles.date}>
                  <time dateTime={study.startDate}>{formatDate(study.startDate)}</time>
                  {' - '}
                  <time dateTime={study.endDate}>{formatDate(study.endDate)}</time>
                </div>
              </div>

              <div className={styles.position}>
                {study.studyType}: {study.area}
              </div>
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
