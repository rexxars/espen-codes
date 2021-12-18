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

export interface PortableTextBlock<MarkDefs = never> {
  _key: string
  _type: 'block'
  children: PortableTextSpan[]
  markDefs: MarkDefs[]
  style: string
}

export interface PortableTextSpan {
  _key: string
  _type: 'span'
  marks: string[]
  text: string
}

export interface ProjectedTravelGuideSplash {
  _id: string
  title: string
  slug: string
  disableIndexing?: boolean
  coverImage: ProjectedGuideImage
  intro: PortableTextBlock<ProjectedAnnotation | LocationReference>[]
  locationTitles: string[]
  locationIds: string[]
}

export interface ProjectedTravelGuideLocation {
  guide: {
    _id: string
    title: string
    slug: string
    disableIndexing?: boolean
    showHeaderOnLocations?: boolean
    locationIds: string[]
  }
  prevLocationTitle?: string
  nextLocationTitle?: string
  locationTitles: string[]
  locationIndex: number
  locationCount: number
  location: ProjectedLocation
}

export interface ProjectedGuideImage extends Image {
  _type: 'image'
  blurHash: string
  colors: {background: string; color: string}
}

export interface Geopoint {
  _type?: 'geopoint'
  lat: number
  lng: number
  alt?: number
}

export interface ProjectedLocation {
  _id: string
  title: string
  area?: string
  type?: {
    name: string
    slug: {current: string}
  }
  description?: PortableTextBlock<ProjectedAnnotation | LocationReference>[]
  position?: Geopoint
  photos?: ProjectedGuideImage[]
}

export interface LocationReference {
  _type: 'location'
  _key: string
  _ref: string
}

export interface ProjectedAnnotation {
  _type: 'annotation'
  _key: string
  title: string
  description: PortableTextBlock[]
}

export interface MaterializedImage extends Omit<Image, 'asset'> {
  asset: ImageAsset
}

export function isMaterializedImage(image: Image | MaterializedImage): image is MaterializedImage {
  return '_id' in image.asset
}

export function isMaterializedGuideImage(
  image: Image | ProjectedGuideImage,
): image is ProjectedGuideImage {
  return '_id' in image.asset
}
