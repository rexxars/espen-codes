import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeSkill',
  title: 'Skill',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
})
