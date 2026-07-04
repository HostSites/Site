# Waypoint Creator Group — website

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies
beyond three Google Fonts loaded via CDN. Push this folder straight to a
GitHub repo and turn on GitHub Pages (Settings → Pages → deploy from
`main` branch, root folder) and it will work as-is.

## File structure

```
index.html          Home
styles.css           Shared stylesheet (all colors/fonts/spacing as CSS variables at the top)
script.js            Shared JavaScript (nav, animations, forms, cookie banner)
favicon.svg          Site icon
robots.txt           Search engine crawl rules
sitemap.xml          Search engine page list
privacy.html         Privacy Policy
terms.html           Terms of Service
pages/
  creators.html      For creators
  brands.html        For brands
  about.html         About
  contact.html       Contact form
images/
  README.txt         Notes on what images to add and where
```

## Before you launch: things to actually change

Search the whole project for each of these and replace them. Most editors
(VS Code, Sublime, even GitHub's web editor) have a "find in all files"
feature — use it.

| Find | Replace with |
|---|---|
| `example.com` | Your real domain, once you have one (appears in canonical links, robots.txt, sitemap.xml, Open Graph tags) |
| `hello@example.com` | Your real business email |
| `[Your legal name]` | Your legal name (used until you have a registered trade name) |
| `[Your name]` in about.html | Your name / short bio |
| KVK / VAT placeholders in every footer, contact.html, privacy.html, terms.html | Your real KVK and VAT numbers once registered — see "About the Dutch business registration" below |
| Instagram / YouTube links in every footer | Your real handles, or delete the `<li>` if you don't have one yet |

## Renaming the agency

The name used throughout is **Waypoint Creator Group**, chosen because it
scales past overlanding (per your own playbook's naming criteria) and ties
directly into the site's visual signature — the waypoint/route line used
to lay out sequential sections. If you'd rather use one of the other names
from the playbook (Ridgeline Talent, Basecamp Media Partners, Switchback
Media, Northwing Talent) or something else entirely:

1. Find-and-replace "Waypoint Creator Group" and "Waypoint" across every
   file.
2. The waypoint/route visual device still works with any name — it's a
   design motif, not tied to the word "Waypoint" specifically.
3. Double-check the domain and KVK Handelsregister for name availability
   before committing, exactly as the playbook recommends.

## About the Dutch business registration

Per your playbook, you're required to register with the KVK as soon as
activity is structural and profit-aimed — which applies from day one of
outreach, not from your first closed deal. Until you're registered:

- The site currently says "Registration in progress (KVK)" everywhere a
  KVK number would normally go. This is accurate and non-misleading —
  leave it as-is rather than inventing a number.
- Sign contracts as yourself ("[Your legal name], trading as Waypoint
  Creator Group"), not as the brand name alone, exactly as your playbook
  notes.
- Once you have a KVK number, update every "Registration in progress"
  line (footers on every page, contact.html, privacy.html, terms.html)
  in one pass.

## The contact form

`pages/contact.html` has a working form with validation, but no backend —
submitting it opens the visitor's email client with the message
pre-filled (a `mailto:` link), which needs zero setup and works the
moment you go live. When you're ready for a proper backend:

1. Open `script.js` and find the comment `FORM-ENDPOINT`.
2. Swap in a form service like Formspree, Netlify Forms, or Basin (all
   have free tiers), or point it at your own backend.
3. Update the `to` address in the same function to your real inbox if
   you're keeping the `mailto:` fallback as a backup.

## Cookie banner

The site ships with no analytics or advertising scripts, so the cookie
banner currently only discloses the one local-storage entry it uses to
remember your visitor's choice. If you add Google Analytics, Meta Pixel,
or similar later:

1. Update the banner copy in every page (search for "No analytics or
   advertising cookies run on this site yet").
2. Update `privacy.html` section 2 and 7 to name the tool and explain
   what it collects.
3. In `script.js`, gate the new tracking script behind the `hasConsent()`
   helper so it only loads after someone accepts.

If you don't want a cookie banner at all before launch, delete the
`<div class="cookie-banner" id="cookie-banner">…</div>` block from every
page — the JavaScript checks whether the element exists before doing
anything, so nothing else needs to change.

## Design notes

- **Palette and type** are defined once, at the top of `styles.css`, as
  CSS variables (`--color-rust`, `--font-display`, etc.) — change a value
  there and it updates across every page.
- **The route/waypoint line** (used for "How it works" sections) is the
  site's one recurring signature element — a trail line with waypoint
  markers, echoing a route plotted on a topographic map. It's only used
  where content is genuinely sequential (a real process), not as generic
  decoration.
- **No stock photography** is used anywhere. Backgrounds and dividers are
  CSS/SVG topographic line patterns. See `images/README.txt` for where to
  add real photos once you have them.
- All animations respect `prefers-reduced-motion` and all interactive
  elements have visible keyboard focus states.

## What isn't included on purpose

There's no client logo wall, no fake testimonials, no invented "trusted
by X creators" counter, and no named brand partnerships anywhere on the
public site — because none of that exists yet. The Home and About pages
say so directly (see the "Founding roster" section). Update that framing
as your roster and brand relationships genuinely grow, rather than
backfilling numbers early.
