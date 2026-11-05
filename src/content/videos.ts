/**
 * Short, silly videos shown on the fun video page (/videos/).
 *
 * Unlike everything in site.ts, `title` here is NOT run through the i18n
 * system: these are one-off jokes and wordplay made for a laundromat TV,
 * not business information, and the list is expected to grow often as new
 * clips get made. Routing an ever-growing, often-untranslatable title into
 * the three-language-parity type check on translations.ts would turn every
 * new silly video into a translation chore.
 *
 * `id` is the YouTube video ID -- the part after youtu.be/ or ?v=. Add new
 * entries to the TOP of the array so the newest video shows first.
 */
export const videos = [
  { id: "eJaJ0MvAwAw", title: "Measure Before You Pour" },
  { id: "n4kNysnmme0", title: "Don't Feed Wally Too Much!" },
] as const;
