import type {ProjectKind, ProjectStatus} from '../../types/content'

export const PROJECT_KIND_LABELS: Record<ProjectKind, string> = {
  electronics: 'Electronics',
  model: '3D model',
  other: 'Other',
  software: 'Software',
  woodworking: 'Woodworking',
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  complete: 'Complete',
  inProgress: 'In progress',
  maintained: 'Maintained',
  paused: 'Paused',
  planned: 'Planned',
  retired: 'Retired',
}
