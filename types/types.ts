import type {Image, ImageAsset, SanityDocument, Slug} from '@sanity/types'
import type {PortableTextBlock} from '@portabletext/types'

export interface Project extends SanityDocument {
  _type: 'project'
  title: string
  slug: Slug
  summary?: string
  priority?: number
  keywords?: string[]
  image?: Image | MaterializedImage
  legacyImage?: Image | MaterializedImage
  description?: PortableTextBlock[]
  authoredFor?: string
  websiteUrl?: string
}

export interface Geopoint {
  _type?: 'geopoint'
  lat: number
  lng: number
  alt?: number
}

export interface MaterializedImage extends Omit<Image, 'asset'> {
  asset: ImageAsset
}

export function isMaterializedImage(image: Image | MaterializedImage): image is MaterializedImage {
  return '_id' in image.asset
}
