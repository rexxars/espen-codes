import {CSSProperties, ReactNode, useCallback, useState} from 'react'
import Measure, {ContentRect} from 'react-measure'
import {Blurhash} from 'react-blurhash'
import urlFor from '@sanity/image-url'
import {ProjectedGuideImage} from '../types/types'
import {
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  TRAVEL_GUIDES_DATASET,
  TRAVEL_GUIDES_PROJECT_ID,
} from '../config/constants'
import {useImageLoaded} from '../hooks/useImageLoaded'

type AssetSource =
  | {asset: {_ref: string}}
  | {asset: {_id: string}}
  | {_ref: string}
  | {_id: string}
  | ProjectedGuideImage

type UrlBuilder = (asset: AssetSource) => ReturnType<typeof urlFor>
type ProjectName = 'travelGuides' | 'espenCodes'

interface ImageProps {
  asset: AssetSource
  children?: ReactNode
  project?: ProjectName
  asBackground?: boolean

  className?: string
  style?: CSSProperties
}

const builders: Record<ProjectName, UrlBuilder> = {
  travelGuides: (asset: AssetSource) =>
    urlFor({projectId: TRAVEL_GUIDES_PROJECT_ID, dataset: TRAVEL_GUIDES_DATASET}).image(asset),

  espenCodes: (asset: AssetSource) =>
    urlFor({projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET}).image(asset),
}

const getBlurHash = (asset: AssetSource): string | undefined => {
  return 'blurHash' in asset ? asset.blurHash : undefined
}

const handleDragStart = (e) => e.preventDefault()

export function SanityImage({
  asset,
  children,
  className,
  asBackground,
  style,
  project = 'travelGuides',
}: ImageProps) {
  const [rect, setRect] = useState<ContentRect>()
  const onResize = useCallback((newRect: ContentRect) => setRect(newRect), [setRect])
  const builder = builders[project]
  const blurHash = getBlurHash(asset)

  return (
    <Measure bounds onResize={onResize}>
      {({measureRef}) => {
        const width = rect?.bounds?.width
        const height = rect?.bounds?.height

        const src =
          rect &&
          rect.bounds &&
          builder(asset)
            .fit('crop')
            .width(Math.ceil(width))
            .height(Math.ceil(height))
            .dpr(Math.min(3, Math.ceil(window.devicePixelRatio)))
            .auto('format')
            .quality(90)
            .toString()

        const isLoaded = useImageLoaded(src)
        const containerStyles = asBackground
          ? {...style, backgroundImage: `url(${src})`, backgroundSize: 'cover'}
          : style

        return (
          <div ref={measureRef} style={containerStyles} className={className}>
            {src && !isLoaded && (
              <Blurhash
                hash={blurHash}
                width={width}
                height={height}
                resolutionX={32}
                resolutionY={32}
                punch={1}
              />
            )}

            {asBackground ? (
              children
            ) : (
              <img
                onDragStart={handleDragStart}
                src={src}
                style={{width: '100%', display: 'block'}}
              />
            )}
          </div>
        )
      }}
    </Measure>
  )
}

export function BackgroundImage(props: ImageProps) {
  return <SanityImage {...props} asBackground />
}
