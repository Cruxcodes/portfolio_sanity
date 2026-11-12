import {defineArrayMember, defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons/Projects'

const paragraphsField = (name: string) =>
  defineField({
    name,
    type: 'array',
    group: 'caseStudy',
    of: [defineArrayMember({type: 'text', rows: 4})],
  })

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'caseStudy', title: 'Case study'},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'overview',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'overview',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          {title: 'Client', value: 'client'},
          {title: 'Hackathon', value: 'hackathon'},
          {title: 'Solo', value: 'solo'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      group: 'overview',
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'App', value: 'app'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      description: 'Featured projects get a large card; the rest are listed under "More projects".',
      type: 'boolean',
      group: 'overview',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      description: 'Lower numbers are shown first',
      type: 'number',
      group: 'overview',
      validation: (rule) => rule.integer(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      group: 'overview',
      validation: (rule) => rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: 'role',
      description: 'e.g. "Frontend engineer · Client project"',
      type: 'string',
      group: 'overview',
    }),
    defineField({
      name: 'blurb',
      description: 'One sentence shown on project cards',
      type: 'text',
      rows: 2,
      group: 'overview',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'skills',
      description: 'Languages, frameworks and tools used on this project',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({type: 'reference', to: [{type: 'skill'}]})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'stack',
      title: 'Stack (old)',
      description:
        'Old free-text tags, kept until every project uses Skills. The site shows Skills when they are set.',
      type: 'array',
      group: 'overview',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      hidden: ({value}) => !value?.length,
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      group: 'overview',
    }),
    defineField({
      name: 'repoUrl',
      title: 'Repository URL',
      type: 'url',
      group: 'overview',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      group: 'caseStudy',
    }),
    paragraphsField('context'),
    paragraphsField('approach'),
    paragraphsField('outcome'),
    defineField({
      name: 'heroImage',
      type: 'projectImage',
      group: 'media',
    }),
    defineField({
      name: 'images',
      title: 'Gallery',
      description: 'Shown in a "Gallery" section on the case study page',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({type: 'projectImage'})],
    }),
    defineField({
      name: 'accentDot',
      description:
        'Position of the accent dot on the letterform, from 0 to 1. Leave empty to derive one from the slug.',
      type: 'object',
      group: 'media',
      options: {columns: 2},
      fields: [
        defineField({name: 'x', type: 'number', validation: (rule) => rule.min(0).max(1)}),
        defineField({name: 'y', type: 'number', validation: (rule) => rule.min(0).max(1)}),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', role: 'role', year: 'year', featured: 'featured', media: 'heroImage'},
    prepare: ({title, role, year, featured, media}) => ({
      title: featured ? `★ ${title}` : title,
      subtitle: [year, role].filter(Boolean).join(' · '),
      media,
    }),
  },
})
