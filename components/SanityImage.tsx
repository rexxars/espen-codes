import {CSSProperties, ReactNode, useCallback, useState} from 'react'
import Measure, {ContentRect} from 'react-measure'
import urlFor from '@sanity/image-url'
import {SANITY_DATASET, SANITY_PROJECT_ID} from '../config/constants'

type AssetSource = {asset: {_ref: string}} | {asset: {_id: string}} | {_ref: string} | {_id: string}

type UrlBuilder = (asset: AssetSource) => ReturnType<typeof urlFor>
type ProjectName = 'espenCodes'

interface ImageProps {
  asset: AssetSource
  children?: ReactNode
  project?: ProjectName
  asBackground?: boolean

  className?: string
  style?: CSSProperties
}

const builders: Record<ProjectName, UrlBuilder> = {
  espenCodes: (asset: AssetSource) =>
    urlFor({projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET}).image(asset),
}

const handleDragStart = (e) => e.preventDefault()

export function SanityImage({
  asset,
  children,
  className,
  asBackground,
  style,
  project = 'espenCodes',
}: ImageProps) {
  const [rect, setRect] = useState<ContentRect>()
  const onResize = useCallback((newRect: ContentRect) => setRect(newRect), [setRect])
  const builder = builders[project]

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

        const containerStyles = asBackground
          ? {...style, backgroundImage: `url(${src})`, backgroundSize: 'cover'}
          : style

        return (
          <div ref={measureRef} style={containerStyles} className={className}>
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
