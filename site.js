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
