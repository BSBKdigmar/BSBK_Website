export default {
  name: 'jobOpening',
  title: 'Job Opening',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'text',
      rows: 5
    },
    {
      name: 'criteria',
      title: 'Criteria',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'howToApply',
      title: 'How To Apply',
      type: 'text',
      rows: 3
    },
    {
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'datetime'
    }   
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    }
  }
}
