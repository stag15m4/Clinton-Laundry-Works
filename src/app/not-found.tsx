"use client";

import Link from "next/link";
import { Container } from "@/components/Container";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <Container className="py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-600">404</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">{t("notFoundHeading")}</h1>
      <p className="mt-4 text-lg text-slate-600">{t("notFoundBody")}</p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
      >
        {t("notFoundBackHome")}
      </Link>
    </Container>
  );
}
