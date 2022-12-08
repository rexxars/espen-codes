import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeEducation',
  title: 'Education',
  type: 'object',
  fields: [
    {
      name: 'institution',
      title: 'Institution',
      type: 'string',
    },
    {
      name: 'area',
      title: 'Area',
      type: 'string',
      description: 'eg "Software Development", "Electrical Engineering"',
    },
    {
      name: 'studyType',
      title: 'Study type',
      type: 'string',
      description: 'eg "Bachelor", "Master"',
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
      name: 'gpa',
      title: 'GPA',
      type: 'number',
    },
    {
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
})
