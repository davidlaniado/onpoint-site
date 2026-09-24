import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site';

export async function GET({ site }: APIContext) {
  const base = (site ?? new URL(SITE.url)).toString().replace(/\/$/, '') + (import.meta.env.BASE_URL.replace(/\/$/, ''));
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const programs = (await getCollection('programs')).sort((a, b) => a.data.order - b.data.order);
  const jobs = await getCollection('jobs', ({ data }) => data.open);
  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${SITE.tagline} ${SITE.description}`,
    '',
    SITE.boilerplate,
    '',
    '## Who this is for',
    '',
    '- Telehealth, wellness, and diagnostics brands that want patient acquisition through verified media partners with full control of their health claims.',
    '- Media partners (affiliates, media buyers, email and SMS publishers) who want exclusive health offers with clear rules, server-side tracking, and auditable payouts.',
    '- Candidates who want to work on a small, senior, founder-led performance marketing team.',
    '',
    '## Key facts',
    '',
    `- Legal name: ${SITE.legalName}`,
    '- Location: New York metro area, United States',
    `- Contact: ${SITE.email}`,
    '- Access model: gated on both sides. Brands clear business and compliance verification. Partners clear identity, KYC, channel, and traffic source verification.',
    '- Tracking: server-to-server postbacks and platform reporting through Everflow and Google Tag Manager.',
    '- Commercial terms: CPA, revenue share, or hybrid, agreed before launch. Partners are paid on approved performance.',
    '- Claims: the brand owns and approves every health claim. OnPoint reviews for advertising standards and does not create or substantiate medical claims.',
    '- OnPoint does not provide medical services and does not collect, store, or process protected health information.',
    '- Founders are members of the American Telemedicine Association and previously built one of the largest performance marketing companies in the world, driving over $1 billion in revenue for the brands they scaled.',
    '',
    '## Main pages',
    '',
    `- [Home](${base}/): overview of the network for brands and partners.`,
    `- [For Brands](${base}/brands/): what telehealth brands get, the nine-step process, brand FAQ.`,
    `- [For Media Partners](${base}/partners/): offers, rules, tracking, payouts, partner FAQ.`,
    `- [Programs](${base}/programs/): one page per health vertical, traffic channel, and brand-side solution.`,
    `- [About](${base}/about/): who runs OnPoint and how we work.`,
    `- [Careers](${base}/careers/): open roles.`,
    `- [Blog](${base}/blog/): plain-English guides on telehealth affiliate marketing, tracking, compliance, and payouts.`,
    `- [Glossary](${base}/glossary/): definitions of the terms used in telehealth performance marketing.`,
    `- [Contact](${base}/contact/): apply as a brand or partner.`,
    '',
    '## Programs',
    '',
    ...programs.map((p) => `- [${p.data.title}](${base}/programs/${p.id}/): ${p.data.description}`),
    '',
    '## Blog posts',
    '',
    ...posts.map((p) => `- [${p.data.title}](${base}/blog/${p.id}/): ${p.data.description}`),
    '',
    '## Open roles',
    '',
    ...jobs.map((j) => `- [${j.data.title}](${base}/careers/${j.id}/): ${j.data.summary}`),
    '',
    '## Optional',
    '',
    `- [Full text of all pages and articles](${base}/llms-full.txt)`,
    `- [Terms of Use](${base}/terms/)`,
    `- [Privacy Policy](${base}/privacy/)`,
    `- [LinkedIn](${SITE.linkedin})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
