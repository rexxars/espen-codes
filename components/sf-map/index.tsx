import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./SfMap'), {ssr: false})

export function SfMap(props) {
  return <Map {...props} />
}
