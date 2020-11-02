import React from 'react'
import {urlForImage} from '../config/sanity'
import {isMaterializedImage, Project} from '../types/types'
import {ExternalLink} from './ExternalLink'
import styles from './ProjectCard.module.css'

const darkOverrides = [
  'react-markdown',
  'react-hexagon',
  'hacker-typer',
  'turn-off-my-monitor',
  'tyggo',
  'vektklubb',
  'trosteruter',
]

export interface ProjectCardProps {
  project: Project
  as?: string
  className?: string
}

export function ProjectCard({project, as = 'div', className}: ProjectCardProps) {
  const {legacyImage, title, websiteUrl, summary, slug, authoredFor, keywords = []} = project
  return React.createElement(
    as,
    {className: cls([styles.card, className])},
    <ExternalLink href={websiteUrl} className={styles.link}>
      <figure className={styles.figure} style={{backgroundColor: getBackgroundColor(legacyImage)}}>
        <ul className={getTagTextClass(getTextColor(legacyImage), slug.current)}>
          {keywords.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
        {legacyImage && (
          <img src={`${urlForImage(legacyImage)}?auto=format`} className={styles.legacyImage} />
        )}
      </figure>
      <div className={styles.meta}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.summary}>{summary}</p>
        {authoredFor && (
          <p className={styles.authoredFor} title={`Authored for ${authoredFor}`}>
            &copy; {authoredFor}
          </p>
        )}
      </div>
    </ExternalLink>,
  )
}

function cls(classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function getBackgroundColor(image: Project['image']): string {
  return isMaterializedImage(image)
    ? image.asset.metadata?.palette?.dominant?.background || undefined
    : undefined
}

function getTextColor(image: Project['image']): string {
  return isMaterializedImage(image)
    ? image.asset.metadata?.palette?.dominant?.title || undefined
    : undefined
}

function getTagTextClass(color: string, slug: string) {
  return color === '#fff' && !darkOverrides.includes(slug) ? styles.lightTags : styles.tags
}
