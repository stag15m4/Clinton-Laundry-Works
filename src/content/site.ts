/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything a customer reads lives in this file. Edit here, rebuild, done.
 *  No other file needs to change for routine updates.
 *
 *  ⚠️  ITEMS MARKED `TODO:` ARE PLACEHOLDERS AND MUST BE REPLACED BEFORE LAUNCH.
 *      Publishing a wrong address, phone number, or set of hours is worse than
 *      having no site at all — it generates one-star reviews from people who
 *      drove to a closed store. Search the file for "TODO" to find them all.
 */

export const business = {
  name: "Clinton Laundry Works",
  /** Short tagline used in the hero and the browser title. */
  tagline: "Clean clothes, fast machines, no hassle.",

  // ── TODO: REPLACE ALL CONTACT DETAILS BELOW ────────────────────────────────
  phone: "(910) 627-8040",
  /** Digits only, with country code — used for the tap-to-call link on mobile. */
  phoneHref: "+19106278040",
  /**
   * Public contact address.
   *
   * Held behind the TODO gate until a test message has actually been received.
   * An address that bounces is worse than none at all: a business-account
   * enquiry that fails silently is a lost customer you never learn about.
   *
   * Set up as a free forward (Cloudflare Email Routing) to an inbox that is
   * already read daily, so there is no second mailbox to remember to check.
   * Once a test send arrives, delete the "TODO: " prefix and it goes live.
   */
  email: "TODO: info@clintonlaundryworks.com",

  address: {
    street: "540 McKoy St",
    city: "Clinton",
    state: "NC",
    zip: "28328",
  },

  /**
   * Google Maps link, used by the "Open in Maps" button and published as
   * `hasMap` in the LocalBusiness structured data.
   *
   * HELD BACK ON PURPOSE. The Business Profile at this address is claimed but
   * still carries the previous operator's name (Fluff n Fold) pending Google
   * verification. Publishing it now would send customers to a listing with the
   * wrong business name, and would point `hasMap` at a listing whose name
   * contradicts this site — exactly the name/address/phone inconsistency that
   * hurts local search results.
   *
   * While this stays a TODO the site falls back to a Maps search built from
   * the street address, which gives correct directions without asserting a
   * business identity. Once Google verifies the rename, drop the "TODO: "
   * prefix and this goes live as-is.
   *
   * The `?g_st=` tracking parameter Maps appends when sharing from a phone has
   * already been stripped; it identifies the sharing app, not the place.
   */
  mapUrl: "TODO: https://maps.app.goo.gl/9WcnxucA9MwwhVx68 (live once Google verifies the rename from Fluff n Fold)",

  /**
   * Google review link, for the "leave us a review" call to action.
   *
   * Empty until the Business Profile exists; the button stays hidden until
   * then. Once claimed, use the short review URL Google gives you
   * (https://g.page/r/<id>/review) so it opens the review box directly
   * instead of the listing.
   */
  googleReviewUrl: "",

  /** Public site URL once the domain is live. Used for SEO canonical tags. */
  siteUrl: "https://www.clintonlaundryworks.com",

  /** Optional — leave as empty strings to hide the social icons entirely. */
  social: {
    facebook: "",
    instagram: "",
  },
} as const;

/**
 * Store hours.
 *
 * `open`     — when the doors are unlocked and machines are usable.
 * `attended` — when a staff member is physically on site. Leave as `null`
 *              for days with no attendant. This is displayed as a separate
 *              column because "is someone there?" is a real question for
 *              customers doing laundry alone at night.
 *
 * TODO: Replace every row below with real hours.
 */
export const hours = [
  { day: "Monday",    open: "6:00 AM – 10:00 PM", attended: null },
  { day: "Tuesday",   open: "6:00 AM – 10:00 PM", attended: null },
  { day: "Wednesday", open: "6:00 AM – 10:00 PM", attended: null },
  { day: "Thursday",  open: "6:00 AM – 10:00 PM", attended: null },
  { day: "Friday",    open: "6:00 AM – 10:00 PM", attended: null },
  { day: "Saturday",  open: "6:00 AM – 10:00 PM", attended: null },
  { day: "Sunday",    open: "6:00 AM – 10:00 PM", attended: null },
] as const;

