import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;
const desktop = window.matchMedia('(min-width: 1024px)').matches;

/* ---------- smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  // syncTouch stays false (Lenis default): native touch scrolling is untouched on phones.
  lenis = new Lenis({ lerp: 0.11, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
// anchor links: honour scroll-margin-top and the sticky nav, with or without Lenis
const navH = () => (document.querySelector<HTMLElement>('header[data-nav]')?.offsetHeight ?? 68);
function scrollToHash(hash: string, instant = false) {
  if (!hash || hash.length < 2) return false;
  let el: Element | null = null;
  try { el = document.querySelector(hash); } catch { return false; }
  if (!el) return false;
  const smt = parseFloat(getComputedStyle(el).scrollMarginTop || '0') || 0;
  // Lenis subtracts scroll-margin-top itself; only add the nav offset when the target has none.
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: smt ? 0 : -(navH() + 12), immediate: instant });
  else (el as HTMLElement).scrollIntoView({ behavior: instant || reduce ? 'auto' : 'smooth', block: 'start' });
  return true;
}
document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || url.origin !== location.origin) return;
    if (scrollToHash(url.hash)) { e.preventDefault(); history.pushState(null, '', url.hash); }
  });
});
if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash, true));

/* ---------- scroll progress + nav hide ---------- */
const bar = document.getElementById('scroll-progress');
const header = document.querySelector<HTMLElement>('header[data-nav]');
let lastY = 0;
ScrollTrigger.create({
  start: 0, end: 'max',
  onUpdate: (self) => {
    if (bar) bar.style.transform = `scaleX(${self.progress})`;
    const y = self.scroll();
    if (header) {
      header.classList.toggle('nav-hidden', y > 140 && y > lastY + 4);
      header.classList.toggle('nav-scrolled', y > 24);
    }
    lastY = y;
  },
});

/* ---------- nav adapts over dark bands ---------- */
const darkBands = document.querySelectorAll<HTMLElement>('.band-dark');
let darkCount = 0;
darkBands.forEach((band) => {
  ScrollTrigger.create({
    trigger: band, start: 'top 68px', end: 'bottom 68px',
    onToggle: (self) => {
      darkCount = Math.max(0, darkCount + (self.isActive ? 1 : -1));
      header?.classList.toggle('nav-dark', darkCount > 0);
    },
  });
});

/* ---------- split headings ---------- */
function splitWords(el: Element) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const n of nodes) {
    if (!n.textContent?.trim()) continue;
    const frag = document.createDocumentFragment();
    const parts = n.textContent.split(/(\s+)/);
    for (const p of parts) {
      if (!p) continue;
      if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); continue; }
      const outer = document.createElement('span'); outer.className = 'w';
      const inner = document.createElement('span'); inner.textContent = p;
      outer.appendChild(inner); frag.appendChild(outer);
    }
    n.replaceWith(frag);
  }
}
document.querySelectorAll('[data-split]').forEach(splitWords);

