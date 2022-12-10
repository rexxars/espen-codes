import {getImageDimensions, SanityImageSource} from '@sanity/asset-utils'

export function isPortraitImage(img: SanityImageSource): boolean {
  return getImageDimensions(img).aspectRatio < 1
}

export function isLandscapeImage(img: SanityImageSource): boolean {
  return !isPortraitImage(img)
}
