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
    cover: z.string().optional(),
    quickAnswer: z.string().optional(),
    related: z.array(z.string()).default([]),
  }),
});

const programs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/programs' }),
  schema: z.object({
    title: z.string(),
    h1: z.string(),
    description: z.string(),
    quickAnswer: z.string(),
    audience: z.enum(['brands', 'partners', 'both']).default('both'),
    group: z.enum(['vertical', 'channel', 'brand']),
    cover: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]),
    order: z.number().default(99),
    updated: z.coerce.date(),
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

export const collections = { blog, jobs, programs };
