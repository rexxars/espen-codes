import {getImageDimensions} from '@sanity/asset-utils'
import {ProjectedGuideImage} from '../types'

export function isPortraitImage(img: ProjectedGuideImage): boolean {
  return getImageDimensions(img.asset._ref).aspectRatio < 1
}

export function isLandscapeImage(img: ProjectedGuideImage): boolean {
  return !isPortraitImage(img)
}
