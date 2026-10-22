# Clinton Laundry Works — website

Public marketing site for the laundromat. Static Next.js 15 + Tailwind,
exported to plain HTML so it can be hosted anywhere for free.

Deliberately kept separate from the internal operations application: the two
have different audiences, different deploy cadences, and different security
requirements. This site is fully static — no server, no database, no
credentials — which keeps the public-facing surface as small as possible.

## Before you launch

All customer-facing content lives in **one file**: [`src/content/site.ts`](src/content/site.ts).

Placeholder values are prefixed with `TODO:`. A script checks for leftovers:

```bash
npm run check:content
```

It exits non-zero while any placeholder remains. Wire it into your deploy so a
half-filled site cannot reach production. You must fill in:

| What | Why it matters |
| --- | --- |
| Address, phone, email | The three things people actually search for |
| Hours (open + attended) | Wrong hours produce one-star reviews from people who drove out |
| Prices | Currently placeholder dollar amounts |
| Google Maps URL | Powers the "Open in Maps" button |
| Site URL | Needed for canonical tags and `sitemap.xml` |

Until these are filled in, the site renders the placeholder text with the
`TODO:` prefix stripped, and **omits** them from the structured data handed to
search engines — publishing a fake address as machine-readable `LocalBusiness`
data is much harder to walk back than a typo in body copy.

### The FasCard rollout

Card payment copy is deliberately hedged: it says card payment works on
*select* machines and is expanding, because that is what is true today. When
every machine is converted, set one flag in `site.ts`:

```ts
export const fascardRolloutComplete = true;
```

The homepage, pricing page, and FAQ all switch to the unqualified wording
automatically. Do not hand-edit the copy to claim full card support before the
rollout finishes — a customer arriving with only a card and finding a coin-only
machine is exactly the bad review this hedge avoids.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into out/
npm run check:content
```

## Deploying

`npm run build` writes a fully static site to `out/`. Point any host at it:

- **Cloudflare Pages / Netlify** — build command `npm run build`, output `out`.
- **Vercel** — detected automatically.
- **Any web server** — copy `out/` and serve it.

There is no server, no database, and no environment variables.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, differentiators, equipment, payment, FAQ |
| `/pricing/` | Wash/dry/supply prices and machine-size guidance |
| `/commercial/` | Business accounts, with a quote form or phone/email fallback |
| `/visit/` | Hours (open vs. attended), address, directions |

`robots.txt` and `sitemap.xml` are generated at build time.

### The business-account form

Static export means there is no server to receive a form POST. Set
`formEndpoint` in `site.ts` to a form service URL (Formspree, Netlify Forms,
Basin) and the form submits directly to it, no JavaScript required. Leave it
empty and the page shows a phone-and-email call to action instead — never a
form that silently goes nowhere.

## Equipment data

Machine counts in `site.ts`:

- **13 Huebsch washers** — 2 × 60 lb, 6 × 30 lb, 5 × 20 lb
- **16 Huebsch dryer drums** — 4 × 45 lb, 12 × 30 lb (8 stacked units)

These are hardcoded rather than fetched at runtime, so the site stays up
regardless of anything else and loads instantly. Update them here when the
floor changes.

## Project structure

```
src/
  app/              routes: /, /pricing, /commercial, /visit, 404
  components/       Header, Footer, Section, Container, StructuredData
  content/
    site.ts         <- all content lives here
    util.ts         placeholder handling, link + pluralization helpers
scripts/
  check-content.mjs pre-launch placeholder gate
```

## Google rating and featured reviews

The homepage links to the verified Business Profile and direct review form.
It displays the **unfiltered overall Google rating** and only written reviews
rated 4 or 5 stars under a clearly labeled featured-review section.
No rating or testimonials are invented when Google data is unavailable.

To enable the rating and comments, set these secrets in the build environment:

- `GOOGLE_PLACES_API_KEY`: a Google Maps Platform key with **Places API (New)**
  enabled. Restrict it to that API and, where supported, the build runner's IP.
  Billing must be enabled; review requests can incur Google API charges.
- `GOOGLE_PLACE_ID`: the Place ID of the verified **Clinton Laundry Works,
  540 McKoy St, Clinton, NC 28328** listing. Obtain it from Google's Place ID
  finder; the short review-link code is not a Place ID.

The key is used during static export only and never embedded in browser code.
Google supplies a limited selection (up to five reviews), so this is not an
archive of every qualifying review. Author attribution and Google links stay
with each displayed review. The date shown records when the site was built.
Rebuild/redeploy to refresh the rating and comments; the static site cannot poll
Google on its own. Without credentials or if Google is unavailable, visitors
still see working links to read all reviews and leave their own.

Google references:
- https://developers.google.com/maps/documentation/places/web-service/place-details
- https://developers.google.com/maps/documentation/places/web-service/policies
- https://developers.google.com/maps/documentation/places/web-service/place-id
