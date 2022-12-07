import {defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'number',
    },
    {
      name: 'legacyImage',
      title: 'Legacy image',
      type: 'image',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url',
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'authoredFor',
      title: 'Authored for',
      type: 'string',
      options: {
        list: ['VaffelNinja', 'Atami AS', 'Verdens Gang (VG)', 'Elkjøp'],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'legacyImage',
    },
  },
  orderings: [
    {
      title: 'Priority',
      name: 'priorityAsc',
      by: [{field: 'priority', direction: 'asc'}],
    },
    {
      title: 'Title',
      name: 'Title',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