/**
 * Notice shown under the hours table, e.g. a last-wash cutoff.
 *
 * Set to null deliberately: there is no cutoff. A wash can be started any time
 * the store is open, so posting "last wash 10:00 PM" would only restate the
 * closing time and tell a customer nothing.
 */
export const lastWashNotice: string | null = null;

/**
 * Equipment — these counts are pulled from the live equipment records in the
 * Laundroweb ops system, so they are accurate as of the last audit.
 * Update if machines are added or retired.
 */
export const equipment = {
  brand: "Huebsch",
  washers: [
    {
      size: "60 lb",
      count: 2,
      blurb: "Comforters, sleeping bags, and multiple loads at once.",
    },
    {
      size: "30 lb",
      count: 6,
      blurb: "About three regular home loads — the everyday workhorse.",
    },
    {
      size: "20 lb",
      count: 5,
      blurb: "Perfect for a single large hamper or delicates run.",
    },
  ],
  dryers: [
    { size: "45 lb", count: 4 },
    // Includes the four drums recorded in the ops app under model
    // HTT20NKCB2G2N04 as 20 lb (serials 1704049141 and 1704049142). Those are
    // mislabeled 30 lb units; the ops records are what need correcting, not
    // this list.
    { size: "30 lb", count: 12 },
  ],
} as const;

export const totalWashers = equipment.washers.reduce((n, w) => n + w.count, 0);
export const totalDryers = equipment.dryers.reduce((n, d) => n + d.count, 0);

/**
 * Pricing, deliberately simplified for a public page.
 *
 * The machines support far more than this: each washer carries a separate vend
 * price per cycle (ATS1 Hot through ATS6 Delicate Cold) plus Extra Wash and
 * Extra Rinse upcharges. Publishing that full matrix is noise for someone
 * standing in the parking lot deciding whether to come in. So the page shows
 * one number per washer size — the HOT wash price, ATS1 — and a short note
 * that other cycles and add-ons are priced separately.
 *
 * Hot is the right number to publish because it is the most expensive cycle:
 * the posted price becomes a ceiling, and nobody is ever charged more than the
 * website led them to expect.
 *
 * TODO: Replace every price below. Values live in the ops app under
 *       Equipment -> Pricing, grouped by model number:
 *
 *         60 lb washers  HCN060KCFX02004     45 lb dryers  HTT45NKCG2G2N05
 *         30 lb washers  HCN030KCFX03003     30 lb dryers  HTT30NKCB2G2N04
 *         20 lb washers  HCN020KCFX03003
 *
 *       For washers take the ATS1 (Hot) value. For dryers take ATSH (price)
 *       and CYC (run time in minutes).
 */
export const pricing = {
  /** Hot-wash price (ATS1) for each washer size. */
  washers: [
    { size: "20 lb", price: "$4.00" },
    { size: "30 lb", price: "$5.75" },
    { size: "60 lb", price: "$7.50" },
  ],

  /**
   * Dryers. ATSH is the vend price and CYC is the time that vend buys, so this
   * is a rate — 50 cents per 6 minutes — not the length of a whole cycle. The
   * page renders it as a rate so nobody reads "6 min" as the full dry time.
   */
  dryers: [
    { size: "30 lb", price: "$0.50", minutes: "6" },
    { size: "45 lb", price: "$0.75", minutes: "6" },
  ],

  /**
   * Disclaimer printed under the washer table.
   *
   * Hot is the most expensive cycle at every size, so saying warm and cold
   * cost less is both accurate and worth telling people — it is a reason to
   * come in, not just a hedge.
   */
  washerNote:
    "Prices shown are for a hot wash; warm and cold cycles cost less. Add-ons such as extra wash and extra rinse are priced at the machine.",

  /**
   * Laundry supplies are sold on site but not priced here — prices in the
   * vending machine are authoritative and change more often than this page.
   */
  suppliesNote:
    "Detergent, fabric softener, bleach, and dryer sheets are all available in store, so a forgotten bottle does not cost you a trip home.",
} as const;

/**
 * Payment methods.
 *
 * NOTE ON CARD PAYMENT: the FasCard rollout is in progress — some machines take
 * cards today, and the rest are being upgraded. The copy below says exactly
 * that on purpose. Do NOT change it to claim every machine takes cards until
 * the rollout is actually finished, or customers will show up with a card and
 * find a coin-only machine.
 *
 * When the rollout completes, set `fascardRolloutComplete` to true and the
 * site will automatically switch to the unqualified wording.
 */
