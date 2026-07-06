/* ==========================================================================
   SHIPWRIGHT TALENT - SITE SCRIPT
   No build step, no dependencies. Shared by every page in /pages and root.
   Reads editable content from config.js (window.SITE_CONFIG) and applies
   it to the DOM, then wires up the usual interactions.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initHeader();
  initNav();
  initReveals();
  initPipelines();
  initTerminal();
  initFaq();
  initCookieBanner();
  initContactForm();
  initYear();
});

/* -------------------------------------------------------------------------
   CONFIG ENGINE
   Everything in this block reads window.SITE_CONFIG (config.js) and
   rewrites the page to match. Pages ship with copy that already matches
   the config defaults, so nothing looks unfinished if this script fails
   to load; this only needs to do work once someone actually edits
   config.js.
   ------------------------------------------------------------------------- */
function applyConfig() {
  const cfg = window.SITE_CONFIG;
  if (!cfg) return;

  renameBusiness(cfg);
  updateEmailMentions(cfg);
  updateDomainMentions(cfg);
  renderRegistration(cfg);
  renderSocialLinks(cfg);
  renderCommission(cfg);
  renderLegalDates(cfg);
  toggleSources(cfg);
  toggleStageCopy(cfg);
  configureCookieBanner(cfg);
  renderFounder(cfg);
}

// Swap every mention of the default trade name for the configured one.
// Walking text nodes (rather than requiring a data-attribute on every
// mention) means a rename takes effect in headings, footers, and body
// copy alike with one edit to config.js.
function renameBusiness(cfg) {
  const name = cfg.business && cfg.business.name;
  const shortName = cfg.business && cfg.business.shortName;
  if (!name && !shortName) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);

  nodes.forEach((textNode) => {
    let value = textNode.nodeValue;
    if (!value.includes('Shipwright')) return;
    if (name) value = value.split('Shipwright Talent').join(name);
    if (shortName) value = value.split('Shipwright').join(shortName);
    textNode.nodeValue = value;
  });

  if (name) {
    document.title = document.title.split('Shipwright Talent').join(name);
  }
}

// Repoint every mailto: link and any displayed email address.
function updateEmailMentions(cfg) {
  const email = cfg.business && cfg.business.email;
  if (!email) return;

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    const oldHref = link.getAttribute('href');
    const oldAddress = oldHref.replace('mailto:', '').split('?')[0];
    link.setAttribute('href', oldHref.replace(oldAddress, email));
    if (link.textContent.trim() === oldAddress) {
      link.textContent = email;
    }
  });

  document.querySelectorAll('[data-email-text]').forEach((el) => {
    el.textContent = email;
  });

  // Keep the mailto fallback in the contact form pointed at the right inbox.
  window.SITE_EMAIL = email;
}

// Country/hosting mentions that are safe to swap as plain text.
function updateDomainMentions(cfg) {
  const country = cfg.business && cfg.business.country;
  document.querySelectorAll('[data-cfg="country"]').forEach((el) => {
    el.textContent = country;
  });
}

// KVK / VAT (or local equivalent) registration lines.
function renderRegistration(cfg) {
  const reg = cfg.registration;
  if (!reg) return;

  document.querySelectorAll('[data-cfg="kvk-label"]').forEach((el) => { el.textContent = reg.kvkLabel; });
  document.querySelectorAll('[data-cfg="vat-label"]').forEach((el) => { el.textContent = reg.vatLabel; });

  document.querySelectorAll('[data-cfg="kvk-status"]').forEach((el) => {
    el.textContent = reg.isRegistered && reg.kvkNumber ? reg.kvkNumber : 'pending';
  });
  document.querySelectorAll('[data-cfg="vat-status"]').forEach((el) => {
    el.textContent = reg.isRegistered && reg.vatNumber ? reg.vatNumber : 'pending';
  });
  document.querySelectorAll('[data-cfg="entity-type"]').forEach((el) => { el.textContent = reg.entityType; });
  document.querySelectorAll('[data-cfg="governing-law"]').forEach((el) => { el.textContent = reg.governingLaw; });
  document.querySelectorAll('[data-cfg="competent-court"]').forEach((el) => { el.textContent = reg.competentCourt; });
  document.querySelectorAll('[data-cfg="hosting-provider"]').forEach((el) => { el.textContent = reg.hostingProvider; });
}

// Footer social links, built from config so a platform with no URL never renders.
function renderSocialLinks(cfg) {
  const containers = document.querySelectorAll('[data-cfg-list="social-links"]');
  if (!containers.length || !cfg.social) return;

  const items = Object.values(cfg.social).filter((entry) => entry && entry.show && entry.url);

  containers.forEach((container) => {
    container.innerHTML = '';
    items.forEach((entry) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = entry.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = entry.label;
      li.appendChild(a);
      container.appendChild(li);
    });
  });
}

