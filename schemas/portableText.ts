import {defineArrayMember, defineField, defineType} from 'sanity'

export const portableTextType = defineType({
  title: 'Portable Text',
  name: 'portableText',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bulleted', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [defineField({name: 'href', title: 'URL', type: 'url'})],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
      ],
    }),
    defineArrayMember({
      name: 'codeBlock',
      title: 'Code block',
      type: 'object',
      fields: [
        defineField({name: 'filename', title: 'Filename', type: 'string'}),
        defineField({name: 'language', title: 'Language', type: 'string'}),
        defineField({name: 'code', title: 'Code', type: 'text', rows: 16}),
      ],
      preview: {
        select: {title: 'filename', subtitle: 'language'},
        prepare({subtitle, title}) {
          return {title: title ?? 'Code block', subtitle}
        },
      },
    }),
    defineArrayMember({
      name: 'embed',
      title: 'Embed',
      type: 'object',
      fields: [
        defineField({
          name: 'provider',
          title: 'Provider',
          type: 'string',
          options: {
            list: [
              {title: 'YouTube', value: 'youtube'},
              {title: 'CodePen', value: 'codepen'},
              {title: 'GitHub Gist', value: 'githubGist'},
              {title: '3D model viewer', value: 'modelViewer'},
              {title: 'Link preview', value: 'link'},
            ],
          },
        }),
        defineField({name: 'url', title: 'URL', type: 'url'}),
        defineField({name: 'caption', title: 'Caption', type: 'string'}),
      ],
      preview: {select: {title: 'caption', subtitle: 'provider'}},
    }),
  ],
})