export const fascardRolloutComplete = false;

export const payment = {
  coin: {
    title: "Coin operated",
    body: "Quarters work in every machine in the store.",
  },
  card: {
    title: fascardRolloutComplete ? "Tap or swipe to pay" : "Card payment on select machines",
    body: fascardRolloutComplete
      ? "Credit, debit, and contactless payment are accepted on every machine."
      : "We're rolling out FasCard readers across the store. A growing number of machines already accept credit, debit, and contactless payment — and the rest are being upgraded.",
  },
} as const;

/** Reasons to choose this laundromat. Shown as cards on the home page. */
export const highlights = [
  {
    title: `${totalWashers} washers, ${totalDryers} dryers`,
    body: "Enough capacity that you're not waiting for a machine, even on a busy Saturday.",
  },
  {
    title: "60 lb washers on site",
    body: "Comforters, sleeping bags, and bulky bedding that will not fit in a home machine.",
  },
  {
    title: `All ${equipment.brand} commercial equipment`,
    body: "The same machines used by hotels and hospitals — faster cycles and a harder extract, so everything spends less time in the dryer.",
  },
  {
    title: "Staffed part of the day",
    body: "An attendant is on site part of the day if you need change, a hand, or a question answered. Give us a call and we will tell you when someone is in.",
  },
  {
    title: "Supplies in store",
    body: "Detergent, dryer sheets, bleach, and softener available on site — no extra stop if you forgot yours.",
  },
  {
    title: "Business accounts welcome",
    body: "Predictable turnaround and volume pricing for salons, gyms, restaurants, and short-term rentals.",
  },
] as const;

/** Frequently asked questions. Also emitted as FAQ structured data for search. */
export const faqs = [
  {
    q: "Do I need quarters?",
    a: fascardRolloutComplete
      ? "No — every machine accepts cards, and quarters still work if you prefer them."
      : "Not necessarily. Every machine takes quarters, and a growing number also accept credit, debit, and contactless payment as we roll out FasCard readers across the store.",
  },
  {
    q: "How big a load can I wash?",
    a: "Our largest washers hold 60 lb — roughly six regular home loads, and large enough for a king comforter or a sleeping bag. We also have 30 lb and 20 lb machines for smaller loads.",
  },
  {
    q: "Is someone there to help?",
    a: "An attendant is on site for part of the day. Outside those hours the store is open and fully self-serve — every machine works exactly the same. Call us if you need a hand and we will tell you when someone is in.",
  },
  {
    q: "Do you sell detergent?",
    a: "Yes. Detergent pods, dryer sheets, bleach, and fabric softener are available in store, so a forgotten bottle does not cost you a trip home.",
  },
  {
    q: "Do you handle laundry for businesses?",
    a: "We do. We work with salons, gyms, restaurants, and short-term rental operators on recurring volume. Get in touch for pricing and turnaround times.",
  },
] as const;

/**
 * Business-account enquiry form.
 *
 * The site is statically exported, so there is no server to receive a form
 * POST. Point this at a form-handling service (Formspree, Netlify Forms,
 * Basin) and the form submits directly to it — no JavaScript required.
 *
 * Leave it as an empty string and the page falls back to a plain
 * phone-and-email call to action instead of showing a form that goes nowhere.
 *
 * TODO: Set this once you've created a form endpoint, or leave empty to keep
 *       the phone/email fallback.
 */
export const formEndpoint = "";

/** Types of business we serve. Shown on the commercial page. */
export const commercialSegments = [
  {
    title: "Salons & spas",
    body: "Towels and capes turned around on a dependable schedule, so you are never short mid-shift.",
  },
  {
    title: "Gyms & studios",
    body: "High-volume towel service with the extract power to get sweat and odor out properly.",
  },
  {
    title: "Restaurants & cafés",
    body: "Aprons, rags, and table linens — including the grease-heavy items home machines cannot handle.",
  },
  {
    title: "Short-term rentals",
    body: "Sheets, duvets, and towels between guests, sized for same-day turnover.",
  },
] as const;
