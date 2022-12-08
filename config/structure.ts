import {StructureBuilder} from 'sanity/desk'

const excludedTypes = ['jsonResumeResume']

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Default handling
      ...S.documentTypeListItems().filter((item) => !excludedTypes.includes(item.getId())),

      // Dat resume
      S.listItem()
        .title('Résumé')
        .child(S.document().schemaType('jsonResumeResume').documentId('resume')),
    ])
