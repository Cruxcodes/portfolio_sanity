import {defineArrayMember, defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons/Case'

export const role = defineType({
  name: 'role',
  title: 'Role',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'company',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      description: 'e.g. "Frontend Engineer · contract"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blurb',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stack',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'startYear',
      type: 'number',
      validation: (rule) => rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: 'endYear',
      description: 'Leave empty if this is your current role',
      type: 'number',
      validation: (rule) =>
        rule
          .integer()
          .min(2000)
          .max(2100)
          .custom((endYear, context) => {
            const startYear = (context.document as {startYear?: number} | undefined)?.startYear
            if (endYear && startYear && endYear < startYear) {
              return 'End year must be the same as or after the start year'
            }
            return true
          }),
    }),
    defineField({
      name: 'location',
      description: 'e.g. "Remote" or "Lagos, Nigeria"',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Most recent',
      name: 'startYearDesc',
      by: [
        {field: 'startYear', direction: 'desc'},
        {field: 'endYear', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {company: 'company', title: 'title', startYear: 'startYear', endYear: 'endYear'},
    prepare: ({company, title, startYear, endYear}) => ({
      title: company,
      subtitle: [title, `${startYear} – ${endYear ?? 'Present'}`].filter(Boolean).join(' · '),
    }),
  },
})
