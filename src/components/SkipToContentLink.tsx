"use client";

import { useLanguage } from "@/i18n/LanguageProvider";

export function SkipToContentLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
    >
      {t("skipToContent")}
    </a>
  );
}
