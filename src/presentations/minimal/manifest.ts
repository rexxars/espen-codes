import {defaultPresentation} from '../default/manifest'
import Shell from './Shell.astro'

export const minimalPresentation: typeof defaultPresentation = {
  ...defaultPresentation,
  Shell,
}
