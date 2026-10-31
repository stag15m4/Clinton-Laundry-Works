import type { TranslationKey } from "./translations";

// Maps the English day names stored in content/site.ts's `hours` array to
// the matching translation key, so the facts (which day, what time) stay in
// site.ts while the displayed label is localized.
const DAY_KEYS: Record<string, TranslationKey> = {
  Monday: "dayMonday",
  Tuesday: "dayTuesday",
  Wednesday: "dayWednesday",
  Thursday: "dayThursday",
  Friday: "dayFriday",
  Saturday: "daySaturday",
  Sunday: "daySunday",
};

export function dayKey(day: string): TranslationKey {
  return DAY_KEYS[day] ?? "dayMonday";
}
