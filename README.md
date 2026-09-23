# OnPoint Health Media & Tech — corporate site

Static marketing site for onpointhealthmedia.com. Built with [Astro](https://astro.build) + Tailwind CSS. Output is plain HTML/CSS/JS, so it hosts anywhere (the current S3 + CloudFront setup works as-is).

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes the static site to dist/
npm run preview    # serves dist/ locally
```

Requires Node 20+.

## Deploy to production (S3 + CloudFront)

1. `npm run build` with **no** `SITE_BASE` set (base = `/`).
2. Upload the contents of `dist/` to the S3 bucket that serves www.onpointhealthmedia.com, replacing the old files.
3. Invalidate the CloudFront distribution (`/*`).

**Clean URLs.** Pages are built as folders (`/about/index.html`, `/blog/<slug>/index.html`). The S3 *website endpoint* resolves these automatically. If CloudFront points at the S3 *REST* endpoint instead, add a small CloudFront Function on viewer-request that appends `index.html` to paths ending in `/` or with no file extension:

```js
function handler(event) {
  var req = event.request;
  var uri = req.uri;
  if (uri.endsWith('/')) req.uri += 'index.html';
  else if (!uri.includes('.')) req.uri += '/index.html';
  return req;
}
```

Set the 404 page to `/404.html` in the distribution's custom error responses.

## Preview (GitHub Pages)

Pushing to `main` builds and deploys to `https://davidlaniado.github.io/onpoint-site/` via `.github/workflows/pages.yml`. That build sets `SITE_BASE=/onpoint-site` so links work at the sub-path. Production must NOT set it.

## Editing content

- **Blog posts:** add a Markdown file to `src/content/blog/`. Frontmatter fields: `title`, `description`, `pubDate`, `audience` (brands | partners | both), `tags`, optional `faq` list (rendered on-page and as FAQ schema for AEO). Set `draft: true` to hide.
- **Job listings:** add a Markdown file to `src/content/jobs/`. Set `open: false` to remove a role without deleting it.
- **Site-wide text, emails, address, nav:** `src/lib/site.ts`.
- **Home page copy + FAQ:** `src/pages/index.astro`. Brands / partners / about / careers / contact are their own files under `src/pages/`.
- **Colors and fonts:** `src/styles/global.css` (`@theme` block).

## Contact form

The form posts to FormSubmit (`https://formsubmit.co/ajax/<email>`), which relays to the address in `src/lib/site.ts` (`SITE.email`). The **first** submission triggers a one-time activation email to that inbox; click the link once and every later submission is delivered. To use a different form backend, change `action` in `src/components/ContactForm.astro`.

## SEO / AEO baked in

- Per-page titles, descriptions, canonical URLs, Open Graph + Twitter cards
- `sitemap-index.xml`, `robots.txt`, RSS feed at `/rss.xml`
- JSON-LD: Organization on every page, FAQPage on home/brands/partners and any post with `faq`, Article on posts, JobPosting on roles
