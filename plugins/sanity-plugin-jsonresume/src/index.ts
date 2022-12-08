import {PluginFactory, SchemaTypeDefinition} from 'sanity'
import {schemaTypes} from './schema'

export interface JsonResumePluginOptions {
  schemaTypePrefix?: string
}

const maybePrefixTypes = (() => {
  let lastPrefix = ''
  let lastResult: SchemaTypeDefinition[] = []
  return (prefix?: string): SchemaTypeDefinition[] => {
    if (!prefix || prefix === 'jsonResume') {
      return schemaTypes
    }

    if (prefix === lastPrefix) {
      return lastResult
    }

    // Memoize
    lastPrefix = prefix
    lastResult = schemaTypes.map((type) => ({
      ...type,
      name: type.name.replace(/^jsonResume/, prefix),
    }))

    return lastResult
  }
})()

export const jsonResume: PluginFactory<JsonResumePluginOptions | void> = (options = {}) => {
  const prefix = (options && options.schemaTypePrefix) || undefined
  return {
    name: 'jsonResume',
    schema: {types: maybePrefixTypes(prefix)},
  }
}
