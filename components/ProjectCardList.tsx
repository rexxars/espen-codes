import React from 'react'
import {Project} from '../types/types'
import {ProjectCard} from './ProjectCard'
import styles from './ProjectCardList.module.css'

export function ProjectCardList({projects}: {projects: Project[]}) {
  return (
    <ul className={styles.list}>
      {projects.map((project) => (
        <ProjectCard as="li" key={project.slug.current} project={project} />
      ))}
    </ul>
  )
}
