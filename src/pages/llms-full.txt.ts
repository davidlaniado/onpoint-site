import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

const strip = (md: string) => md.replace(/^---[\s\S]*?---\s*/, '').trim();

export async function GET({ site }: APIContext) {
  const base = (site ?? new URL(SITE.url)).toString().replace(/\/$/, '') + (import.meta.env.BASE_URL.replace(/\/$/, ''));
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const programs = (await getCollection('programs')).sort((a, b) => a.data.order - b.data.order);
  const out: string[] = [`# ${SITE.name}: full text`, '', SITE.boilerplate, '', `Source: ${base}/`, ''];
  out.push('## Programs', '');
  for (const p of programs) {
    out.push(`### ${p.data.h1}`, '', `URL: ${base}/programs/${p.id}/`, '', `Quick answer: ${p.data.quickAnswer}`, '', strip(p.body ?? ''), '');
    if (p.data.faq.length) { out.push('FAQ:', ''); for (const f of p.data.faq) out.push(`Q: ${f.q}`, `A: ${f.a}`, ''); }
  }
  out.push('## Articles', '');
  for (const p of posts) {
    out.push(`### ${p.data.title}`, '', `URL: ${base}/blog/${p.id}/`, `Published: ${p.data.pubDate.toISOString().slice(0, 10)}`, '', p.data.quickAnswer ? `Quick answer: ${p.data.quickAnswer}\n` : '', strip(p.body ?? ''), '');
    if (p.data.faq.length) { out.push('FAQ:', ''); for (const f of p.data.faq) out.push(`Q: ${f.q}`, `A: ${f.a}`, ''); }
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
