# Shipwright Talent - website

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies
beyond three Google Fonts loaded via CDN. Push this folder straight to a
GitHub repo and turn on GitHub Pages (Settings → Pages → deploy from
`main` branch, root folder) and it will work as-is.

## File structure

```
shipwright-talent-site/
  index.html           Home
  styles.css            Shared stylesheet (all colors/fonts/spacing as CSS variables at the top)
  script.js             Shared JavaScript (nav, reveals, pipeline animation, terminal reveal, forms, cookie banner)
  favicon.svg           Site icon
  robots.txt            Search engine crawl rules
  sitemap.xml           Search engine page list
  privacy.html          Privacy Policy
  terms.html            Terms of Service
  wrangler.jsonc         Cloudflare Pages config, if you deploy there instead of GitHub Pages
  pages/
    creators.html       For creators
    brands.html         For brands
    about.html          About
    contact.html        Contact form
  images/
    README.txt          Notes on what images to add and where
```

## What changed in this pass

- **Reorganized into a proper project folder** (`shipwright-talent-site/`),
  with `pages/` and `images/` as real subfolders. Nothing about the link
  structure needed to change, since every page already linked to
  `pages/...` or `../...` as if this layout existed.
- **Fixed the process-timeline stage numbers.** The old markup rendered
  each stage's number from a `data-mark="STAGE·01"` attribute via CSS
  `attr()`, which is fragile: any mismatch between the attribute and the
  stage's real position renders a wrong or garbled label sitting right on
  the green timeline. Stage numbers are now generated automatically with
  a CSS counter, so there's nothing to keep in sync and nothing that can
  render incorrectly.
- **Simplified the hero terminal animation.** It used to type out its
  lines with a recursive per-line `setTimeout` chain, which could feel
  janky on slower devices right as the page loads. It now uses a single,
  short staggered fade-in driven by CSS transitions, which is smoother
  and easier to maintain.
- **Removed unverifiable "we're the only ones" framing.** Copy that
  claimed zero competing agencies exist, that nobody has approached this
  niche, or that a "gap" is being filled has been replaced with
  descriptions of what Shipwright Talent actually specializes in. This
  is more defensible and reads as more professional than a claim no one
  can check.
- **General visual polish:** smoother, slightly springier hover states on
  buttons, cards and the terminal widget; refined shadows and easing.

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
used to lay out sequential sections. If you'd rather use a different
name:

1. Find-and-replace "Shipwright Talent" and "Shipwright" across every
   file.
2. The pipeline/terminal visual device still works with any name. It's
   a design motif, not tied to the word "Shipwright" specifically.
3. Double-check the domain and KVK Handelsregister for name availability
   before committing.

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
  stages, echoing a CI/CD pipeline running from queued to shipped. Stage
  numbers are generated automatically by a CSS counter, so adding,
  removing or reordering a `.stage` div just works. It's only used
  where content is genuinely sequential, not as generic decoration.
- **The terminal graphic** in the hero is a quick, honest snapshot of
  the actual pipeline and commission terms, not a market-size claim, so
  it stays accurate no matter how the market shifts.
- **No stock photography** is used anywhere. See `images/README.txt` for
  where to add real photos or screenshots once you have them.
- All animations respect `prefers-reduced-motion`, and all interactive
  elements have visible keyboard focus states.

## On the market figures used across the site

The statistics quoted in the hero and the "Why AI builder tools" section
(creator ad spend, the AI-coding-tools market size, developer AI-tool
adoption, and standard commission ranges) are drawn from third-party
industry research current at the time of writing. They're footnoted on
each page. Re-check them every few months in a niche that moves this
fast, and before you quote them directly to a brand or creator.

## What isn't included on purpose

There's no client logo wall, no fake testimonials, no invented "trusted
by X creators" counter, and no named brand partnerships anywhere on the
public site, because none of that exists yet. The Home and About pages
say so directly (see the "Founding roster" section). Update that framing
as your roster and brand relationships genuinely grow, rather than
backfilling numbers early.
