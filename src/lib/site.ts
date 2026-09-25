export const SITE = {
  name: 'OnPoint Health Media & Tech',
  shortName: 'OnPoint',
  legalName: 'OnPoint Health Media and Tech, Inc.',
  tagline: 'Built to take telehealth brands from $1M to $100M.',
  description:
    'OnPoint is a performance network with a compliance arm, not an agency. It connects telehealth brands that already convert with verified media partners, runs server-side tracking and audited payouts between them, and reviews every claim before it runs.',
  url: 'https://www.onpointhealthmedia.com',
  email: 'david@onpointhealthmedia.com',
  careersEmail: 'david@onpointhealthmedia.com',
  legalEmail: 'accounts@onpointhealthmedia.com',
  privacyEmail: 'privacy@onpointhealthmedia.com',
  address: { region: 'NJ', country: 'US' },
  linkedin: 'https://www.linkedin.com/company/onpoint-health-media',
  /** One-paragraph entity definition. Reuse verbatim everywhere (footer, about, llms.txt, press releases) so every crawler reads the same definition. */
  boilerplate:
    'OnPoint Health Media & Tech is a verified performance network for telehealth, wellness, and diagnostics brands. OnPoint connects health brands with identity-verified media partners, runs server-side tracking and payouts through enterprise systems including Everflow and Google Tag Manager, and reviews ads and funnels for advertising standards before launch. Brands keep full ownership of their health claims. Categories include metabolic and weight management, hormone optimization, men’s wellness, dermatology, hair and skin, and at-home diagnostics. OnPoint is a marketing platform, not a medical provider.',
  sameAs: ['https://www.linkedin.com/company/onpoint-health-media'],
  knowsAbout: [
    'Telehealth affiliate marketing', 'GLP-1 patient acquisition', 'Testosterone replacement therapy marketing', 'Erectile dysfunction telehealth offers',
    'Hair loss telehealth marketing', 'Women’s hormone health marketing', 'At-home diagnostics marketing', 'Server-to-server postback tracking',
    'Everflow', 'CPA and revenue share payouts', 'Health advertising compliance', 'Meta advertising for telehealth',
  ],
};

/** Prefix an internal path with the configured base (needed for sub-path previews). */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('#')) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export const NAV = [
  { label: 'For Brands', path: '/brands/' },
  { label: 'For Partners', path: '/partners/' },
  { label: 'About', path: '/about/' },
  { label: 'Blog', path: '/blog/' },
  { label: 'Careers', path: '/careers/' },
];
