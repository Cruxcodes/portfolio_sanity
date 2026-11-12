import {defineField, defineType} from 'sanity'
import {CodeIcon} from '@sanity/icons/Code'

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  icon: CodeIcon,
  fields: [
    defineField({
      name: 'name',
      description: 'e.g. "React", "Node.js" or "React Native"',
      type: 'string',
      validation: (rule) =>
        rule.required().custom(async (name, context) => {
          if (!name) return true
          const id = context.document?._id.replace(/^drafts\./, '')
          const duplicates = await context
            .getClient({apiVersion: '2026-10-22'})
            .fetch<number>(
              'count(*[_type == "skill" && lower(name) == lower($name) && !(_id in [$id, "drafts." + $id])])',
              {name, id},
            )
          return duplicates === 0 || 'A skill with this name already exists'
        }),
    }),
  ],
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name'},
  },
})
