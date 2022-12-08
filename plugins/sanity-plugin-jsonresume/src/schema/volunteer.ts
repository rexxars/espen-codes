import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeVolunteer',
  title: 'Volunteer',
  type: 'object',
  fields: [
    {
      name: 'organization',
      title: 'Organization',
      type: 'string',
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
    },
    {
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      title: 'End date',
      type: 'date',
      validation: (Rule) => Rule.min(Rule.valueOfField('startDate')),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'text', rows: 2}],
    },
  ],
})
