export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      title: 'Restaurant image',
      type: 'image',
    },
    {
      name: 'lat',
      title: 'Latitude of the restaurant',
      type: 'number',
    },
    {
      name: 'long',
      title: 'Longitude of the restaurant',
      type: 'number',
    },
    {
      name: 'rating',
      title: 'Enter a rating from (1-5 stars)',
      type: 'number',
      validation: (Rule) =>
        Rule.required().min(1).max(5).error('Enter a value between 1 and 5'),
    },
    {
      name: 'address',
      title: 'Restaurant address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'dishes',
      title: 'Dishes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'dish' }] }],
    },
  ],
};
