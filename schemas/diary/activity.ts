import {defineField, defineType} from 'sanity'

export const activityType = defineType({
  name: 'activity',
  title: 'Activity',
  type: 'document',
  orderings: [
    {
      name: 'timeDesc',
      title: 'Time, new to old',
      by: [{field: 'time', direction: 'desc'}],
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'distance',
      title: 'Distance',
      description: 'Total distance in meters.',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'path',
      title: 'Path',
      description: 'The simplified GPS route displayed on the map.',
      type: 'geoPath',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hidden',
      title: 'Hidden',
      description: 'Exclude this activity from the public map.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      distance: 'distance',
      hidden: 'hidden',
      time: 'time',
      title: 'name',
    },
    prepare({distance, hidden, time, title}) {
      const date = typeof time === 'string' ? time.slice(0, 10) : undefined
      const length =
        typeof distance === 'number' ? `${(distance / 1_000).toFixed(2)} km` : undefined
      const subtitle = [date, length, hidden ? 'Hidden' : undefined].filter(Boolean).join(' · ')

      return {
        title: typeof title === 'string' && title ? title : 'Untitled activity',
        ...(subtitle ? {subtitle} : {}),
      }
    },
  },
})
