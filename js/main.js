const siteHeader = document.querySelector('.site-header');
const revealItems = Array.from(document.querySelectorAll('.reveal'));
const faqItems = Array.from(document.querySelectorAll('.faq-item'));

if (siteHeader) {
  const syncHeaderState = () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 24);
  };

  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });
}

if (revealItems.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealItems.forEach((item, index) => {
    const staggerGroup = item.closest('.values-grid, .team-grid, .faq-container');
    const groupItems = staggerGroup ? Array.from(staggerGroup.querySelectorAll('.reveal')) : [];
    const groupIndex = groupItems.indexOf(item);
    const delay = groupIndex >= 0 ? groupIndex * 70 : Math.min((index % 4) * 60, 180);

    item.style.setProperty('--reveal-delay', `${delay}ms`);
    revealObserver.observe(item);
  });
}

faqItems.forEach((item) => {
  const summary = item.querySelector('summary');
  const content = item.querySelector('.faq-content');

  if (!summary || !content) {
    return;
  }

  summary.addEventListener('click', (event) => {
    event.preventDefault();

    if (item.hasAttribute('open')) {
      content.style.maxHeight = `${content.scrollHeight}px`;

      window.requestAnimationFrame(() => {
        content.style.maxHeight = '0px';
      });

      window.setTimeout(() => {
        item.removeAttribute('open');
        content.style.maxHeight = '';
      }, 220);

      return;
    }

    item.setAttribute('open', '');
    content.style.maxHeight = '0px';

    window.requestAnimationFrame(() => {
      content.style.maxHeight = `${content.scrollHeight}px`;
    });

    window.setTimeout(() => {
      content.style.maxHeight = '';
    }, 220);
  });
});
