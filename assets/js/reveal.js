(() => {
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) return;

  function initReveal() {
    const els = document.querySelectorAll('.reveal:not(.is-visible)');
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -5% 0px'
    });

    els.forEach(el => io.observe(el));
  }

  // Run once on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }

  // In case your include.js injects partials after load:
  // re-run a couple of times (lightweight, not spammy)
  let runs = 0;
  const tick = () => {
    runs += 1;
    initReveal();
    if (runs < 6) setTimeout(tick, 350);
  };
  setTimeout(tick, 350);
})();
