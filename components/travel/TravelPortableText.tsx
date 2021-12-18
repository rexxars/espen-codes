import Link from 'next/link'
import {PortableTextSerializers} from '@sanity/block-content-to-react'
import {createElement, useMemo} from 'react'
import {PortableText} from '../../config/sanity'
import {
  LocationReference,
  PortableTextBlock,
  ProjectedAnnotation,
  ProjectedTravelGuideLocation,
  ProjectedTravelGuideSplash,
} from '../../types'
import {Prose} from './Prose'
import styles from './TravelPortableText.module.css'

export function TravelPortableText({
  blocks,
  guide,
}: {
  blocks: PortableTextBlock<ProjectedAnnotation | LocationReference>[]
  guide: ProjectedTravelGuideLocation['guide'] | ProjectedTravelGuideSplash
}) {
  const serializers = useMemo(
    (): PortableTextSerializers => ({
      container: Prose,
      list: (props) => {
        const tag = props.type === 'bullet' ? 'ul' : 'ol'
        const className = props.type === 'bullet' ? styles.unorderedList : styles.orderedList
        return createElement(tag, {className}, props.children)
      },
      marks: {
        location: ({mark, children}) => {
          const index = guide.locationIds.indexOf(mark._ref) + 1
          return (
            <Link href={`/travel-guides/${guide.slug}/${index}`}>
              <a>{children}</a>
            </Link>
          )
        },
      },
    }),
    [guide],
  )

  return <PortableText blocks={blocks} renderContainerOnSingleChild serializers={serializers} />
}
