import type {PortableTextBlock} from '@portabletext/types'
import type {Image} from '@sanity/types'

export type ProjectKind = 'software' | 'model' | 'electronics' | 'woodworking' | 'other'

export type ProjectStatus =
  'planned' | 'inProgress' | 'complete' | 'maintained' | 'paused' | 'retired'

export interface ImagePalette {
  background?: string
  title?: string
}

export interface ProjectLink {
  _key: string
  label: string
  url: string
}

export interface ProjectArtifact {
  _key: string
  kind: 'package' | 'repository' | 'model' | 'firmware' | 'download'
  label: string
  provider?: 'npm' | 'github' | 'printables' | 'makerWorld' | 'custom'
  identifier?: string
  url: string
  license?: string
  firstReleasedAt?: string
}

export interface Project {
  _id: string
  title: string
  slug: string
  summary?: string
  kind?: ProjectKind
  status?: ProjectStatus
  statusNote?: string
  statusChangedAt?: string
  startedAt?: string
  releasedAt?: string
  completedAt?: string
  keywords: string[]
  priority?: number
  featured?: boolean
  logo?: Image
  coverImage?: Image
  legacyImage?: Image
  legacyImagePalette?: ImagePalette
  body?: PortableTextValue
  links: ProjectLink[]
  artifacts: ProjectArtifact[]
  reflections: ProjectReflection[]
  websiteUrl?: string
  githubUrl?: string
  authoredFor?: string
}

export interface ProjectReflection {
  _key: string
  title: string
  publishedAt: string
  summary?: string
  body: PortableTextValue
}

export interface Post {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  mainImage?: Image
  body: PortableTextValue
}

export interface Pet {
  bio: PortableTextValue
}

export interface PortableTextCodeBlock {
  _key: string
  _type: 'codeBlock'
  code: string
  filename?: string
  language?: string
}

export interface PortableTextEmbed {
  _key: string
  _type: 'embed'
  caption?: string
  provider: 'youtube' | 'codepen' | 'githubGist' | 'modelViewer' | 'link'
  url: string
}

export interface PortableTextImage extends Image {
  _key: string
  _type: 'image'
  alt: string
  caption?: string
}

export type PortableTextValue = Array<
  PortableTextBlock | PortableTextCodeBlock | PortableTextEmbed | PortableTextImage
>
