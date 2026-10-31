// Section entrances: reveal once as each block enters. Content is never left hidden.
(() => {
  const targets = document.querySelectorAll('[data-reveal]');
  const show = (el) => el.classList.add('is-in');
  if (!('IntersectionObserver' in window)) { targets.forEach(show); return; }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      show(entry.target);
      io.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  targets.forEach((el) => io.observe(el));
  window.addEventListener('load', () => setTimeout(() => {
    targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) show(el); });
  }, 2500));
})();

// Contact: pick what it is about and the email opens with that subject filled in.
(() => {
  const link = document.querySelector('.email[data-mail]');
  const group = document.querySelector('.topics');
  if (!link || !group) return;
  const cfg = JSON.parse(link.dataset.mail);
  const buttons = [...group.querySelectorAll('.topic')];
  const shown = document.querySelector('.subject');
  const update = () => {
    const picked = buttons.filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.textContent);
    let subject = cfg.def;
    if (picked.length) subject = cfg.pre + (picked.length > 1 ? picked.slice(0, -1).join(', ') + cfg.and + picked.at(-1) : picked[0]);
    const href = `mailto:${cfg.to}?subject=${encodeURIComponent(subject)}`;
    document.querySelectorAll(`a[href^="mailto:${cfg.to}"]`).forEach((a) => { a.href = href; });
    if (shown) shown.lastElementChild.textContent = subject;
  };
  buttons.forEach((b) => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    // A solo topic (General question) never combines with the others
    if (on) buttons.forEach((o) => { if (o !== b && ('solo' in o.dataset || 'solo' in b.dataset)) o.setAttribute('aria-pressed', 'false'); });
    b.setAttribute('aria-pressed', String(on));
    update();
  }));
  update();
  group.hidden = false;
  if (shown) shown.hidden = false;
  document.querySelectorAll('.topic-hint').forEach((el) => { el.hidden = false; });
})();

// Language switch: land on the section you were reading, not the top of the other page.
(() => {
  const sections = ['services', 'work', 'about', 'contact'].map((id) => document.getElementById(id)).filter(Boolean);
  document.querySelectorAll('a[hreflang]').forEach((a) => a.addEventListener('click', () => {
    const here = sections.filter((s) => s.getBoundingClientRect().top <= innerHeight / 2).at(-1);
    a.href = a.href.split('#')[0] + (here ? `#${here.id}` : '');
  }));
})();

// Contact: copy the address, for visitors whose browser has no mail app behind mailto.
(() => {
  const btn = document.querySelector('.copy');
  if (!btn || !navigator.clipboard) return;
  const label = btn.textContent;
  const status = btn.nextElementSibling;
  let timer;
  btn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(btn.dataset.address); } catch { return; }
    btn.textContent = status.textContent = btn.dataset.copied;
    clearTimeout(timer);
    timer = setTimeout(() => { btn.textContent = label; status.textContent = ''; }, 2000);
  });
  btn.parentElement.hidden = false;
  btn.style.minWidth = `${btn.offsetWidth}px`; // the shorter "Copied" must not shrink the button
})();

// Motion, all of it skipped under prefers-reduced-motion and never needed to read the page.
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Section bar: once the hero has scrolled away, a slim bar with the same links slides in and
// a coral line follows the section you are reading. Desktop only (phones hide these links).
(() => {
  const nav = document.querySelector('.site-nav');
  const hero = document.querySelector('.hero');
  if (!nav || !hero || !('IntersectionObserver' in window)) return;
  const items = [...nav.querySelectorAll('li')].filter((li) => li.classList.contains('optional') || li.querySelector('.button'));
  const bar = document.createElement('div');
  bar.className = 'topbar';
  bar.inert = true;
  const list = document.createElement('ul');
  const ink = document.createElement('span');
  ink.className = 'topbar-ink';
  ink.setAttribute('aria-hidden', 'true');
  const links = new Map();
  items.forEach((li) => {
    const copy = li.cloneNode(true);
    copy.classList.remove('optional');
    list.append(copy);
    const a = copy.querySelector('a');
    if (a.hash) links.set(a.hash.slice(1), a);
  });
  list.append(ink);
  bar.append(list);
  document.body.append(bar);

  const place = (a) => {
    if (!a) { ink.style.opacity = 0; return; }
    ink.style.opacity = 1;
    ink.style.width = `${a.offsetWidth}px`;
    ink.style.transform = `translateX(${a.offsetLeft}px)`;
  };
  let current = null;
  const setCurrent = (id) => {
    current = links.get(id) || null;
    links.forEach((a) => { if (a === current) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
    place(current);
  };
  // The section crossing the middle of the viewport is the one being read
  const seen = new Map();
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
    const live = [...links.keys()].filter((id) => seen.get(id));
    setCurrent(live.at(-1) || null);
  }, { rootMargin: '-45% 0px -54% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  new IntersectionObserver(([e]) => {
    const on = !e.isIntersecting && e.boundingClientRect.bottom < 0;
    bar.classList.toggle('is-on', on);
    bar.inert = !on;
    if (on) place(current);
  }).observe(hero);
  addEventListener('resize', () => place(current));
})();

// Figures in Selected work count up once to the value already in the HTML.
(() => {
  if (calm || !('IntersectionObserver' in window)) return;
  const format = (n, sep) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  const jobs = new Map();
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      io.unobserve(entry.target);
      const { num, to, sep, tail } = jobs.get(entry.target);
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / 900, 1);
        num.textContent = format(Math.round(to * (1 - Math.pow(1 - p, 3))), sep) + tail;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, { threshold: 0.6 });
  document.querySelectorAll('.facts .figure').forEach((el) => {
    const m = el.textContent.match(/^(\d[\d\s\u00a0,.]*\d)(.*)$/);
    if (!m) return;
    const sep = (m[1].match(/[\s\u00a0,.]/) || [''])[0];
    // Screen readers get the final number once; the counting digits are decoration
    const real = document.createElement('span');
    real.className = 'sr-only';
    real.textContent = el.textContent;
    const num = document.createElement('span');
    num.setAttribute('aria-hidden', 'true');
    el.textContent = '';
    el.append(real, num);
    num.textContent = format(0, sep) + m[2];
    jobs.set(el, { num, to: parseInt(m[1].replace(/\D/g, ''), 10), sep, tail: m[2] });
    io.observe(el);
  });
})();

// Aurora drifts up and thins out as the hero scrolls away, so the page reads as one surface.
(() => {
  if (calm) return;
  const hero = document.querySelector('.hero');
  if (!hero) return;
  let queued = false;
  const update = () => {
    queued = false;
    const p = Math.min(Math.max(scrollY / hero.offsetHeight, 0), 1);
    hero.style.setProperty('--scroll', p.toFixed(3));
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();
