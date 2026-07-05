# Shipwright Talent - website

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies
beyond three Google Fonts loaded via CDN. Push this folder straight to a
GitHub repo and turn on GitHub Pages (Settings → Pages → deploy from
`main` branch, root folder) and it will work as-is.

## File structure

```
index.html           Home
styles.css            Shared stylesheet (all colors/fonts/spacing as CSS variables at the top)
script.js             Shared JavaScript (nav, reveals, pipeline animation, terminal effect, forms, cookie banner)
favicon.svg           Site icon
robots.txt            Search engine crawl rules
sitemap.xml           Search engine page list
privacy.html          Privacy Policy
terms.html            Terms of Service
pages/
  creators.html       For creators
  brands.html         For brands
  about.html          About
  contact.html        Contact form
images/
  README.txt          Notes on what images to add and where
```

## Before you launch: things to actually change

Search the whole project for each of these and replace them. Most editors
(VS Code, Sublime, even GitHub's web editor) have a "find in all files"
feature. Use it.

| Find | Replace with |
|---|---|
| `example.com` | Your real domain, once you have one (appears in canonical links, robots.txt, sitemap.xml, Open Graph tags) |
| `hello@example.com` | Your real business email |
| `[Your name]` in about.html | Your name or a short bio |
| KVK / VAT placeholders in every footer, contact.html, privacy.html, terms.html | Your real KVK and VAT numbers once registered, see "About the Dutch business registration" below |
| X (Twitter) / YouTube links in every footer | Your real handles, or delete the `<li>` if you don't have one yet |

The site intentionally shows only the trade name "Shipwright Talent"
throughout, rather than a bracketed personal legal name. That's fine for
a launch site: Dutch disclosure rules ask for your trade name, KVK number
and contact details once you're registered, not your personal name on
the page. Keep that in mind if you later work with a notary, accountant,
or e-signature tool, where your actual legal name will still be required
on contracts themselves.

## Renaming the agency

The name used throughout is **Shipwright Talent**, chosen because it
scales past AI app builders into adjacent niches (AI-first IDEs, agent
and automation tooling) without locking the name to one product, and it
ties directly into the site's visual signature: the build-pipeline line
used to lay out sequential sections. If you'd rather use one of the
other names from the playbook (Compile Media Group, Runtime Talent
Partners, Northloop Creator Group, Deploy Cycle Media) or something
else entirely:

1. Find-and-replace "Shipwright Talent" and "Shipwright" across every
   file.
2. The pipeline/terminal visual device still works with any name. It's
   a design motif, not tied to the word "Shipwright" specifically.
3. Double-check the domain and KVK Handelsregister for name availability
   before committing, exactly as the playbook recommends.

## About the Dutch business registration

You're required to register with the KVK as soon as your activity is
structural and profit-aimed, which applies from day one of outreach, not
from your first closed deal. Until you're registered:

- The site currently says "KVK registration: pending" everywhere a KVK
  number would normally go. This is accurate and non-misleading. Leave
  it as-is rather than inventing a number.
- Sign contracts using your trade name together with your legal name as
  required by whatever e-signature or contract tool you use; the
  website copy doesn't need to show that legal name, but the signed
  documents will.
- Once you have a KVK number, update every "KVK registration: pending"
  line (footers on every page, contact.html, privacy.html, terms.html)
  in one pass.

## The contact form

`pages/contact.html` has a working form with validation, but no backend.
Submitting it opens the visitor's email client with the message
pre-filled (a `mailto:` link), which needs zero setup and works the
moment you go live. When you're ready for a proper backend:

1. Open `script.js` and find the comment `FORM-ENDPOINT`.
2. Swap in a form service like Formspree, Netlify Forms, or Basin (all
   have free tiers), or point it at your own backend.
3. Update the `to` address in the same function to your real inbox if
   you're keeping the `mailto:` fallback as a backup.

No step in this site's copy asks a visitor to book a call. Onboarding is
written around email exchanges instead, so keep that framing if you add
new steps later, or update the copy if you decide you'd rather take calls.

## Cookie banner

The site ships with no analytics or advertising scripts, so the cookie
banner currently only discloses the one local-storage entry it uses to
remember your visitor's choice. If you add Google Analytics, a Meta
pixel, or similar later:

1. Update the banner copy in every page (search for "No analytics or
   advertising cookies run on this site yet").
2. Update `privacy.html` sections 2 and 7 to name the tool and explain
   what it collects.
3. In `script.js`, gate the new tracking script behind the `hasConsent()`
   helper so it only loads after someone accepts.

If you don't want a cookie banner at all before launch, delete the
`<div class="cookie-banner" id="cookie-banner">…</div>` block from every
page. The JavaScript checks whether the element exists before doing
anything, so nothing else needs to change.

## Design notes

- **Palette and type** are defined once, at the top of `styles.css`, as
  CSS variables (`--color-shipped`, `--font-display`, etc.). Change a
  value there and it updates across every page.
- **The build pipeline** (used for "How it works" sections) is the
  site's recurring signature element: a vertical line with numbered
  stages, echoing a CI/CD pipeline running from queued to shipped. It's
  only used where content is genuinely sequential (a real process), not
  as generic decoration.
- **The terminal graphic** in the hero types out a short, honest market
  check rather than a generic animation, to open on the most
  characteristic thing in this niche's world: a command line.
- **No stock photography** is used anywhere. See `images/README.txt` for
  where to add real photos or screenshots once you have them.
- All animations respect `prefers-reduced-motion`, and all interactive
  elements have visible keyboard focus states.

## On the market figures used across the site

The statistics quoted in the hero, the "Why AI builder tools" section,
and the Brands page ($37B/2025 and $44B/2026 US creator ad spend, the
26% year-over-year growth figure, and the AI-coding-tools market size)
are drawn from the IAB's 2025 Creator Economy Ad Spend & Strategy
Report and from industry reporting on the AI coding/app-building tools
market current as of mid-2026. Treat them the way the original playbook
does: current at time of writing, not guaranteed to stay current, and
worth re-checking every few months in a niche that moves this fast
before you quote them to a brand or creator directly.

## What isn't included on purpose

There's no client logo wall, no fake testimonials, no invented "trusted
by X creators" counter, and no named brand partnerships anywhere on the
public site, because none of that exists yet. The Home and About pages
say so directly (see the "Founding roster" section). Update that framing
as your roster and brand relationships genuinely grow, rather than
backfilling numbers early.
