import {ACTIVE_PRESENTATION} from '../constants'
import {defaultPresentation} from './default/manifest'
import {minimalPresentation} from './minimal/manifest'

export const PRESENTATION_NAMES: string[] = ['default', 'minimal']

export function getPresentation(name: string = ACTIVE_PRESENTATION): typeof defaultPresentation {
  switch (name) {
    case 'default':
      return defaultPresentation
    case 'minimal':
      return minimalPresentation
    default:
      return defaultPresentation
  }
}
