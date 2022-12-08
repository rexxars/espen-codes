import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeBasics',
  title: 'Resume Basics',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },

    {
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'eg "Front-end developer", "Designer", "DevOps Engineer"',
    },

    {
      name: 'picture',
      title: 'Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },

    {
      name: 'phone',
      title: 'Phone number',
      type: 'string',
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

    {
      name: 'location',
      title: 'Location',
      type: 'jsonResumeLocation',
    },

    {
      name: 'profiles',
      title: 'Profiles',
      type: 'array',
      of: [{type: 'jsonResumeProfile'}],
    },
  ],
})
