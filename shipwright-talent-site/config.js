/* ==========================================================================
   SITE CONFIG
   ==========================================================================
   This is the one file you should need to edit to make this site your own.
   Every page loads this file (config.js) before script.js and pulls its
   business name, legal toggles, dates, socials, commission numbers and
   headline copy from the object below.

   HOW TO EDIT
   - Text fields: replace the string between quotes. Keep the quotes.
   - true / false fields: only change the word true or false, nothing else.
   - Lists (things in [ ] with { } items): copy an existing item, edit it,
     keep the commas between items.
   - Don't remove a comma after the last item you keep, but do remove the
     comma after whichever item is now actually last.
   - Save the file and refresh the site. No build step, no other file
     needs to change.

   Longer, page-specific paragraphs (FAQ answers, the "how it works" step
   descriptions, the About page principles) live directly in each page's
   .html file rather than here, since they read more like real prose than
   settings. They're still plain text in the HTML and easy to find and edit.
   ========================================================================== */

window.SITE = {

  /* ---------------------------------------------------------------------
     BUSINESS IDENTITY
     Shown in the nav, footer, page titles and throughout the site.
     --------------------------------------------------------------------- */
  business: {
    name: "Shipwright Talent",          // full name, shown in the logo lockup
    shortName: "Shipwright",            // the bold part of the logo lockup
    suffix: "Talent",                   // the lighter part of the logo lockup
    tagline: "Sponsorship representation for AI builder-tool creators",
    domain: "example.com",              // used for canonical links, no https://
    country: "the Netherlands",
    niche: "AI app-builder and AI dev-tool",  // used in sentences describing the niche
    footerDescription: "Representation for AI app-builder and AI dev-tool creators in brand sponsorship deals. We handle outreach, negotiation and contracts. You keep making the content that got you here."
  },

  /* ---------------------------------------------------------------------
     BUSINESS STAGE
     Controls the "founding roster" framing used on the home and about
     pages. Set to "founding" while you're signing your first creators and
     brands, and to "established" once that framing no longer fits. This
     does not invent a roster count anywhere; it only toggles which honest
     framing is shown.
     --------------------------------------------------------------------- */
  stage: {
    status: "founding",                 // "founding" | "established"
    foundingNote: "We're building our founding roster of creators and brand partners. Early partners get direct access and help shape how we work."
  },

  /* ---------------------------------------------------------------------
     REGISTRATION / LEGAL STATUS
     This site is written for a Netherlands-based sole proprietor (KVK).
     Set status to whichever is true right now:
       "hobby"      - not yet structural or profit-aimed, no registration
                      required yet. Shows no KVK/VAT line at all.
       "pending"    - registration is required (activity is structural or
                      profit-aimed) but not filed yet. Shows "pending".
       "registered" - filed. Shows the real KVK and VAT numbers below.
     --------------------------------------------------------------------- */
  registration: {
    status: "hobby",                    // "hobby" | "pending" | "registered"
    kvkNumber: "",                      // fill in once status is "registered"
    vatNumber: "",                      // fill in once status is "registered"
    hobbyNote: "This is a personal, non-commercial project and is not currently registered as a business."
  },

  /* ---------------------------------------------------------------------
     LEGAL PAGE DATES
     Update these whenever you actually change privacy.html or terms.html.
     --------------------------------------------------------------------- */
  legal: {
    privacyLastUpdated: "6 July 2026",
    termsLastUpdated: "6 July 2026",
    jurisdiction: "the Netherlands"
  },

  /* ---------------------------------------------------------------------
     CONTACT & SOCIALS
     Set "show" to false (or leave "url" empty) for anything you don't
     have yet. Hidden items are removed from the page entirely, not
     greyed out.
     --------------------------------------------------------------------- */
  contact: {
    email: "hello@example.com",
    social: [
      { name: "X (Twitter)", url: "", show: false },
      { name: "YouTube",     url: "", show: false },
      { name: "Instagram",   url: "", show: false },
      { name: "LinkedIn",    url: "", show: false },
      { name: "TikTok",      url: "", show: false }
    ]
  },

  /* ---------------------------------------------------------------------
     COMMISSION STRUCTURE
     Drives the commission table on the Creators page and the mentions of
     the standard rate elsewhere on the site.
     --------------------------------------------------------------------- */
  commission: {
    standardRate: "20%",
    minimumDealSize: "$1,000",
    tiers: [
      { label: "Under $1,500",        rate: "25%", note: "Smaller deals take similar effort to close, so the rate reflects that." },
      { label: "$1,500 – $20,000",    rate: "20%", note: "The standard rate, in line with the typical range for creator talent representation." },
      { label: "Over $20,000",        rate: "15%", note: "Larger deals scale the commission without scaling the effort proportionally." }
    ]
  },

  /* ---------------------------------------------------------------------
     CREATOR ROSTER CRITERIA
     Used in the Creators page FAQ and the Brands page copy.
     --------------------------------------------------------------------- */
  roster: {
    minSubscribers: "50,000",
    maxSubscribers: "500,000",
    agreementTermMin: "6",
    agreementTermMax: "12",
    exitNoticeDays: "30"
  },

  /* ---------------------------------------------------------------------
     MARKET STATISTICS
     Set showSources to false to hide every footnote and superscript
     reference number across the site with one change. Set it to true to
     show them. Each stat's "source" is the footnote text shown at the
     bottom of its section when sources are on.
     --------------------------------------------------------------------- */
  stats: {
    showSources: true,
    home: [
      { value: "$37B",   label: "US creator ad spend in 2025, up 26% year over year", source: "IAB, 2025 Creator Economy Ad Spend & Strategy Report." },
      { value: "$12.8B", label: "estimated 2026 revenue across AI coding and app-building tools", source: "Industry reporting on the AI coding and app-building tools market, 2025 to 2026." },
      { value: "90%+",   label: "of developers now use an AI coding tool regularly", source: "Stack Overflow 2025 Developer Survey and related 2026 developer-tooling research." },
      { value: "15–25%", label: "typical commission range for creator talent representation", source: "Influencer talent-management commission benchmarks, 2025 to 2026." }
    ],
    brands: [
      { value: "$12.8B", label: "estimated 2026 revenue across AI coding and app-building tools, more than double 2024's figure", source: "Industry reporting on the AI coding and app-building tools market, 2025 to 2026." },
      { value: "$30–80", label: "typical CPM for developer and AI-tool sponsorships, roughly double general tech-review content", source: "2026 YouTube sponsorship rate data for developer and B2B SaaS content." },
      { value: "90%+",   label: "of developers already use an AI coding tool regularly, a highly qualified, purchase-intent audience", source: "Stack Overflow 2025 Developer Survey and related 2026 developer-tooling research." }
    ],
    footnotePrefix: "Cited for context. Figures were current at time of writing, verify before quoting them elsewhere."
  },

  /* ---------------------------------------------------------------------
     PER-PAGE HERO COPY
     Short, high-impact text blocks shown near the top of each page.
     --------------------------------------------------------------------- */
  pages: {

    home: {
      eyebrow: "AI app builders · vibe coding & AI dev tools · YouTube creators",
      title: "Sponsorship representation, built for AI builder-tool creators.",
      lede: "We handle sponsorship outreach, negotiation and contracts for AI app-builder and AI dev-tool creators, so you can stay focused on building and filming. Commission-only, so nothing is owed until a deal closes.",
      primaryCta: "I'm a creator",
      secondaryCta: "I'm a brand"
    },

    creators: {
      eyebrow: "For AI app-builder & AI dev-tool creators",
      title: "Stop cold-emailing brands between builds.",
      lede: "You built the audience and the credibility. We handle the part that has nothing to do with making videos: finding brands, negotiating rates and keeping contracts straight.",
      cta: "Apply for representation"
    },

    brands: {
      eyebrow: "For brands & marketing teams",
      title: "One specialist, instead of a hundred cold DMs.",
      lede: "We represent AI app-builder and AI dev-tool creators specifically, not consumer tech in general, so the audience match is closer and the sourcing work is already done.",
      cta: "Talk to us about a campaign"
    },

    about: {
      eyebrow: "About",
      title: "A proven representation model, applied to one niche.",
      lede: "Creator-side representation isn't a new idea. It's an established category in beauty, gaming and family content. This applies that same model specifically to AI app-builder and AI dev-tool creators, a niche few agencies focus on exclusively."
    },

    contact: {
      eyebrow: "Get in touch",
      title: "Tell us where you're coming from.",
      lede: "Creator or brand, one form gets you a direct reply by email, usually within two business days."
    }
  },

  /* ---------------------------------------------------------------------
     FOUNDER BIO (About page)
     Leave name empty and show:false to hide the whole callout until
     you're ready to add a bio.
     --------------------------------------------------------------------- */
  founder: {
    show: false,
    name: "",
    bio: ""
  },

  /* ---------------------------------------------------------------------
     COOKIE BANNER
     Set showBanner to false to remove it from every page (the site has
     no analytics or advertising cookies either way, only a local-storage
     flag remembering the choice itself).
     --------------------------------------------------------------------- */
  cookieBanner: {
    show: true
  }
};
