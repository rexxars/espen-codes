import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumePublication',
  title: 'Publication',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
    },
    {
      name: 'releaseDate',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
  ],
})
