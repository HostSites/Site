# Shipwright Talent - website

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies
beyond three Google Fonts loaded via CDN. Push this folder straight to a
GitHub repo and turn on GitHub Pages (Settings → Pages → deploy from
`main` branch, root folder) and it will work as-is.

## Start here: config.js

Almost everything you'd want to customize lives in one file, **config.js**,
at the root of this folder. It's heavily commented. Open it before you touch
anything else. It controls:

- Your business name and tagline, shown in the nav, footer and page titles
- Whether the site frames itself as a hobby project, pending registration,
  or a registered business, and shows your real KVK/VAT numbers or not
- The last-updated dates on the Privacy Policy and Terms of Service
- Which social links appear in the footer (hidden entirely if you leave
  a URL empty)
- Your commission rate and tiers, shown on the Creators page
- The creator subscriber range and agreement terms, shown in the FAQ
- Whether market-statistic sources and footnotes are shown at all
- The hero headline and intro paragraph on every page
- The founding-roster framing on the Home and About pages
- The optional founder bio callout on the About page
- Whether the cookie banner appears at all

Every page loads `config.js` before `script.js`, and `script.js` renders
those values into the page on load. Edit config.js, save, refresh: nothing
else needs to change.

Longer, page-specific paragraphs (FAQ answers, "how it works" step
descriptions, the About page principles) live directly in each page's
`.html` file rather than in config.js, since they read like real prose
rather than settings. They're plain text in the HTML, easy to find with
your editor's search, and safe to edit directly.

## File structure

```
shipwright-talent-site/
  config.js             Every editable setting: business name, legal toggles, dates, socials, commission, stats, hero copy
  index.html             Home
  styles.css             Design system: every color, font and spacing value as a CSS variable at the top
  script.js               Renders config.js into the page, plus nav, reveals, pipeline, FAQ, cookie banner and the contact form
  favicon.svg             Site icon
  robots.txt              Search engine crawl rules
  sitemap.xml             Search engine page list
  privacy.html            Privacy Policy (dates and registration status come from config.js)
  terms.html              Terms of Service (dates and registration status come from config.js)
  wrangler.jsonc          Cloudflare Pages config, if you deploy there instead of GitHub Pages
  pages/
    creators.html         For creators
    brands.html           For brands
    about.html             About
    contact.html            Contact form
  images/
    README.txt             Notes on what images to add and where
```

## What changed in this pass

- **Full visual redesign.** The old site's uneven CSS-counter timeline,
  boxed "terminal" widget and heavy card shadows are gone. The new design
  uses a deep charcoal background, a single coral accent color, monospace
  numerals for statistics, and a straight, evenly spaced process line with
  square numbered nodes that fill in as you scroll. Every hover and reveal
  transition uses the same easing curve so motion feels consistent rather
  than scattered.
- **Everything editable moved into config.js.** Business name, legal
  status, dates, socials, commission structure, stats and hero copy are
  now single-source-of-truth settings instead of being hand-edited across
  eight different HTML files.
- **Registration status is now three-way, not a single "pending" string.**
  `config.js` lets you pick "hobby" (not registered, not required yet),
  "pending" (required but not filed), or "registered" (shows your real
  KVK and VAT numbers). Privacy Policy, Terms of Service, the contact
  page and every footer read from the same setting automatically.
- **Source footnotes can be switched off in one place.** Set
  `stats.showSources` to `false` in config.js and every superscript
  reference and footnote across the site disappears; set it back to
  `true` and they return, still numbered correctly.
- **Social links are additive, not placeholders.** Each entry in
  `contact.social` in config.js has its own `show` flag. Leave it `false`
  or the URL empty and it's removed from the footer entirely rather than
  showing a dead link.
- **Removed unverifiable "we're the only ones" framing**, kept from the
  previous pass: copy describes what the agency specializes in rather
  than claiming a gap nobody can check.

## Before you launch: things to actually change

Open **config.js** first and fill in:

