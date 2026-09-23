export const SITE = {
  name: 'OnPoint Health Media & Tech',
  shortName: 'OnPoint',
  legalName: 'OnPoint Health Media and Tech, Inc.',
  tagline: 'Compliant scale for telehealth brands.',
  description:
    'OnPoint connects telehealth brands with verified affiliate partners. Clear tracking, reviewed creative, and payouts you can audit. Built for regulated health categories.',
  url: 'https://www.onpointhealthmedia.com',
  email: 'david@onpointhealthmedia.com',
  careersEmail: 'david@onpointhealthmedia.com',
  legalEmail: 'accounts@onpointhealthmedia.com',
  privacyEmail: 'privacy@onpointhealthmedia.com',
  address: {
    street: '291 Franklin Ave, Suite 7',
    city: 'Wyckoff',
    region: 'NJ',
    postal: '07481',
    country: 'US',
  },
  linkedin: 'https://www.linkedin.com/company/onpoint-health-media',
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
