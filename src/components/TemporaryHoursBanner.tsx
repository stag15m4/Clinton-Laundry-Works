"use client";

import Link from "next/link";
import { temporaryHours } from "@/content/site";
import { useLanguage } from "@/i18n/LanguageProvider";

/** Site-wide strip above the header. Disappears once temporaryHours.active is false. */
export function TemporaryHoursBanner() {
  const { t } = useLanguage();
  if (!temporaryHours.active) return null;

  return (
    <div className="bg-amber-400 text-amber-950">
      <p className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2 text-center text-sm font-medium">
        <span>{t("tempBannerText")}</span>
        <Link href="/visit/" className="font-semibold underline underline-offset-2 hover:no-underline">
          {t("tempBannerCta")}
        </Link>
      </p>
    </div>
  );
}
