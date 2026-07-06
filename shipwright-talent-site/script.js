/* ==========================================================================
   SHIPWRIGHT TALENT — SITE SCRIPT
   No build step, no dependencies. Reads window.SITE from config.js and
   renders it into the page, then wires up navigation, reveals, the
   pipeline steps, the FAQ accordion, the cookie banner and the contact
   form. Shared by every page.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initHeader();
  initNav();
  initReveals();
  initPipelines();
  initFaq();
  initCookieBanner();
  initContactForm();
  initYear();
});

/* -------------------------------------------------------------------------
   Config rendering
   ------------------------------------------------------------------------- */
function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function applyConfig() {
  const cfg = window.SITE;
  if (!cfg) return;

  // Simple text/attribute bindings: data-cfg="path.to.value"
  document.querySelectorAll('[data-cfg]').forEach((el) => {
    const value = getPath(cfg, el.getAttribute('data-cfg'));
    if (value === undefined || value === null) return;
    el.textContent = value;
  });

  // Show/hide based on a boolean or string-equality path:
  // data-cfg-show="registration.status" data-cfg-equals="registered"
  document.querySelectorAll('[data-cfg-show]').forEach((el) => {
    const path = el.getAttribute('data-cfg-show');
    const equals = el.getAttribute('data-cfg-equals');
    const value = getPath(cfg, path);
    const visible = equals !== null ? value === equals : Boolean(value);
    el.hidden = !visible;
  });
  document.querySelectorAll('[data-cfg-hide]').forEach((el) => {
    const path = el.getAttribute('data-cfg-hide');
    const equals = el.getAttribute('data-cfg-equals');
    const value = getPath(cfg, path);
    const hide = equals !== null ? value === equals : Boolean(value);
    el.hidden = hide;
  });

  // mailto links: data-cfg-mailto (builds mailto:email)
  document.querySelectorAll('[data-cfg-mailto]').forEach((el) => {
    el.href = `mailto:${cfg.contact.email}`;
  });

  renderRegistration(cfg);
  renderSocials(cfg);
  renderStats(cfg);
  renderCommission(cfg);
}

function renderRegistration(cfg) {
  const status = cfg.registration.status; // hobby | pending | registered
  document.querySelectorAll('[data-registration-block]').forEach((block) => {
    const lines = block.querySelectorAll('[data-reg-line]');
    lines.forEach((line) => {
      line.hidden = line.getAttribute('data-reg-line') !== status;
    });
    lines.forEach((line) => {
      if (line.getAttribute('data-reg-line') === status) {
        const kvkEl = line.querySelector('[data-reg-kvk]');
        const vatEl = line.querySelector('[data-reg-vat]');
        if (kvkEl && cfg.registration.kvkNumber) kvkEl.textContent = `KVK: ${cfg.registration.kvkNumber}`;
        if (vatEl && cfg.registration.vatNumber) vatEl.textContent = `VAT: ${cfg.registration.vatNumber}`;
      }
    });
  });
}

function renderSocials(cfg) {
  // Only touches the dedicated [data-socials] list (social platform links).
  // The email link sits in its own static <li> next to it and is left alone.
  document.querySelectorAll('[data-socials]').forEach((list) => {
    const items = cfg.contact.social.filter((s) => s.show && s.url);
    list.innerHTML = '';
    items.forEach((s) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = s.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = s.name;
      li.appendChild(a);
      list.appendChild(li);
    });
  });
}

function renderStats(cfg) {
  document.querySelectorAll('[data-stats]').forEach((container) => {
    const key = container.getAttribute('data-stats');
    const stats = cfg.stats[key];
    if (!stats) return;
    container.innerHTML = '';
    stats.forEach((stat, i) => {
      const div = document.createElement('div');
      div.className = 'stat reveal';
      div.style.setProperty('--i', i);
      div.innerHTML = `<b>${stat.value}</b><span>${stat.label}${cfg.stats.showSources ? `<sup>${i + 1}</sup>` : ''}</span>`;
      container.appendChild(div);
    });
    const noteEl = container.closest('section')?.querySelector('[data-stats-sources]');
    if (noteEl) {
      if (cfg.stats.showSources) {
        const refs = stats.map((s, i) => `${i + 1}. ${s.source}`).join(' ');
        noteEl.textContent = `${refs} ${cfg.stats.footnotePrefix}`;
        noteEl.hidden = false;
      } else {
        noteEl.hidden = true;
      }
    }
  });
}

