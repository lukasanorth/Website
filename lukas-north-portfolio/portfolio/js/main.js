/* ─── Scroll Reveal ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el, i) => {
  // Stagger children in the same parent
  el.style.transitionDelay = `${(i % 6) * 60}ms`;
  revealObserver.observe(el);
});

/* ─── Nav: scrolled border + active section highlight ─── */
const nav     = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section[id]');

const onScroll = () => {
  // Scrolled style
  nav.classList.toggle('scrolled', window.scrollY > 20);

  // Active link
  let current = '';
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 100) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

/* ─── Mobile nav toggle ─── */
const burger    = document.getElementById('burger');
const navLinksEl = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinksEl.classList.toggle('open');
});

// Close on link click
navLinksEl.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => navLinksEl.classList.remove('open'));
});