| Field | What it controls |
|---|---|
| `business.name`, `business.shortName`, `business.suffix` | Your real business or project name, shown everywhere |
| `business.domain` | Your real domain once you have one |
| `registration.status` | `"hobby"`, `"pending"`, or `"registered"`, matching where you actually are |
| `registration.kvkNumber` / `vatNumber` | Fill in once `status` is `"registered"` |
| `legal.privacyLastUpdated` / `termsLastUpdated` | Update whenever you actually change those pages |
| `contact.email` | Your real inbox |
| `contact.social` | Add real URLs and set `show: true` for any platform you use |
| `commission.standardRate` / `tiers` | Your real commission structure |

Then search the project for `example.com` (appears in canonical links,
`robots.txt`, `sitemap.xml`, and Open Graph tags) and replace it with your
real domain once you have one.

## About the Dutch business registration

This template ships with `registration.status` set to `"hobby"` in
config.js: a personal, non-commercial project that isn't required to
register with the KVK yet. That's accurate for exploring the idea before
you're actually pitching brands for money.

The moment your activity becomes structural and profit-aimed, which in
practice means once you're signing creators or pitching brands with the
intent of closing paid deals, Dutch law requires KVK registration from
day one, not from your first closed deal. When that's true for you:

1. Register an eenmanszaak (sole proprietorship) at a KVK appointment.
2. Set `registration.status` to `"pending"` in config.js immediately, and
   to `"registered"` with your real KVK and VAT numbers once the
   paperwork clears.
3. Everything else, the footer on every page, the contact page, and both
   legal pages, updates automatically.

Outside the Netherlands, check your own country's registration rules
before your first signature. None of this is legal advice.

## The contact form

`pages/contact.html` has a working form with validation, but no backend.
Submitting it opens the visitor's email client with the message
pre-filled (a `mailto:` link), which needs zero setup and works the
moment you go live. When you're ready for a proper backend:

1. Open `script.js` and find the comment `FORM-ENDPOINT`.
2. Swap in a form service like Formspree, Netlify Forms, or Basin (all
   have free tiers), or point it at your own backend.
3. Keep the `mailto:` fallback as a backup if you like; it already reads
   the destination address from `config.js`.

## Cookie banner

The site ships with no analytics or advertising scripts, so the cookie
banner currently only discloses the one local-storage entry it uses to
remember your visitor's choice. Set `cookieBanner.show` to `false` in
config.js to remove it from every page in one change. If you add Google
Analytics, a Meta pixel, or similar later:

1. Update the banner copy in every page (search for "No analytics or
   advertising cookies run on this site yet").
2. Update `privacy.html` sections 2 and 7 to name the tool and explain
   what it collects.
3. In `script.js`, gate the new tracking script behind the `hasConsent()`
   helper (kept from the original build) so it only loads after someone
   accepts.

## Design notes

- **Every color, font and spacing value** is a CSS variable defined once
  at the top of `styles.css`. Change a value there and it updates across
  every page.
- **The process pipeline** (used for "how it works" sections) is straight,
  evenly spaced with flexbox, and fills a connecting line with the accent
  color as you scroll past each stage. Numbers are drawn with a CSS
  counter, so adding, removing or reordering a `.stage` div just works.
  It's only used where content is genuinely sequential, not as decoration.
- **No stock photography** is used anywhere. See `images/README.txt` for
  where to add real photos or screenshots once you have them.
- All animations respect `prefers-reduced-motion`, and all interactive
  elements have visible keyboard focus states.

## On the market figures used across the site

The statistics quoted in the hero and the Brands page (creator ad spend,
the AI-coding-tools market size, developer AI-tool adoption, and standard
commission ranges) are drawn from third-party industry research current
at the time of writing, and live in `config.js` under `stats.home` and
`stats.brands`. Re-check them every few months in a niche that moves this
fast, and before you quote them directly to a brand or creator. Set
`stats.showSources` to `false` if you'd rather not show footnotes at all.

## What isn't included on purpose

There's no client logo wall, no fake testimonials, no invented "trusted
by X creators" counter, and no named brand partnerships anywhere on the
public site, because none of that exists yet. The Home and About pages
say so directly, controlled by `stage.status` in config.js. Update that
setting to `"established"` as your roster and brand relationships
genuinely grow, rather than backfilling numbers early.
