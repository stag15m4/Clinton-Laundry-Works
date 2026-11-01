"use client";

import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { pricing, equipment, fascardRolloutComplete } from "@/content/site";
import { display } from "@/content/util";
import { useLanguage } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/interpolate";

export function PricingContent() {
  const { t } = useLanguage();
  const totalWashers = equipment.washers.reduce((n, w) => n + w.count, 0);

  const paymentCards = [
    { title: t("paymentCoinTitle"), body: t("paymentCoinBody") },
    fascardRolloutComplete
      ? { title: t("paymentCardTitleDone"), body: t("paymentCardBodyDone") }
      : { title: t("paymentCardTitleRolling"), body: t("paymentCardBodyRolling") },
  ];

  return (
    <>
      <div className="bg-slate-900 text-white">
        <Container className="py-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("pricingPageTitle")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t("pricingPageLead")}</p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <caption className="bg-slate-50 px-6 py-4 text-left text-lg font-semibold text-slate-900">
                  {t("pricingWashersCaption")}
                </caption>
                <thead className="border-y border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-sm font-semibold text-slate-700">
                      {t("pricingCapacityHeader")}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                      {t("pricingPriceHeader")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pricing.washers.map((w) => (
                    <tr key={w.size}>
                      <th scope="row" className="px-6 py-4 font-medium text-slate-900">
                        {w.size}
                      </th>
                      <td className="px-6 py-4 text-right tabular-nums text-slate-700">{display(w.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">{t("pricingWasherNote")}</p>
          </div>

          <div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <caption className="bg-slate-50 px-6 py-4 text-left text-lg font-semibold text-slate-900">
                  {t("pricingDryersCaption")}
                </caption>
                <thead className="border-y border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-sm font-semibold text-slate-700">
                      {t("pricingCapacityHeader")}
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                      {t("pricingPriceHeader")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pricing.dryers.map((d) => (
                    <tr key={d.size}>
                      <th scope="row" className="px-6 py-4 font-medium text-slate-900">
                        {d.size}
                      </th>
                      <td className="px-6 py-4 text-right tabular-nums text-slate-700">
                        {display(d.price)}{" "}
                        <span className="text-slate-500">{interpolate(t("pricingPerMinutes"), { minutes: display(d.minutes) })}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">{t("pricingDryerTimeNote")}</p>
          </div>
        </div>

        <p className="mt-10 text-sm text-slate-500">{t("pricingSubjectNote")}</p>
      </Section>

      <Section tone="muted" title={t("pricingSuppliesTitle")}>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-600">{t("pricingSuppliesNote")}</p>
      </Section>

      <Section title={t("paymentTitle")}>
        <div className="grid gap-6 sm:grid-cols-2">
          {paymentCards.map((p) => (
            <div key={p.title} className="rounded-xl border border-slate-200 p-8">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" title={t("pricingPickingTitle")}>
        <div className="max-w-3xl space-y-4 leading-relaxed text-slate-600">
          <p>
            <strong className="text-slate-900">{t("pricingPicking20Label")}</strong> {t("pricingPicking20Body")}
          </p>
          <p>
            <strong className="text-slate-900">{t("pricingPicking30Label")}</strong> {t("pricingPicking30Body")}
          </p>
          <p>
            <strong className="text-slate-900">{t("pricingPicking60Label")}</strong> {t("pricingPicking60Body")}
          </p>
          <p>{interpolate(t("pricingPickingAllWashers"), { count: totalWashers, brand: equipment.brand })}</p>
        </div>
      </Section>
    </>
  );
}
