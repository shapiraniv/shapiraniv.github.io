import { defineCollection, z } from 'astro:content';

const worksCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    title: z.object({
      en: z.string(),
      he: z.string(),
    }),
    year: z.string(),
    tags: z.object({
      en: z.array(z.string()),
      he: z.array(z.string()),
    }).optional(),
    description: z.object({
      en: z.string(),
      he: z.string(),
    }),
    banner: z.string(),
    link: z.string().optional(),
    media: z.array(
      z.object({
        src: z.string(),
        type: z.enum(['image', 'video']),
        embed: z.boolean().optional(),
        aspectRatio: z.string().optional(),
      })
    ),
  }),
});

export const collections = {
  works: worksCollection,
};
