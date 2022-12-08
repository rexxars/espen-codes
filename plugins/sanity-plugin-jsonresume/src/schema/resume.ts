import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeResume',
  title: 'Résumé',
  type: 'document',
  fields: [
    {
      name: 'basics',
      title: 'Basics',
      type: 'jsonResumeBasics',
    },
    {
      name: 'work',
      title: 'Work',
      type: 'array',
      of: [{type: 'jsonResumeWork'}],
    },
    {
      name: 'volunteer',
      title: 'Volunteer',
      type: 'array',
      of: [{type: 'jsonResumeVolunteer'}],
    },
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{type: 'jsonResumeEducation'}],
    },
    {
      name: 'awards',
      title: 'Awards',
      type: 'array',
      of: [{type: 'jsonResumeAward'}],
    },
    {
      name: 'publications',
      title: 'Publications',
      type: 'array',
      of: [{type: 'jsonResumePublication'}],
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{type: 'jsonResumeSkill'}],
    },
    {
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{type: 'jsonResumeLanguage'}],
    },
    {
      name: 'interests',
      title: 'Interests',
      type: 'array',
      of: [{type: 'jsonResumeInterest'}],
    },
    {
      name: 'references',
      title: 'References',
      type: 'array',
      of: [{type: 'jsonResumeReference'}],
    },
  ],
  preview: {
    select: {
      title: 'basics.name',
      media: 'basics.picture',
    },
  },
})
