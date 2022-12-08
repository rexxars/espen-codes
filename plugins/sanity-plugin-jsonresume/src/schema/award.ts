import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeAward',
  title: 'Award',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'awarder',
      title: 'Awarder',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 5,
    },
  ],
})
