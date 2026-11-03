"use client";

import Image from "next/image";
import { GoogleReviews } from "@/components/GoogleReviews";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import {
  business,
  equipment,
  totalWashers,
  totalDryers,
  fascardRolloutComplete,
} from "@/content/site";
import { display, telHref } from "@/content/util";
import { useLanguage } from "@/i18n/LanguageProvider";
import { interpolate, isOne } from "@/i18n/interpolate";

export default function HomePage() {
  const { t } = useLanguage();
  const vars = { washers: totalWashers, dryers: totalDryers, brand: equipment.brand };

  const highlights = [
    { title: interpolate(t("highlight0Title"), vars), body: t("highlight0Body") },
    { title: t("highlight1Title"), body: t("highlight1Body") },
    { title: interpolate(t("highlight2Title"), vars), body: t("highlight2Body") },
    { title: t("highlight3Title"), body: t("highlight3Body") },
    { title: t("highlight4Title"), body: t("highlight4Body") },
    { title: t("highlight5Title"), body: t("highlight5Body") },
  ];

  const faqs = [
    { q: t("faq0Q"), a: fascardRolloutComplete ? t("faq0ADone") : t("faq0ARolling") },
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
  ];

  const paymentCards = [
    { title: t("paymentCoinTitle"), body: t("paymentCoinBody") },
    fascardRolloutComplete
      ? { title: t("paymentCardTitleDone"), body: t("paymentCardBodyDone") }
      : { title: t("paymentCardTitleRolling"), body: t("paymentCardBodyRolling") },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="bg-slate-900 text-white">
        <Container className="py-20 sm:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-brand-300">
                {display(business.address.city)}, {display(business.address.state)}
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">{t("heroTagline")}</h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">{interpolate(t("heroIntro"), vars)}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/visit/"
                  className="rounded-lg bg-brand-500 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-brand-400"
                >
                  {t("heroCtaHours")}
                </Link>
                <Link
                  href="/pricing/"
                  className="rounded-lg border border-slate-600 px-6 py-3 text-center text-base font-semibold text-white transition hover:bg-slate-800"
                >
                  {t("heroCtaPricing")}
                </Link>
              </div>
            </div>

            <Image
              src="/photos/hero-aisle.jpg"
              alt={`Rows of ${equipment.brand} washers and dryers inside ${business.name}`}
              width={2400}
              height={1800}
              priority
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </Container>
      </div>

      {/* ── About ────────────────────────────────────────────────────────── */}
      <Section tone="muted" title={t("aboutHeading")} lead={t("aboutP1")}>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-600">{t("aboutP2")}</p>
      </Section>

      {/* ── Why here ─────────────────────────────────────────────────────── */}
      <Section title={t("whyTitle")} lead={t("whyLead")}>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h) => (
            <li key={h.title} className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900">{h.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{h.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Equipment ────────────────────────────────────────────────────── */}
      <Section tone="muted" title={t("equipmentTitle")} lead={interpolate(t("equipmentLead"), vars)}>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              {t("washersLabel")} <span className="text-slate-400">({totalWashers})</span>
            </h3>
            <ul className="mt-6 space-y-5">
              {equipment.washers.map((w) => (
                <li key={w.size} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-lg font-semibold text-brand-700">{w.size}</span>
                    <span className="text-sm font-medium text-slate-500">
                      {interpolate(t(isOne(w.count) ? "machineCountOne" : "machineCountMany"), { count: w.count })}
                    </span>
                  </div>
                  <p className="mt-1 text-slate-600">{w.blurb}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
              {t("dryersLabel")} <span className="text-slate-400">({totalDryers})</span>
            </h3>
            <ul className="mt-6 space-y-5">
              {equipment.dryers.map((d) => (
                <li key={d.size} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-lg font-semibold text-brand-700">{d.size}</span>
                    <span className="text-sm font-medium text-slate-500">
                      {interpolate(t(isOne(d.count) ? "dryerCountOne" : "dryerCountMany"), { count: d.count })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-slate-500">{t("stackedNote")}</p>
          </div>
        </div>
      </Section>

      {/* ── Payment ──────────────────────────────────────────────────────── */}
      <Section title={t("paymentTitle")}>
        <div className="grid gap-6 sm:grid-cols-2">
          {paymentCards.map((p) => (
            <div key={p.title} className="rounded-xl border border-slate-200 p-8">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <GoogleReviews />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <Section tone="muted" title={t("faqTitle")}>
        <dl className="max-w-3xl space-y-6">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl bg-white p-6 shadow-sm">
              <dt className="text-lg font-semibold text-slate-900">{f.q}</dt>
              <dd className="mt-2 leading-relaxed text-slate-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <div className="bg-brand-700 text-white">
        <Container className="py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t("ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">{t("ctaLead")}</p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/visit/"
              className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              {t("ctaFindUs")}
            </Link>
            <a
              href={telHref(business.phoneHref)}
              className="rounded-lg border border-brand-400 px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-600"
            >
              {interpolate(t("callLabel"), { phone: display(business.phone) })}
            </a>
          </div>
        </Container>
      </div>
    </>
  );
}