function renderCommission(cfg) {
  const body = document.querySelector('[data-commission-table]');
  if (body) {
    body.innerHTML = '';
    cfg.commission.tiers.forEach((tier) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${tier.label}</td><td class="rate">${tier.rate}</td><td>${tier.note}</td>`;
      body.appendChild(tr);
    });
  }
  document.querySelectorAll('[data-cfg="commission.standardRate"]').forEach((el) => {
    el.textContent = cfg.commission.standardRate;
  });
}

/* -------------------------------------------------------------------------
   Header: adds a border and blur once the page has scrolled.
   ------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
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
   Runs after renderStats() so dynamically created .reveal stats are
   caught too (re-queried on a short delay).
   ------------------------------------------------------------------------- */
function initReveals() {
  const setup = () => {
    const items = document.querySelectorAll('.reveal:not([data-reveal-bound])');
    if (!items.length) return null;

    document.querySelectorAll('.reveal-group').forEach((group) => {
      Array.from(group.children).forEach((child, i) => child.style.setProperty('--i', i));
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => { el.classList.add('is-visible'); el.setAttribute('data-reveal-bound', ''); });
      return null;
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

    items.forEach((el) => { observer.observe(el); el.setAttribute('data-reveal-bound', ''); });
    return observer;
  };

  setup();
  // catch elements rendered dynamically from config a tick later
  window.setTimeout(setup, 50);
}

/* -------------------------------------------------------------------------
   Pipeline: numbered stage trail used for sequential "how it works" steps.
   Marks each stage visible as it scrolls in and grows the connecting line
   to match progress through the group.
   ------------------------------------------------------------------------- */
function initPipelines() {
  const pipelines = document.querySelectorAll('.pipeline');
  if (!pipelines.length) return;

  pipelines.forEach((pipeline) => {
    const stages = Array.from(pipeline.querySelectorAll('.stage'));
    if (!stages.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              updatePipelineProgress(pipeline, stages);
            }
          });
        },
        { threshold: 0.4 }
      );
      stages.forEach((stage) => observer.observe(stage));
    } else {
      stages.forEach((stage) => stage.classList.add('is-visible'));
      pipeline.style.setProperty('--pipeline-progress', '100%');
    }
  });
}

function updatePipelineProgress(pipeline, stages) {
  const shipped = stages.filter((s) => s.classList.contains('is-visible')).length;
  const pct = Math.round((shipped / stages.length) * 100);
  pipeline.style.setProperty('--pipeline-progress', pct + '%');
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
   Cookie banner. Controlled by config.cookieBanner.show.
   ------------------------------------------------------------------------- */
const COOKIE_KEY = 'swt_cookie_choice';

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  if (window.SITE && window.SITE.cookieBanner && window.SITE.cookieBanner.show === false) {
    banner.remove();
    return;
  }

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

function safeGet(key) {
  try { return window.localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
  try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

/* -------------------------------------------------------------------------
   Contact form.
   Runs entirely client-side: there is no backend yet. It validates the
   fields, then opens the visitor's email client with a pre-filled message
   via a mailto: link. Swap in Formspree, Netlify Forms, Basin or your own
   backend when ready, see the FORM-ENDPOINT comment below.
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
        field.style.borderColor = 'var(--danger)';
      } else {
        field.style.borderColor = '';
      }
    });

    const email = form.querySelector('#email');
    if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
      valid = false;
      email.style.borderColor = 'var(--danger)';
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
    const to = window.SITE?.contact?.email || 'hello@example.com';
    const subject = encodeURIComponent(`${window.SITE?.business?.name || 'Website'} - ${type || 'Inquiry'} from ${name}`);
    const body = encodeURIComponent(`${message}\n\n- ${name} (${email ? email.value : ''})`);

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    showStatus(status, `Opening your email client to send this. If nothing opens, email ${to} directly.`, 'success');
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
