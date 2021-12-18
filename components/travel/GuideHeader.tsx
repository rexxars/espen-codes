import * as React from 'react'
import {ProjectedTravelGuideSplash} from '../../types'
import {BackgroundImage} from '../SanityImage'
import {ArrowDown} from '../ArrowDown'
import {TravelPortableText} from './TravelPortableText'
import styles from './GuideHeader.module.css'

export function GuideHeader({guide}: {guide: ProjectedTravelGuideSplash}) {
  const {coverImage, intro, title} = guide
  const {colors} = coverImage
  return (
    <header className={styles.root}>
      <BackgroundImage asset={coverImage} className={styles.coverImage}>
        <div className={styles.titleContainer}>
          <h1
            style={{...colors, background: alpha(colors.background, 160)}}
            className={styles.title}
          >
            {hackTitle(title)}
          </h1>
        </div>
        <div className={styles.fader}>
          <ArrowDown className={styles.arrowDown} />
        </div>
      </BackgroundImage>
    </header>
  )
}

/**
 * Replace spaces with non-breaking spaces in between names like
 * San Francisco and Los Angeles
 */
function hackTitle(title: string): string {
  return title.replace(/([A-Z][a-z]+) ([A-Z][a-z]+)/, '$1\u00A0$2')
}

/**
 * Add an alpha specifier to a hex color, eg '#f00' => '#ff0000bc'
 */
function alpha(color: string, amount: number): string {
  const hex =
    color.length === 4
      ? ['#', color[0], color[0], color[1], color[1], color[2], color[2]].join('')
      : color

  return `${hex}${amount.toString(16)}`
}
