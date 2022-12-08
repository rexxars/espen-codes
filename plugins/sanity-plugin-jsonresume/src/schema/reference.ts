import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeReference',
  title: 'Reference',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'reference',
      title: 'Reference',
      type: 'string',
    },
  ],
})
