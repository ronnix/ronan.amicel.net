import { defineCollection, z } from 'astro:content'

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    path: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
})

const recettes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    path: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
})

export const collections = { articles, recettes }
