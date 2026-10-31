"use client";

import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { business, equipment, formEndpoint } from "@/content/site";
import { display, isPlaceholder, telHref, mailtoHref } from "@/content/util";
import { useLanguage } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/interpolate";

export function CommercialContent() {
  const { t } = useLanguage();

  const segments = [
    { title: t("commercialSegment0Title"), body: t("commercialSegment0Body") },
    { title: t("commercialSegment1Title"), body: t("commercialSegment1Body") },
    { title: t("commercialSegment2Title"), body: t("commercialSegment2Body") },
    { title: t("commercialSegment3Title"), body: t("commercialSegment3Body") },
  ];

  const whyItems = [
    { h: t("commercialWhy0H"), p: t("commercialWhy0P") },
    { h: t("commercialWhy1H"), p: t("commercialWhy1P") },
    { h: interpolate(t("commercialWhy2H"), { brand: equipment.brand }), p: t("commercialWhy2P") },
  ];

  return (
    <>
      <div className="bg-slate-900 text-white">
        <Container className="py-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("commercialHeroTitle")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t("commercialHeroLead")}</p>
        </Container>
      </div>

      <Section title={t("commercialWhoTitle")}>
        <ul className="grid gap-8 sm:grid-cols-2">
          {segments.map((s) => (
            <li key={s.title} className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="muted" title={t("commercialWhyTitle")} lead={t("commercialWhyLead")}>
        <div className="grid gap-6 sm:grid-cols-3">
          {whyItems.map((item) => (
            <div key={item.h} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold">{item.h}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{item.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("commercialQuoteTitle")} lead={t("commercialQuoteLead")}>
        {formEndpoint ? (
          <form action={formEndpoint} method="POST" className="max-w-xl space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                {t("commercialFormName")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-slate-700">
                {t("commercialFormBusinessName")}
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                autoComplete="organization"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                {t("commercialFormEmail")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
                {t("commercialFormPhone")}{" "}
                <span className="font-normal text-slate-400">{t("commercialFormPhoneOptional")}</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="details" className="block text-sm font-medium text-slate-700">
                {t("commercialFormDetails")}
              </label>
              <textarea
                id="details"
                name="details"
                rows={4}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
            >
              {t("commercialFormSubmit")}
            </button>
          </form>
        ) : (
          <div className="max-w-xl rounded-xl border border-slate-200 bg-slate-50 p-8">
            <p className="leading-relaxed text-slate-700">{t("commercialFallbackText")}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={telHref(business.phoneHref)}
                className="rounded-lg bg-brand-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-700"
              >
                {interpolate(t("commercialFallbackCall"), { phone: display(business.phone) })}
              </a>
              {!isPlaceholder(business.email) && (
                <a
                  href={mailtoHref(business.email, "Business account enquiry")}
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  {t("commercialFallbackEmail")}
                </a>
              )}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
