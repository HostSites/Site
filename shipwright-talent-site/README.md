# Shipwright Talent: website

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies
beyond three Google Fonts loaded via CDN. Push this folder straight to a
GitHub repo and turn on GitHub Pages (Settings → Pages → deploy from
`main` branch, root folder), or deploy it as-is to Cloudflare Pages,
Netlify, or any static host, and it will work.

## Start here: `config.js`

Nearly everything you'd want to customize lives in **`config.js`**, not
scattered across the HTML. Open it, read the comments, and edit the
values. Every page picks the changes up automatically because `config.js`
loads before `script.js` on every page.

That file covers:

- Business name, short name, domain and contact email
- Whether to show a real KVK/VAT number or "pending" (see below)
- The "last updated" dates on the Privacy Policy and Terms
- Which social links appear in the footer, and their URLs
- The commission table on the Creators page (add, remove or reprice tiers)
- Whether to show the numbered source citations under market stats
- The "founding roster" vs. "established" framing on Home/About
- Cookie banner behavior, and the founder bio on the About page

A handful of things still need a manual find-and-replace, because they
sit in places JavaScript can't safely rewrite (search every file for
these, most editors have a "find in all files" feature):

| Find | Replace with |
|---|---|
| `example.com` | Your real domain, once you have one (canonical links, `robots.txt`, `sitemap.xml`, Open Graph tags) |
| `images/og-image.jpg` (commented out in each page's `<head>`) | Uncomment once you add a real 1200×630px preview image |

## File structure

```
index.html            Home
config.js              Every editable setting, read this first
styles.css              Shared stylesheet (all colors/fonts/spacing as CSS variables at the top)
script.js               Shared JavaScript (config rendering, nav, reveals, pipeline, terminal, forms, cookie banner)
favicon.svg             Site icon
robots.txt              Search engine crawl rules
sitemap.xml             Search engine page list
privacy.html            Privacy Policy
terms.html              Terms of Service
pages/
  creators.html         For creators
  brands.html           For brands
  about.html            About
  contact.html          Contact form
images/
  README.txt            Notes on what images to add and where
```

## The design

The site's visual language is borrowed directly from the world its
audience already lives in: a terminal, a build pipeline, a commit graph.
Near-black background, a GitHub-style "shipped" green as the single
accent, and a monospace face used specifically for data, labels and code,
never for body copy. The recurring "pipeline" element (used on Home,
Creators and Brands) is only used where the content is a genuine
sequence, a real process with a real order, each stage labeled with a
short commit-hash-style id instead of a generic "01 / 02 / 03".

Motion is deliberate rather than decorative: a scroll-triggered reveal
for sections, a typed terminal readout in the hero, a pipeline line that
fills in as you scroll past each stage, and small hover lifts on cards
and buttons. Everything respects `prefers-reduced-motion`, and every
interactive element has a visible keyboard focus state.

Fonts: **Bricolage Grotesque** for headings, **Inter** for body copy, and
**JetBrains Mono** for anything data- or code-flavored (stats, labels,
the terminal, table figures). All three load from Google Fonts.

## Renaming the agency

Set `business.name` and `business.shortName` in `config.js`. Every
mention of "Shipwright Talent" and "Shipwright" in the page's visible
text and title is rewritten automatically at load time, including the
logo, footer and body copy. You'll still want to update the domain and
check the KVK Handelsregister (or your own country's registry) for name
availability before committing, exactly as before.

The pipeline/terminal visual device works with any name; it's a design
motif, not tied to the word "Shipwright."

## About the Dutch business registration

You're required to register with the KVK as soon as your activity is
structural and profit-aimed. If this is a hobby project you're not yet
running for profit, that requirement doesn't apply yet, which is exactly
what `registration.isRegistered: false` in `config.js` is for. While it's
`false`, every KVK/VAT line on the site reads "pending" instead of a
number, which is accurate and non-misleading. Leave it as-is rather than
inventing a number.

Once you register:

1. Set `registration.isRegistered` to `true` in `config.js`.
2. Fill in `registration.kvkNumber` and `registration.vatNumber`.
3. Every footer, `contact.html`, `privacy.html` and `terms.html` updates
   in one pass, automatically.

Sign contracts using your trade name together with your legal name as
required by whatever e-signature or contract tool you use; the website
copy doesn't need to show that legal name, but the signed documents
will.

## The contact form

`pages/contact.html` has a working form with validation, but no backend.
Submitting it opens the visitor's email client with the message
pre-filled (a `mailto:` link, addressed to whatever `business.email` is
set to in `config.js`), which needs zero setup and works the moment you
go live. When you're ready for a proper backend:

1. Open `script.js` and find the comment `FORM-ENDPOINT`.
2. Swap in a form service like Formspree, Netlify Forms, or Basin (all
   have free tiers), or point it at your own backend.

No step in this site's copy asks a visitor to book a call. Onboarding is
written around email exchanges instead, so keep that framing if you add
new steps later, or update the copy if you decide you'd rather take
calls.

## Cookie banner

The site ships with no analytics or advertising scripts, so the cookie
banner and `privacy.html` both currently disclose only the one
local-storage entry used to remember a visitor's choice. If you add
Google Analytics, a Meta pixel, or similar later:

1. In `config.js`, set `cookies.usesAnalytics: true` and
   `cookies.analyticsToolName` to the tool's name. The banner and
   `privacy.html` §2/§7 wording update automatically.
2. In `script.js`, gate the new tracking script behind the
   `hasConsent()` helper so it only loads after someone accepts.

To turn the banner off entirely (for example if you never add
analytics and would rather not show it at all), set
`cookies.showBanner: false` in `config.js`.

## Commission table

Edit `commission.tiers` in `config.js`, an array of `{ label, rate,
note }` objects. The rate table on the Creators page rebuilds itself
from this array on every load, in the order you list them. Add or
remove a tier by adding or removing an entry; there's no separate place
in the HTML to keep in sync.

## Social links

Each platform in `social` (in `config.js`) has a `show` boolean and a
`url`. Only entries with both a truthy `show` and a non-empty `url`
render in the footer, so turning a platform off (or leaving its URL
blank) removes it cleanly rather than showing a dead link.

## Source citations for market figures

The statistics quoted in the hero, the "Why AI builder tools" section,
and the Brands page ($37B/2025 US creator ad spend, the 26%
year-over-year growth figure, and the AI-coding-tools market size) are
drawn from the IAB's 2025 Creator Economy Ad Spend & Strategy Report and
from industry reporting on the AI coding/app-building tools market
current as of mid-2026. They're worth re-checking every few months in a
niche that moves this fast, before you quote them to a brand or creator
directly.

Set `marketData.showSources: false` in `config.js` to hide every
numbered footnote and source list sitewide without deleting the
underlying statistic, if you'd rather not cite third-party research
until you've re-verified it yourself.

## What isn't included on purpose

There's no client logo wall, no fake testimonials, no invented "trusted
by X creators" counter, and no named brand partnerships anywhere on the
public site, because none of that exists yet. The Home and About pages
say so directly, controlled by `content.stage` / `stage.label` in
`config.js` (`"founding"` vs. `"established"`). Update that setting, and
the surrounding copy, as your roster and brand relationships genuinely
grow, rather than backfilling numbers early.
