import {defineArrayMember, defineField, defineType} from 'sanity'

export const geoPathType = defineType({
  name: 'geoPath',
  title: 'Geographic path',
  type: 'object',
  fields: [
    defineField({
      name: 'points',
      title: 'Points',
      type: 'array',
      of: [defineArrayMember({type: 'geopoint'})],
      validation: (rule) => rule.required().min(2),
    }),
  ],
})
