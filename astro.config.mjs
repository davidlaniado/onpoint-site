// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// SITE_BASE lets the same build run at a sub-path (GitHub Pages preview).
// Production on onpointhealthmedia.com: leave SITE_BASE unset (base = "/").
const base = process.env.SITE_BASE || '/';
const site = process.env.SITE_URL || 'https://www.onpointhealthmedia.com';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap(), mdx()],
  vite: { plugins: [tailwindcss()] },
});
