import {MONTHS} from '../constants'

export function formatMonthAndYear(dateString?: string): string {
  if (!dateString) {
    return 'Present'
  }

  const date = new Date(`${dateString.slice(0, 10)}T12:00:00Z`)
  const month = MONTHS[date.getUTCMonth()]
  return `${month ?? ''} ${date.getUTCFullYear()}`.trim()
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(dateString))
}
