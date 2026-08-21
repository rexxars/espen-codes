import {defineField, defineType} from 'sanity'

export const projectReflectionType = defineType({
  name: 'projectReflection',
  title: 'Project reflection',
  description: 'A dated look back at what the project was like to make and what came from it.',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'A short heading that captures the focus of this reflection.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      description: 'When this reflection was written or substantially revised.',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'An optional one- or two-sentence overview shown before the full reflection.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description:
        'The full reflection, including lessons learned, outcomes, and later perspective.',
      type: 'portableText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title', publishedAt: 'publishedAt'},
    prepare({publishedAt, title}) {
      const date = typeof publishedAt === 'string' ? publishedAt.slice(0, 10) : undefined
      return date ? {title, subtitle: date} : {title}
    },
  },
})
