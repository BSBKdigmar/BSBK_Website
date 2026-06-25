export default {
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200
      },
      validation: Rule => Rule.required()
    },

    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3
    },

    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true
      }
    },

    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },

    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Water Treatment', value: 'water-treatment' },
          { title: 'Wastewater Treatment', value: 'wastewater-treatment' },
          { title: 'Boiler Treatment', value: 'boiler-treatment' },
          { title: 'Cooling Tower', value: 'cooling-tower' },
          { title: 'Reverse Osmosis', value: 'reverse-osmosis' },
          { title: 'Industrial Water', value: 'industrial-water' },
          { title: 'Company News', value: 'company-news' },
          { title: 'Project Update', value: 'project-update' }
        ]
      }
    },

    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string'
    },

    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3
    },

    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime'
    },

    {
      name: 'author',
      title: 'Author',
      type: 'string'
    }
  ],

  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      subtitle: 'category'
    }
  }
}