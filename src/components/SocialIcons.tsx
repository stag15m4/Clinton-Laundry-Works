import { business } from "@/content/site";

/** Facebook mark (simple-icons, CC0) -- shared with FacebookInviteBanner. */
export const FACEBOOK_ICON_PATH =
  "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.391 0 .957.075 1.472.15.258.039.517.079.727.12v3.491c-.179-.019-.513-.057-.967-.057-1.42 0-1.97.6-1.97 2.056v1.818h3.016l-.52 3.667h-2.496v7.98H9.101Z";

/**
 * Social links shown in the footer. Each entry's url comes from
 * business.social in site.ts -- empty string hides that icon entirely.
 * Marks via simple-icons (CC0), rendered in a single muted color to match
 * the card-network row.
 */
const icons: { name: string; url: string; path: string }[] = [
  {
    name: "Facebook",
    url: business.social.facebook,
    path: FACEBOOK_ICON_PATH,
  },
  {
    name: "Instagram",
    url: business.social.instagram,
    path: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63a5.883 5.883 0 0 0-2.126 1.384A5.883 5.883 0 0 0 .63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.789.717 1.459 1.384 2.126a5.868 5.868 0 0 0 2.126 1.384c.766.296 1.636.498 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.88 5.88 0 0 0 2.126-1.384 5.868 5.868 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.9 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.853.07-3.203 0-3.584-.015-4.853-.074-1.17-.061-1.814-.256-2.234-.421a3.81 3.81 0 0 1-1.388-.9 3.792 3.792 0 0 1-.899-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.848 0-3.2.016-3.586.061-4.854.061-1.17.255-1.814.42-2.234.21-.57.479-.96.899-1.381.419-.419.81-.689 1.38-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.853-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.846-10.405a1.441 1.441 0 1 1-2.883.001 1.441 1.441 0 0 1 2.883-.001z",
  },
];

export function SocialIcons({ className = "" }: { className?: string }) {
  const visible = icons.filter((icon) => icon.url);
  if (visible.length === 0) return null;

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {visible.map((icon) => (
        <a
          key={icon.name}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={icon.name}
          className="text-slate-500 transition hover:text-white"
        >
          <svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current">
            <path d={icon.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
