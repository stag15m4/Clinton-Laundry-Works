import Link from "next/link";
import { temporaryHours } from "@/content/site";

/** Site-wide strip above the header. Disappears once temporaryHours.active is false. */
export function TemporaryHoursBanner() {
  if (!temporaryHours.active) return null;

  return (
    <div className="bg-amber-400 text-amber-950">
      <p className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-sm font-medium">
        <span>We&rsquo;re easing into regular hours this week, so hours vary day to day.</span>
        <Link href="/visit/" className="font-semibold underline underline-offset-2 hover:no-underline">
          See this week&rsquo;s hours
        </Link>
      </p>
    </div>
  );
}
