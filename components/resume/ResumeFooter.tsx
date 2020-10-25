import * as React from 'react'
import {ExternalLink} from '../ExternalLink'
import {JsonResume} from './Resume'
import styles from './ResumeFooter.module.css'
import sharedStyles from './shared.module.css'

export function ResumeFooter({
  skills = [],
  languages = [],
  profiles = [],
}: {
  skills?: JsonResume['skills']
  languages?: JsonResume['languages']
  profiles?: JsonResume['basics']['profiles']
}) {
  return (
    <section className={styles.root}>
      <div className={styles.row}>
        {skills.length > 0 && (
          <section>
            <h2 className={sharedStyles.heading}>Skills</h2>
            <ul>
              {skills.map((skill) => (
                <li key={skill._key || skill.name} className={sharedStyles.spacedListItem}>
                  <h3 className={sharedStyles.subheading}>{skill.name}</h3>{' '}
                  {skill.keywords.join(', ')}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          {languages.length > 0 && (
            <>
              <h2 className={sharedStyles.heading}>Languages</h2>
              <ul className={styles.spacedList}>
                {languages.map((lang) => (
                  <li key={lang._key || lang.language} className={sharedStyles.spacedListItem}>
                    <h3 className={sharedStyles.subheading}>{lang.language}</h3>
                    {lang.fluency}
                  </li>
                ))}
              </ul>
            </>
          )}

          {profiles && (
            <>
              <h2 className={sharedStyles.heading}>Online profiles</h2>
              <ul>
                {profiles.map((profile) => (
                  <li key={profile._key || profile.network} className={sharedStyles.spacedListItem}>
                    <strong>{profile.network}:</strong>{' '}
                    <ExternalLink href={profile.url}>{profile.username}</ExternalLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </section>
  )
}
