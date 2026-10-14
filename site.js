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
  const update = () => {
    const picked = buttons.filter((b) => b.getAttribute('aria-pressed') === 'true').map((b) => b.textContent);
    let subject = cfg.def;
    if (picked.length) subject = cfg.pre + (picked.length > 1 ? picked.slice(0, -1).join(', ') + cfg.and + picked.at(-1) : picked[0]);
    const href = `mailto:${cfg.to}?subject=${encodeURIComponent(subject)}`;
    document.querySelectorAll(`a[href^="mailto:${cfg.to}"]`).forEach((a) => { a.href = href; });
  };
  buttons.forEach((b) => b.addEventListener('click', () => {
    b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
    update();
  }));
  group.hidden = false;
})();
