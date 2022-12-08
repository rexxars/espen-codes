import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeLanguage',
  title: 'Language',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'eg Norwegian, Spanish, Dutch',
    },
    {
      name: 'fluency',
      title: 'Fluency',
      type: 'string',
    },
  ],
})
