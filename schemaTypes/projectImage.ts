import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

export const projectImage = defineType({
  name: 'projectImage',
  title: 'Project image',
  type: 'image',
  icon: ImageIcon,
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      validation: (rule) => rule.required().warning('Alt text is important for accessibility'),
    }),
    defineField({
      name: 'caption',
      type: 'string',
    }),
  ],
})
