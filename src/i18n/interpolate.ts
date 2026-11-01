/** Replaces `{token}` placeholders in a translated string with live values
 * (equipment counts, brand name, prices) that come from site.ts, not from
 * the translation itself -- so a count changing never requires editing
 * three languages' worth of copy. */
export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

/** Takes `count` as a plain `number` on purpose -- site.ts's content arrays
 * are `as const`, which narrows counts to literal types like `2 | 6 | 5`,
 * and comparing those against 1 inline is a type error (same reason
 * content/util.ts's `plural()` takes a widened `number`). */
export function isOne(count: number): boolean {
  return count === 1;
}
