import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  description: 'Something I made, whether software, a physical object, or something stranger.',
  type: 'document',
  fieldsets: [
    {
      name: 'legacy',
      title: 'Legacy fields',
      description:
        'Fields retained so existing project documents keep rendering during the migration. Prefer the newer fields above.',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'The public name of the project.',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'The stable URL segment used for the project page.',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      description: 'The broad kind of work this project represents.',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Library', value: 'library'},
          {title: 'App', value: 'app'},
          {title: 'Software', value: 'software'},
          {title: '3D model', value: 'model'},
          {title: 'Electronics', value: 'electronics'},
          {title: 'Woodworking', value: 'woodworking'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      description: "The project's current state.",
      type: 'string',
      options: {
        list: [
          {title: 'Planned', value: 'planned'},
          {title: 'In progress', value: 'inProgress'},
          {title: 'Complete', value: 'complete'},
          {title: 'Maintained', value: 'maintained'},
          {title: 'Paused', value: 'paused'},
          {title: 'Retired', value: 'retired'},
        ],
      },
    }),
    defineField({
      name: 'statusNote',
      title: 'Status note',
      description: 'Optional context that explains the current status.',
      type: 'string',
    }),
    defineField({
      name: 'statusChangedAt',
      title: 'Status changed',
      description: 'The date the project entered its current status.',
      type: 'date',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description:
        'A concise introduction used on project cards and at the top of the project page.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'startedAt',
      title: 'Started',
      description: 'When work on the project began, if known.',
      type: 'date',
    }),
    defineField({
      name: 'releasedAt',
      title: 'First released',
      description: 'When the project first became public or usable.',
      type: 'date',
    }),
    defineField({
      name: 'completedAt',
      title: 'Completed',
      description: 'When the project was finished, where “finished” makes sense.',
      type: 'date',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      description: 'Technologies, materials, techniques, or themes associated with the project.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Whether the project should receive extra prominence in project listings.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      description:
        'Project identity artwork, not an illustration of the whole project. Prefer a simple, bold mark or short logotype centered on a flat or subtle gradient background, using a small, project-specific palette with strong contrast. It must remain recognizable at 320 × 180: avoid explanatory copy, diagrams, scenes, fine detail, and decorative clutter. Prefer a 16:9 SVG with a 1600 × 900 viewBox so it stays sharp at every size, and keep essential artwork away from the edges. Raster images are supported; use the hotspot to guide cropping.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      description: 'The primary wide image shown on the project page.',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      description: 'Additional images that help document the project and its process.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          description: 'A project image with optional alternative text and caption.',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              description: 'A useful textual description of what the image shows.',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              description: 'Optional context displayed alongside the image.',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'The main project write-up, including text, code, images, and embeds.',
      type: 'portableText',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      description: 'Useful destinations related to the project that are not published artifacts.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'projectLink',
          title: 'Project link',
          description: 'A labeled link to a project-related destination.',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'The text shown for this link.',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              description: 'The destination URL.',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'artifacts',
      title: 'Published artifacts',
      description:
        'Packages, repositories, model files, firmware, and other things people can use.',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'projectArtifact',
          title: 'Artifact',
          description: 'A structured output published by this project.',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              description: 'The public name of the artifact.',
              type: 'string',
            }),
            defineField({
              name: 'kind',
              title: 'Kind',
              description: 'The format or role of the artifact.',
              type: 'string',
              options: {
                list: [
                  {title: 'Package', value: 'package'},
                  {title: 'Repository', value: 'repository'},
                  {title: '3D model', value: 'model'},
                  {title: 'Firmware', value: 'firmware'},
                  {title: 'Download', value: 'download'},
                ],
              },
            }),
            defineField({
              name: 'provider',
              title: 'Provider',
              description: 'The service that hosts or distributes the artifact.',
              type: 'string',
              options: {
                list: [
                  {title: 'npm', value: 'npm'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Printables', value: 'printables'},
                  {title: 'MakerWorld', value: 'makerWorld'},
                  {title: 'Other', value: 'custom'},
                ],
              },
            }),
            defineField({
              name: 'identifier',
              title: 'Provider identifier',
              description: 'The provider-specific package, repository, or model identifier.',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              description: 'The canonical destination for this artifact.',
              type: 'url',
            }),
            defineField({
              name: 'license',
              title: 'License',
              description: 'The license under which this artifact is available.',
              type: 'string',
            }),
            defineField({
              name: 'firstReleasedAt',
              title: 'First released',
              description: 'When this particular artifact was first published.',
              type: 'date',
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'provider'},
          },
        }),
      ],
    }),
    defineField({
      name: 'reflections',
      title: 'Reflections',
      description: 'Dated notes looking back at the project, its outcome, and what I learned.',
      type: 'array',
      of: [defineArrayMember({type: 'projectReflection'})],
    }),
    defineField({
      name: 'authoredFor',
      title: 'Authored for',
      description: 'Legacy attribution retained for existing commissioned or employer projects.',
      type: 'string',
      fieldset: 'legacy',
    }),
    defineField({
      name: 'priority',
      title: 'Legacy priority',
      description: 'Legacy manual sort order retained for existing project listings.',
      type: 'number',
      fieldset: 'legacy',
    }),
    defineField({
      name: 'legacyImage',
      title: 'Legacy image',
      description: 'The original project image field, retained as a rendering fallback.',
      type: 'image',
      fieldset: 'legacy',
    }),
    defineField({
      name: 'image',
      title: 'Legacy new image',
      description:
        'A later image field from the previous schema, superseded by logo and cover image.',
      type: 'image',
      fieldset: 'legacy',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Legacy description',
      description: 'The previous Portable Text project body, superseded by the body field.',
      type: 'array',
      fieldset: 'legacy',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Legacy website URL',
      description: 'The previous primary website field, superseded by links and artifacts.',
      type: 'url',
      fieldset: 'legacy',
    }),
    defineField({
      name: 'githubUrl',
      title: 'Legacy GitHub URL',
      description: 'The previous GitHub field, superseded by links and repository artifacts.',
      type: 'url',
      fieldset: 'legacy',
    }),
  ],
  preview: {
    select: {title: 'title', kind: 'kind', status: 'status', media: 'logo'},
    prepare({kind, media, status, title}) {
      return {title, media, subtitle: [kind, status].filter(Boolean).join(' · ')}
    },
  },
  orderings: [
    {title: 'Priority', name: 'priorityAsc', by: [{field: 'priority', direction: 'asc'}]},
    {title: 'Title', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]},
  ],
})
