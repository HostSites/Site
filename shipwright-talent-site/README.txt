This folder is intentionally empty.

The site is designed to look complete without photography. The hero
background uses a subtle CSS grid pattern, not photos, specifically so
the homepage doesn't need stock images or placeholder creator photos
before you have real ones.

When you're ready to add real imagery, these are the highest-value spots:

1. Open Graph preview image (social share preview)
   - Add: images/og-image.jpg, 1200x630px
   - Then uncomment the <meta property="og:image"> line in the <head>
     of index.html (and optionally the other pages).

2. Founding creators
   - Once you've signed your first creators, this is where their channel
     thumbnails or build screenshots would live for a future "Roster"
     section. The current site deliberately doesn't show a roster yet,
     to avoid implying a bigger operation than exists. Update the
     `stage.status` field in config.js to "established" once that's no
     longer the right framing.

3. Founder photo (optional)
   - For the About page founder callout, a simple headshot works well
     once you set founder.show to true in config.js.

Do not use stock photos of people or software that aren't actually
connected to the business. For a trust-driven niche like this, a real
screenshot of an actual build, or a simple photo of you at your setup,
will read as more credible than generic stock imagery once you have it.
