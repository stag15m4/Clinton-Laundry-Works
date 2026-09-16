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
  email: "TODO: an address you actually monitor",

  address: {
    street: "540 McKoy St",
    city: "Clinton",
    state: "NC",
    zip: "28328",
  },

  /**
   * Google Maps link.
   *
   * Leave this empty and the site builds a maps search from the street address
   * above, which works today and needs no Google Business Profile. Once the
   * signage is up and the Business Profile is claimed, paste the Share link
   * here and it takes precedence — a real listing shows reviews and photos
   * where a bare address search does not.
   */
  mapUrl: "",

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
  { day: "Monday",    open: "6:00 AM – 10:00 PM", attended: "TODO: attended hours" },
  { day: "Tuesday",   open: "6:00 AM – 10:00 PM", attended: "TODO: attended hours" },
  { day: "Wednesday", open: "6:00 AM – 10:00 PM", attended: "TODO: attended hours" },
  { day: "Thursday",  open: "6:00 AM – 10:00 PM", attended: "TODO: attended hours" },
  { day: "Friday",    open: "6:00 AM – 10:00 PM", attended: "TODO: attended hours" },
  { day: "Saturday",  open: "6:00 AM – 10:00 PM", attended: "TODO: attended hours" },
  { day: "Sunday",    open: "6:00 AM – 10:00 PM", attended: "TODO: attended hours" },
] as const;

/** Last wash is started this long before closing. Set to null to hide the notice. */
export const lastWashNotice = "TODO: how long before closing the last wash can start — or set to null to hide this";

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
    { size: "30 lb", count: 8 },
    { size: "20 lb", count: 4 },
  ],
} as const;

export const totalWashers = equipment.washers.reduce((n, w) => n + w.count, 0);
export const totalDryers = equipment.dryers.reduce((n, d) => n + d.count, 0);

/**
 * Pricing.
 *
 * This mirrors how prices are actually configured on the machines, and how the
 * ops app stores them: a washer has a separate vend price per cycle (the ATS
 * codes on the machine controller) plus two optional upcharges, and a dryer is
 * a flat price for a fixed run time.
 *
 * Cycle names map to controller codes like this:
 *
 *   ATS1 Hot          ATS4 Blankets Cold     CnP1 Extra Wash
 *   ATS2 Warm         ATS5 Delicate Warm     CnP2 Extra Rinse
 *   ATS3 Cold         ATS6 Delicate Cold
 *
 * TODO: Replace every price below. The values live in the ops app under
 *       Equipment → Pricing, grouped by model number:
 *
 *         60 lb washers  HCN060KCFX02004     45 lb dryers  HTT45NKCG2G2N05
 *         30 lb washers  HCN030KCFX03003     30 lb dryers  HTT30NKCB2G2N04
 *         20 lb washers  HCN020KCFX03003     20 lb dryers  HTT20NKCB2G2N04
 *
 * Hardcoded rather than read from that database on purpose: the public site
 * keeps working regardless of the ops app, and prices change rarely.
 *
 * A cycle priced `null` is not offered on that machine size and is rendered as
 * a dash rather than a missing price.
 */

/** Cycle columns, in the order they appear on the pricing table. */
export const washerCycles = [
  "Hot",
  "Warm",
  "Cold",
  "Blankets Cold",
  "Delicate Warm",
  "Delicate Cold",
] as const;

export type WasherCycle = (typeof washerCycles)[number];

export const pricing = {
  washers: [
    {
      size: "20 lb",
      cycles: {
        "Hot": "TODO: $0.00",
        "Warm": "TODO: $0.00",
        "Cold": "TODO: $0.00",
        "Blankets Cold": "TODO: $0.00",
        "Delicate Warm": "TODO: $0.00",
        "Delicate Cold": "TODO: $0.00",
      },
    },
    {
      size: "30 lb",
      cycles: {
        "Hot": "TODO: $0.00",
        "Warm": "TODO: $0.00",
        "Cold": "TODO: $0.00",
        "Blankets Cold": "TODO: $0.00",
        "Delicate Warm": "TODO: $0.00",
        "Delicate Cold": "TODO: $0.00",
      },
    },
    {
      size: "60 lb",
      cycles: {
        "Hot": "TODO: $0.00",
        "Warm": "TODO: $0.00",
        "Cold": "TODO: $0.00",
        "Blankets Cold": "TODO: $0.00",
        "Delicate Warm": "TODO: $0.00",
        "Delicate Cold": "TODO: $0.00",
      },
    },
  ] as readonly {
    readonly size: string;
    readonly cycles: Readonly<Record<WasherCycle, string | null>>;
  }[],

  /** Optional add-ons, priced once across all washers. */
  washerExtras: [
    { label: "Extra Wash", price: "TODO: $0.00" },
    { label: "Extra Rinse", price: "TODO: $0.00" },
  ],

  /** Dryers: a flat price buys a fixed run time. */
  dryers: [
    { size: "20 lb", price: "TODO: $0.00", minutes: "TODO: 00" },
    { size: "30 lb", price: "TODO: $0.00", minutes: "TODO: 00" },
    { size: "45 lb", price: "TODO: $0.00", minutes: "TODO: 00" },
  ],

  /** Set to null to hide the vending section on the pricing page. */
  vending: [
    { item: "Detergent pod", price: "TODO: $0.00" },
    { item: "Dryer sheets (2 pk)", price: "TODO: $0.00" },
    { item: "Bleach packet", price: "TODO: $0.00" },
    { item: "Fabric softener packet", price: "TODO: $0.00" },
  ],
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
    body: "An attendant is on site during posted hours if you need change, a hand, or a question answered.",
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
