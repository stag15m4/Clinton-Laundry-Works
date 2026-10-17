import { business } from "@/content/site";
import { FACEBOOK_ICON_PATH } from "./SocialIcons";

/**
 * Evergreen strip above the header inviting visitors to the Facebook page.
 * Hidden automatically if business.social.facebook is ever cleared.
 */
export function FacebookInviteBanner() {
  const url = business.social.facebook;
  if (!url) return null;

  return (
    <div className="bg-brand-700 text-white">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-sm font-medium transition hover:bg-brand-800"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 shrink-0 fill-current">
          <path d={FACEBOOK_ICON_PATH} />
        </svg>
        <span>We&rsquo;re on Facebook! Follow us for hours updates, promos &amp; more.</span>
        <span className="font-semibold underline underline-offset-2">Like Our Page</span>
      </a>
    </div>
  );
}
