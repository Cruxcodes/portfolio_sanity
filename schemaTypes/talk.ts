import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons/Comment'

export const talk = defineType({
  name: 'talk',
  title: 'Talk',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'event',
      description: 'Meetup or conference name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'date',
      options: {dateFormat: 'D MMMM YYYY'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      description: 'Recording, slides or a post about the talk',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Shown as a small square, so set the hotspot on your face or the stage',
      type: 'projectImage',
    }),
  ],
  orderings: [
    {
      title: 'Date',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', event: 'event', date: 'date', media: 'image'},
    prepare: ({title, event, date, media}) => ({
      title,
      subtitle: [event, date].filter(Boolean).join(' · '),
      media,
    }),
  },
})
