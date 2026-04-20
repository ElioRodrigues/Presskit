document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(
    document.querySelectorAll('.sidebar-nav a[href^="#"]')
  );

  const sections = navLinks
    .map((link) => {
      const targetId = link.getAttribute('href');
      return targetId ? document.querySelector(targetId) : null;
    })
    .filter(Boolean);

  if (!navLinks.length || !sections.length) {
    return;
  }

  const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        setActiveLink(visibleEntry.target.id);
      }
    },
    {
      root: null,
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0.15, 0.35, 0.55],
    }
  );

  sections.forEach((section) => observer.observe(section));
  setActiveLink(sections[0].id);
});