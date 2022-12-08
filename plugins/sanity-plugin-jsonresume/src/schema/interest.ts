import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeInterest',
  title: 'Interest',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'eg Wildlife, Sailing',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
})
