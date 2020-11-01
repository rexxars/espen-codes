import {Block, Image, ImageAsset, SanityDocument, Slug} from '@sanity/types'

export interface Project extends SanityDocument {
  _type: 'project'
  title: string
  slug: Slug
  summary?: string
  priority?: number
  keywords?: string[]
  image?: Image | MaterializedImage
  legacyImage?: Image | MaterializedImage
  description?: Block[]
  authoredFor?: string
  websiteUrl?: string
}

export interface MaterializedImage extends Omit<Image, 'asset'> {
  asset: ImageAsset
}

export function isMaterializedImage(image: Image | MaterializedImage): image is MaterializedImage {
  return '_id' in image.asset
}