// Commission table on creators.html, plus the standalone rate mentions.
function renderCommission(cfg) {
  const commission = cfg.commission;
  if (!commission) return;

  const tbody = document.querySelector('[data-cfg-list="commission-tiers"]');
  if (tbody) {
    tbody.innerHTML = '';
    commission.tiers.forEach((tier) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(tier.label)}</td><td>${escapeHtml(tier.rate)}</td><td>${escapeHtml(tier.note)}</td>`;
      tbody.appendChild(tr);
    });
  }

  document.querySelectorAll('[data-cfg="standard-rate"]').forEach((el) => { el.textContent = commission.standardRateLabel; });
  document.querySelectorAll('[data-cfg="minimum-deal"]').forEach((el) => { el.textContent = commission.minimumDealSize; });
  document.querySelectorAll('[data-cfg="creator-range"]').forEach((el) => { el.textContent = commission.creatorRangeLabel; });
}

function renderLegalDates(cfg) {
  const dates = cfg.legalDates;
  if (!dates) return;
  document.querySelectorAll('[data-cfg="privacy-date"]').forEach((el) => { el.textContent = dates.privacyLastUpdated; });
  document.querySelectorAll('[data-cfg="terms-date"]').forEach((el) => { el.textContent = dates.termsLastUpdated; });
}

// Hide every footnote / source citation block if market-data sourcing is off.
function toggleSources(cfg) {
  const show = !!(cfg.marketData && cfg.marketData.showSources);
  document.querySelectorAll('[data-cfg-if="show-sources"]').forEach((el) => {
    el.style.display = show ? '' : 'none';
  });
}

// "Founding roster" language toggle for Home/About.
function toggleStageCopy(cfg) {
  const founding = !cfg.stage || cfg.stage.label !== 'established';
  document.querySelectorAll('[data-cfg-if="stage-founding"]').forEach((el) => {
    el.style.display = founding ? '' : 'none';
  });
  document.querySelectorAll('[data-cfg-if="stage-established"]').forEach((el) => {
    el.style.display = founding ? 'none' : '';
  });
}

function configureCookieBanner(cfg) {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  const cookies = cfg.cookies || {};

  if (!cookies.showBanner) {
    banner.remove();
    return;
  }

  const copy = banner.querySelector('[data-cfg="cookie-copy"]');
  if (copy) {
    copy.textContent = cookies.usesAnalytics && cookies.analyticsToolName
      ? `We use ${cookies.analyticsToolName} to understand site traffic, and store a small local-storage flag to remember your cookie choice.`
      : 'We store a small local-storage flag to remember your cookie choice. No analytics or advertising cookies run on this site yet.';
  }
}

function renderFounder(cfg) {
  const founder = cfg.founder || {};
  document.querySelectorAll('[data-cfg="founder-bio"]').forEach((el) => {
    if (founder.name || founder.bio) {
      el.textContent = [founder.name, founder.bio].filter(Boolean).join('. ');
    }
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

/* -------------------------------------------------------------------------
   Header: adds a background/blur once the page has scrolled.
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
   Pipeline: the vertical build-log trail used to structure sequential
   sections (see .pipeline / .stage in styles.css). Marks each stage as
   shipped and grows the line to match progress through the group.
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
   Terminal: types out the lines inside [data-terminal-lines] one at a
   time, like a CLI running a status check. Falls back to showing the
   full text instantly if the visitor prefers reduced motion.
   ------------------------------------------------------------------------- */
function initTerminal() {
  const body = document.querySelector('[data-terminal-lines]');
  if (!body) return;

  const lines = Array.from(body.querySelectorAll('[data-line]'));
  if (!lines.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lines.forEach((line) => {
    line.dataset.fullText = line.innerHTML;
    line.innerHTML = '';
    line.style.visibility = 'hidden';
  });

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    lines.forEach((line) => {
      line.innerHTML = line.dataset.fullText;
      line.style.visibility = 'visible';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          typeLines(lines, 0);
        }
      });
    },
    { threshold: 0.3 }
  );
  observer.observe(body);
}

function typeLines(lines, index) {
  if (index >= lines.length) return;
  const line = lines[index];
  const full = line.dataset.fullText;
  const plainLength = full.replace(/<[^>]*>/g, '').length || 1;
  const speed = Math.max(10, Math.min(28, 900 / plainLength));

  line.style.visibility = 'visible';
  const cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';
  line.appendChild(cursor);

  window.setTimeout(() => {
    line.innerHTML = full;
    if (index < lines.length - 1) {
      typeLines(lines, index + 1);
    } else {
      const finalCursor = document.createElement('span');
      finalCursor.className = 'terminal-cursor';
      line.appendChild(finalCursor);
    }
  }, speed * plainLength * 0.35 + 220);
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
   ------------------------------------------------------------------------- */
const COOKIE_KEY = 'swt_cookie_choice';

function initCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  const stored = safeGet(COOKIE_KEY);
  if (!stored) {
    window.setTimeout(() => banner.classList.add('is-visible'), 700);
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
   the fields, then opens the visitor's email client with a pre-filled
   message via a mailto: link, which works with zero setup. Swap in
   Formspree, Netlify Forms, Basin or your own backend when ready - see
   the FORM-ENDPOINT comment below. Validation and status messages keep
   working either way.
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
    const to = window.SITE_EMAIL || (window.SITE_CONFIG && window.SITE_CONFIG.business.email) || 'hello@example.com';
    const subject = encodeURIComponent(`${(window.SITE_CONFIG && window.SITE_CONFIG.business.name) || 'Shipwright Talent'} - ${type || 'Inquiry'} from ${name}`);
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
