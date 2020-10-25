import React from 'react'
import styles from './Resume.module.css'
import {ResumeHeader} from './ResumeHeader'
import {ResumeFooter} from './ResumeFooter'
import {Volunteering} from './Volunteering'
import {WorkExperience} from './WorkExperience'

export function Resume({resume}: {resume: JsonResume}) {
  return (
    <div className={styles.root}>
      <ResumeHeader resume={resume} />
      {resume.work && <WorkExperience work={resume.work} />}
      {resume.volunteer && <Volunteering volunteer={resume.volunteer} />}
      {(resume.skills || resume.languages || resume.basics.profiles) && (
        <ResumeFooter
          skills={resume.skills}
          languages={resume.languages}
          profiles={resume.basics.profiles}
        />
      )}
    </div>
  )
}

export interface JsonResume {
  basics: {
    name: string
    email?: string
    label?: string
    phone?: string
    summary?: string
    website?: string
    picture?: {
      asset: {
        _ref: string
      }
    }
    location?: {city?: string; region?: string}
    profiles?: {_key: string; network: string; url: string; username?: string}[]
  }
  skills: {_key: string; keywords: string[]; name: string}[]
  languages: {_key: string; fluency: string; language: string}[]
  work?: {
    _key: string
    company: string
    highlights: string[]
    position: string
    startDate: string
    endDate?: string
    website?: string
    summary?: string
  }[]
  volunteer?: {
    _key: string
    organization: string
    highlights: string[]
    position: string
    startDate: string
    endDate?: string
    website?: string
    summary?: string
  }[]
}