/* ---------- reveals ---------- */
if (reduce) {
  gsap.set('.reveal, [data-split] .w > span, [data-hero]', { clearProps: 'all', opacity: 1, y: 0 });
} else {
  // hero load-in
  const heroWords = document.querySelectorAll('[data-hero-title] .w > span');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (heroWords.length) tl.to(heroWords, { y: 0, opacity: 1, duration: 0.9, stagger: 0.05 }, 0.05);
  tl.to('[data-hero]', { y: 0, opacity: 1, duration: 0.8, stagger: 0.09 }, 0.35);

  // split headings on scroll
  document.querySelectorAll('[data-split]:not([data-hero-title])').forEach((h) => {
    gsap.to(h.querySelectorAll('.w > span'), {
      y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 85%', once: true },
    });
  });

  ScrollTrigger.batch('.reveal', {
    start: 'top 88%', once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out', overwrite: true }),
  });

  /* ---------- parallax ---------- */
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amt = parseFloat(el.dataset.parallax || '0.15') * 100;
    gsap.fromTo(el, { yPercent: -amt / 2 }, { yPercent: amt / 2, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/* ---------- counters ---------- */
document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const target = parseFloat(el.dataset.count!);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const dec = (el.dataset.decimals && parseInt(el.dataset.decimals)) || 0;
  const obj = { v: 0 };
  const render = () => { el.textContent = prefix + obj.v.toFixed(dec) + suffix; };
  if (reduce) { obj.v = target; render(); return; }
  render();
  gsap.to(obj, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: render, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
});

/* ---------- pinned steps (how it works) ---------- */
document.querySelectorAll<HTMLElement>('[data-steps]').forEach((wrap) => {
  const steps = wrap.querySelectorAll<HTMLElement>('[data-step]');
  const num = wrap.querySelector<HTMLElement>('[data-step-num]');
  const fill = wrap.querySelector<HTMLElement>('[data-step-fill]');
  const title = wrap.querySelector<HTMLElement>('[data-step-title]');
  steps.forEach((s, i) => {
    ScrollTrigger.create({
      trigger: s, start: 'top 60%', end: 'bottom 60%',
      onToggle: (self) => {
        if (!self.isActive) return;
        steps.forEach((x) => x.classList.toggle('active', x === s));
        if (num) num.textContent = String(i + 1).padStart(2, '0');
        if (fill) fill.style.transform = `scaleY(${(i + 1) / steps.length})`;
        if (title) title.textContent = s.dataset.step || '';
      },
    });
  });
});

/* ---------- pointer effects (desktop only) ---------- */
if (fine && !reduce) {
  // cursor glow
  const glow = document.getElementById('cursor-glow');
  if (glow) {
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }, cur = { ...pos };
    addEventListener('pointermove', (e) => { pos.x = e.clientX; pos.y = e.clientY; glow.style.opacity = '1'; });
    addEventListener('pointerleave', () => { glow.style.opacity = '0'; });
    gsap.ticker.add(() => {
      cur.x += (pos.x - cur.x) * 0.12; cur.y += (pos.y - cur.y) * 0.12;
      glow.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) translate(-50%, -50%)`;
    });
  }
  // magnetic buttons
  document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
    const strength = 0.35;
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      gsap.to(b, { x, y, duration: 0.4, ease: 'power3.out' });
    });
    b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }));
  });
  // tilt cards
  document.querySelectorAll<HTMLElement>('.card-hover').forEach((c) => {
    c.addEventListener('pointermove', (e) => {
      const r = c.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(c, { rotateY: px * 6, rotateX: -py * 6, transformPerspective: 900, duration: 0.4, ease: 'power2.out' });
      c.style.setProperty('--mx', `${(px + 0.5) * 100}%`); c.style.setProperty('--my', `${(py + 0.5) * 100}%`);
    });
    c.addEventListener('pointerleave', () => gsap.to(c, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power3.out' }));
  });
}

/* ---------- typing ticker lines ---------- */
document.querySelectorAll<HTMLElement>('[data-type-lines]').forEach((el) => {
  const lines = JSON.parse(el.dataset.typeLines || '[]') as string[];
  if (!lines.length) return;
  if (reduce) { el.textContent = lines[0]; return; }
  let i = 0;
  const type = () => {
    const line = lines[i % lines.length]; i++;
    let k = 0; el.textContent = '';
    const iv = setInterval(() => {
      el.textContent = line.slice(0, ++k) + (k < line.length ? '▍' : '');
      if (k >= line.length) { clearInterval(iv); setTimeout(type, 2200); }
    }, 22);
  };
  type();
});

/* ---------- refresh when layout settles ---------- */
const refresh = () => ScrollTrigger.refresh();
addEventListener('load', refresh);
(document as any).fonts?.ready?.then(refresh).catch(() => {});
document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((img) => { if (!img.complete) img.addEventListener('load', refresh, { once: true }); });
addEventListener('hero3d:ready', refresh);
setTimeout(refresh, 1500);
// bfcache: page restored with stale scroll state
addEventListener('pageshow', (e) => { if ((e as PageTransitionEvent).persisted) { lenis?.resize(); refresh(); } });
