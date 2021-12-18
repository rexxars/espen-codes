import React, {useCallback, useState} from 'react'
import {GrFormPrevious, GrFormNext} from 'react-icons/gr'
import Carousel from 'react-alice-carousel'
import {ProjectedTravelGuideLocation, ProjectedLocation} from '../../types/types'
import {SanityImage} from '../SanityImage'
import {isLandscapeImage, isPortraitImage} from '../../utils/imageHelpers'
import {MiniGuideHeader} from './MiniGuideHeader'
import styles from './LocationHeader.module.css'

// @todo see if we can transition to css modules
import 'react-alice-carousel/lib/alice-carousel.css'

const handleDragStart = (evt) => evt.preventDefault()

export function LocationHeader({
  location,
  guide,
  assumePortraitMode,
}: {
  location: ProjectedLocation
  guide: ProjectedTravelGuideLocation['guide']
  assumePortraitMode: boolean
}) {
  const {title, photos = []} = location
  const [activePhoto, setActivePhoto] = useState(0)
  const handleChangeSlided = useCallback((evt) => setActivePhoto(evt.item), [setActivePhoto])
  const handlePrevPhoto = useCallback(
    () => setActivePhoto((prev) => (prev - 1 < 0 ? photos.length - 1 : prev - 1)),
    [setActivePhoto],
  )
  const handleNextPhoto = useCallback(
    () => setActivePhoto((prev) => (prev + 1 === photos.length ? 0 : prev + 1)),
    [setActivePhoto],
  )
  const isPortrait =
    typeof window === 'undefined' ? assumePortraitMode : window.innerHeight > window.innerWidth

  if (!photos.length) {
    return null
  }

  const coverImage = photos.find(isPortrait ? isPortraitImage : isLandscapeImage) || photos[0]
  const otherImages = photos.filter((img) => img !== coverImage)
  const {colors} = coverImage

  const items = [].concat(
    <SanityImage asset={coverImage} className={styles.coverImage} />,
    otherImages.map((image) => <SanityImage asset={image} className={styles.coverImage} />),
  )

  return (
    <header className={styles.header}>
      {guide.showHeaderOnLocations && (
        <MiniGuideHeader guide={guide} className={styles.miniHeader} />
      )}

      <div className={styles.carousel}>
        <Carousel
          activeIndex={activePhoto}
          items={items}
          onSlideChanged={handleChangeSlided}
          disableDotsControls
          disableButtonsControls
          disableSlideInfo
          mouseTracking
          infinite
        />
      </div>

      <div className={styles.carouselOverlay} onDragStart={handleDragStart}>
        <div className={styles.buttons}>
          <div>
            <button type="button" className={styles.prevPhotoButton} onClick={handlePrevPhoto}>
              <GrFormPrevious className={styles.arrowIcon} />
            </button>
          </div>

          <div>
            <button type="button" className={styles.nextPhotoButton} onClick={handleNextPhoto}>
              <GrFormNext className={styles.arrowIcon} />
            </button>
          </div>
        </div>

        <div className={styles.photoCount}>
          Photo {activePhoto + 1} / {items.length}
        </div>

        <h1 style={{...colors, background: alpha(colors.background, 80)}} className={styles.title}>
          {title}
        </h1>
      </div>
    </header>
  )
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
