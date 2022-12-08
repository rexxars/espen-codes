import {defineType} from 'sanity'

export default defineType({
  name: 'jsonResumeLocation',
  title: 'Location',
  type: 'object',
  fields: [
    {
      name: 'address',
      title: 'Address',
      type: 'string',
    },
    {
      name: 'postalCode',
      title: 'Postal code',
      type: 'string',
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
    },
    {
      name: 'countryCode',
      title: 'Country code',
      type: 'string',
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
    },
  ],
})
