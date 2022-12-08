import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeProfile',
  title: 'Profile',
  type: 'object',
  fields: [
    {
      name: 'network',
      title: 'Network',
      type: 'string',
      description: 'eg "Twitter", "GitHub", "Skype" etc',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: /.*/}),
    },
  ],
})
