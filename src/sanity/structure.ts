import type {StructureResolver} from 'sanity/structure'

const EXCLUDED_TYPES = ['jsonResumeResume']

export const structure: StructureResolver = (builder) =>
  builder
    .list()
    .title('Content')
    .items([
      ...builder
        .documentTypeListItems()
        .filter((item) => !EXCLUDED_TYPES.includes(item.getId() ?? '')),
      builder
        .listItem()
        .title('Résumé')
        .child(builder.document().schemaType('jsonResumeResume').documentId('resume')),
    ])
