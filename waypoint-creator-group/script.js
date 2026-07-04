/* ==========================================================================
   WAYPOINT CREATOR GROUP — SITE SCRIPT
   No build step, no dependencies. Everything below is scoped so this one
   file can be shared by every page in /pages and the root.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initNav();
  initReveals();
  initRouteLines();
  initFaq();
  initCookieBanner();
  initContactForm();
  initYear();
});

/* -------------------------------------------------------------------------
   Header: adds a border + tightens padding once the page has scrolled.
   ------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* -------------------------------------------------------------------------
   Mobile nav toggle.
   ------------------------------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* -------------------------------------------------------------------------
   Scroll reveals: any element with .reveal fades/slides in once visible.
   Elements inside .reveal-group get a staggered delay via --i.
   ------------------------------------------------------------------------- */
function initReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  document.querySelectorAll('.reveal-group').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--i', i);
    });
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------
   Route line: the vertical waypoint trail used to structure long sections
   (see .route / .waypoint in styles.css). Marks each waypoint as visited
   and grows the brass line to match scroll progress through the group.
   ------------------------------------------------------------------------- */
function initRouteLines() {
  const routes = document.querySelectorAll('.route');
  if (!routes.length) return;

  routes.forEach((route) => {
    const waypoints = Array.from(route.querySelectorAll('.waypoint'));
    if (!waypoints.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              route.classList.add('is-active');
              updateRouteProgress(route, waypoints);
            }
          });
        },
        { threshold: 0.4 }
      );
      waypoints.forEach((wp) => observer.observe(wp));
    } else {
      waypoints.forEach((wp) => wp.classList.add('is-visible'));
      route.style.setProperty('--route-progress', '100%');
      route.classList.add('is-active');
    }
  });
}

function updateRouteProgress(route, waypoints) {
  const visited = waypoints.filter((wp) => wp.classList.contains('is-visible')).length;
  const pct = Math.round((visited / waypoints.length) * 100);
  route.style.setProperty('--route-progress', pct + '%');
}

/* -------------------------------------------------------------------------
   FAQ accordion.
   ------------------------------------------------------------------------- */
function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((other) => {
        other.classList.remove('is-open');
        const otherAnswer = other.querySelector('.faq-a');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
        other.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* -------------------------------------------------------------------------
   Cookie banner.
   COOKIE-CONFIG: this site ships with no analytics or marketing cookies,
   so the banner currently just discloses functional/local-storage use
   (remembering the choice itself). If you add an analytics or ad script
   later, gate it behind `hasConsent()` below and update the banner copy
   in every page's HTML + privacy.html to match what you actually collect.
   ------------------------------------------------------------------------- */
const COOKIE_KEY = 'wcg_cookie_choice';

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const stored = safeGet(COOKIE_KEY);
  if (!stored) {
    window.setTimeout(() => banner.classList.add('is-visible'), 600);
  }

  banner.querySelector('[data-cookie-accept]')?.addEventListener('click', () => {
    safeSet(COOKIE_KEY, 'accepted');
    banner.classList.remove('is-visible');
  });

  banner.querySelector('[data-cookie-decline]')?.addEventListener('click', () => {
    safeSet(COOKIE_KEY, 'declined');
    banner.classList.remove('is-visible');
  });
}

function hasConsent() {
  return safeGet(COOKIE_KEY) === 'accepted';
}

function safeGet(key) {
  try { return window.localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

/* -------------------------------------------------------------------------
   Contact form.
   This runs entirely client-side: there is no backend yet. It validates
   the fields, then either (a) opens the visitor's email client with a
   pre-filled message via a mailto: link, which works with zero setup, or
   (b) posts to a form endpoint if you set one — see the FORM-ENDPOINT
   comment below. Swap in Formspree, Netlify Forms, Basin or your own
   backend when you're ready; the validation and status messages will
   keep working either way.
   ------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = form.querySelector('.form-status');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const requiredFields = form.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'var(--color-danger)';
      } else {
        field.style.borderColor = '';
      }
    });

    const email = form.querySelector('#email');
    if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
      valid = false;
      email.style.borderColor = 'var(--color-danger)';
    }

    if (!valid) {
      showStatus(status, 'Please fill in the highlighted fields.', 'error');
      return;
    }

    // FORM-ENDPOINT: replace the mailto fallback below with a real
    // submission once you have one, e.g.:
    //
    // fetch('https://formspree.io/f/your-id', {
    //   method: 'POST',
    //   headers: { Accept: 'application/json' },
    //   body: new FormData(form),
    // }).then(() => showStatus(status, 'Message sent. We reply within two business days.', 'success'));

    const name = form.querySelector('#name')?.value ?? '';
    const type = form.querySelector('#inquiry-type')?.value ?? '';
    const message = form.querySelector('#message')?.value ?? '';
    const to = 'hello@example.com'; // EDIT ME: your real inbox
    const subject = encodeURIComponent(`Waypoint Creator Group — ${type || 'Inquiry'} from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email ? email.value : ''})`);

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    showStatus(status, 'Opening your email client to send this. If nothing opens, email hello@example.com directly.', 'success');
  });
}

function showStatus(el, message, type) {
  if (!el) return;
  el.textContent = message;
  el.classList.remove('is-success', 'is-error');
  el.classList.add('is-visible', type === 'error' ? 'is-error' : 'is-success');
}

/* -------------------------------------------------------------------------
   Footer year.
   ------------------------------------------------------------------------- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}
