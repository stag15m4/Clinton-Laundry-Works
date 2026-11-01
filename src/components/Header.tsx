"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { business } from "@/content/site";
import { display, telHref } from "@/content/util";
import { useLanguage } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/interpolate";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Container } from "./Container";
import type { TranslationKey } from "@/i18n/translations";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const nav: { href: string; label: string }[] = [
    { href: "/", label: t("navHome") },
    { href: "/pricing/", label: t("navPricing") },
    { href: "/commercial/", label: t("navCommercial") },
    { href: "/visit/", label: t("navVisit") },
    { href: "/refund/", label: t("navRefund") },
  ];
  const callLabel = (key: TranslationKey) => interpolate(t(key), { phone: display(business.phone) });

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        {/* min-h, not a fixed h -- five nav items plus the switcher can run
            longer in Spanish/Haitian Creole than in English, and a fixed
            height clips or overlaps instead of just taking two lines. */}
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-y-2 py-2">
          <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
            <Image
              src="/logo.png"
              alt={business.name}
              width={2919}
              height={260}
              priority
              className="h-7 w-auto sm:h-8 md:h-9"
            />
          </Link>

          <nav className="hidden items-center gap-4 lg:flex lg:gap-6" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={telHref(business.phoneHref)}
              className="whitespace-nowrap rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {callLabel("callLabel")}
            </a>
          </nav>

          {/* Always visible, on every breakpoint -- not tucked behind the
              mobile menu toggle, so a non-English reader sees it without
              first guessing what the hamburger icon opens. */}
          <div className="flex shrink-0 items-center gap-2">
            <LanguageSwitcher compact />

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? t("closeMenuSr") : t("openMenuSr")}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-nav" className="border-t border-slate-200 py-4 lg:hidden" aria-label="Mobile">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={telHref(business.phoneHref)}
                  className="block rounded-lg bg-brand-600 px-3 py-2 text-center text-base font-semibold text-white"
                >
                  {callLabel("callLabel")}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
