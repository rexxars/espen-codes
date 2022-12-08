import {StructureBuilder} from 'sanity/desk'

const excludedTypes = ['jsonResume']

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Default handling
      ...S.documentTypeListItems().filter((item) => !excludedTypes.includes(item.getId())),

      // Dat resume
      S.listItem()
        .title('Resumé')
        .child(S.document().schemaType('jsonResume').documentId('resume')),
    ])
