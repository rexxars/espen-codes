import {createImageUrlBuilder, type ImageUrlBuilder} from '@sanity/image-url'
import type {Image} from '@sanity/types'

import {sanityClient} from 'sanity:client'

const imageBuilder = createImageUrlBuilder(sanityClient)

export function urlForImage(image: Image): ImageUrlBuilder {
  return imageBuilder.image(image)
}
