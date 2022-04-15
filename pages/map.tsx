import {SfMap} from '../components/sf-map'
import {diaryClient} from '../config/sanity.server'

export async function getServerSideProps() {
  return {
    props: {
      paths: await diaryClient.fetch(`
        *[_type == 'activity' && hidden != true] {
          "path": path.points[] {
            lat,
            lng
          }
        }.path`),
    },
  }
}

export default function SanFranMap(props) {
  return <SfMap paths={props.paths} />
}
