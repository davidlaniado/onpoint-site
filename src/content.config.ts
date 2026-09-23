import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('OnPoint Team'),
    audience: z.enum(['brands', 'partners', 'both']).default('both'),
    tags: z.array(z.string()).default([]),
    faq: z
      .array(z.object({ q: z.string(), a: z.string() }))
      .default([]),
    draft: z.boolean().default(false),
  }),
});

const jobs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/jobs' }),
  schema: z.object({
    title: z.string(),
    department: z.string(),
    location: z.string(),
    type: z.string().default('Full-time'),
    compensation: z.string().optional(),
    summary: z.string(),
    jobId: z.string().optional(),
    datePosted: z.coerce.date(),
    open: z.boolean().default(true),
    order: z.number().default(99),
  }),
});

export const collections = { blog, jobs };
