/* =========================================================================
   SHIPWRIGHT TALENT: SITE CONFIGURATION
   =========================================================================

   This is the only file you should need to edit to keep the site accurate.
   Every value below is picked up automatically by script.js when a page
   loads, so changing something here updates every page at once (the
   business name, the footer, the commission table, the legal footers,
   and so on).

   A few things still need a manual find-and-replace across the HTML files
   because they live outside what JavaScript can safely rewrite (see the
   note at the bottom of this file and in README.md):
     - the real domain, wherever "example.com" appears
     - robots.txt and sitemap.xml
     - the Open Graph preview image

   Nothing in this file is legal advice. Where a field affects a legal
   page (privacy.html, terms.html) or a disclosure (KVK/VAT, cookies),
   confirm the correct answer for your own situation before publishing.
   ========================================================================= */

window.SITE_CONFIG = {

  /* ------------------------------------------------------------------ *
   * BUSINESS IDENTITY                                                   *
   * ------------------------------------------------------------------ */
  business: {
    // The full trade name, used everywhere in running text.
    name: "Shipwright Talent",

    // The short form used in tight spaces (the logo mark, mobile nav).
    shortName: "Shipwright",

    // Your real domain once you have one. Also update example.com in
    // robots.txt, sitemap.xml, and the canonical/og:url tags in each
    // page's <head>; those can't be rewritten by JavaScript.
    domain: "https://www.example.com",

    // The inbox that contact.html and every mailto: link should open.
    email: "hello@example.com",

    // Country of establishment, shown in the footer, contact page and
    // legal pages.
    country: "Netherlands",
  },

  /* ------------------------------------------------------------------ *
   * BUSINESS REGISTRATION (KVK / VAT, or your local equivalent)         *
   * ------------------------------------------------------------------ *
   * This site ships written for a Dutch sole proprietorship that hasn't
   * registered with the KVK yet, which is accurate and non-misleading
   * for a hobby project that isn't structural or profit-aimed yet. Flip
   * these to true and fill in the numbers once you register. Do not
   * invent a number in the meantime. If you're outside the Netherlands,
   * relabel kvkLabel/vatLabel to your own country's registration and
   * tax-ID names.
   * ------------------------------------------------------------------ */
  registration: {
    // Set true once you have an actual KVK (or equivalent) number.
    // While false, the site shows "registration: pending" instead of a
    // number, which is honest and requires no legal disclosure yet.
    isRegistered: false,

    kvkLabel: "KVK registration",
    kvkNumber: "",   // e.g. "88123456", only shown if isRegistered is true

    vatLabel: "VAT number",
    vatNumber: "",   // e.g. "NL004567890B01"

    // Legal entity type, shown on the About/legal pages.
    entityType: "sole proprietorship (eenmanszaak)",

    // Governing law / competent court, used in terms.html section 10.
    // Leave the court blank until you know your registered jurisdiction.
    governingLaw: "the Netherlands",
    competentCourt: "the district where the business is registered",

    // Where the site is hosted, shown in privacy.html section 8.
    hostingProvider: "GitHub Pages",
  },

  /* ------------------------------------------------------------------ *
   * LEGAL PAGE DATES                                                    *
   * ------------------------------------------------------------------ *
   * Update these any time you materially change privacy.html or
   * terms.html. Use a plain, unambiguous format (e.g. "6 July 2026").
   * ------------------------------------------------------------------ */
  legalDates: {
    privacyLastUpdated: "6 July 2026",
    termsLastUpdated: "6 July 2026",
  },

  /* ------------------------------------------------------------------ *
   * SOCIAL & CONTACT LINKS                                              *
   * ------------------------------------------------------------------ *
   * Set "show" to false for anything you don't have yet. The footer
   * link simply won't render. Add more platforms by copying a block
   * and giving it a new key, then referencing that key in script.js's
   * renderSocialLinks() if you add one beyond the ones listed here.
   * ------------------------------------------------------------------ */
  social: {
    twitter:   { show: true,  label: "X (Twitter)", url: "https://x.com/" },
    youtube:   { show: true,  label: "YouTube",      url: "https://youtube.com/" },
    instagram: { show: false, label: "Instagram",    url: "" },
    linkedin:  { show: false, label: "LinkedIn",     url: "" },
    tiktok:    { show: false, label: "TikTok",       url: "" },
  },

  /* ------------------------------------------------------------------ *
   * COMMISSION STRUCTURE                                                *
   * ------------------------------------------------------------------ *
   * Drives the rate table on creators.html and the "standard rate"
   * mentions elsewhere. Add, remove, or reorder tiers freely; the
   * table re-renders from this array. Keep tiers in ascending order.
   * ------------------------------------------------------------------ */
  commission: {
    tiers: [
      {
        label: "Under $1,500",
        rate: "25%",
        note: "Smaller deals take similar effort to close, so the rate reflects that.",
      },
      {
        label: "$1,500 – $20,000",
        rate: "20%",
        note: "The standard rate, in line with the 15–25% norm for creator talent representation.",
      },
      {
        label: "Over $20,000",
        rate: "15%",
        note: "Larger deals scale margin without scaling effort proportionally.",
      },
    ],

    // Used in running copy ("a standard X% commission").
    standardRateLabel: "20%",

    // The floor below which you may decline to pursue a deal.
    minimumDealSize: "$1,000",

    // The subscriber range you're targeting for the creator roster.
    creatorRangeLabel: "50,000 and 500,000",
  },

  /* ------------------------------------------------------------------ *
   * MARKET FIGURES & SOURCES                                            *
   * ------------------------------------------------------------------ *
   * Set showSources to false to hide every footnote/citation block
   * sitewide (the numbered superscripts and the small-print source
   * lists under them) without deleting the underlying stat. Useful if
   * you'd rather not cite third-party research yet, or while a figure
   * is unverified. Leave true once you've checked the figures you're
   * quoting are current. See the README note on re-checking these.
   * ------------------------------------------------------------------ */
  marketData: {
    showSources: true,
  },

  /* ------------------------------------------------------------------ *
   * SITE STAGE                                                          *
   * ------------------------------------------------------------------ *
   * Controls the honest "where we are right now" framing on the Home
   * and About pages. Switch to "established" once you have a real,
   * named roster you're comfortable listing. The site never invents
   * numbers, so pair this with your own copy edit at that point.
   * ------------------------------------------------------------------ */
  stage: {
    label: "founding", // "founding" | "established"
  },

  /* ------------------------------------------------------------------ *
   * COOKIES & ANALYTICS                                                 *
   * ------------------------------------------------------------------ *
   * This site ships with no analytics or advertising scripts, so the
   * banner and privacy.html both currently disclose only the one
   * local-storage entry used to remember a visitor's cookie choice.
   * If you add an analytics tool later, set usesAnalytics to true and
   * name it; the banner and privacy.html §2/§7 will reference it, but
   * you'll still need to add the actual tracking script yourself and
   * gate it behind hasConsent() in script.js.
   * ------------------------------------------------------------------ */
  cookies: {
    showBanner: true,
    usesAnalytics: false,
    analyticsToolName: "",
  },

  /* ------------------------------------------------------------------ *
   * FOUNDER BIO (About page)                                            *
   * ------------------------------------------------------------------ */
  founder: {
    name: "",   // e.g. "Alex Rivera"
    bio: "",    // one or two sentences on background and why this niche
  },

};

/* =========================================================================
   Fields you'll still need to find-and-replace manually, because they sit
   outside the reach of client-side JavaScript:
     - example.com  → in robots.txt, sitemap.xml, and the canonical/og:url
       <link>/<meta> tags at the top of every page
     - images/og-image.jpg → once you have a real social preview image
   Everything else on this list is handled automatically by script.js.
   ========================================================================= */
