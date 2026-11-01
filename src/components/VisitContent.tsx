"use client";

import Image from "next/image";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { amenityPhotos, business, hours, lastWashNotice, temporaryHours } from "@/content/site";
import { display, isPlaceholder, telHref, mailtoHref, mapsUrl } from "@/content/util";
import { useLanguage } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/interpolate";
import { dayKey } from "@/i18n/day-key";
import type { TranslationKey } from "@/i18n/translations";

// Captions are translated in parallel with amenityPhotos in content/site.ts
// (by index) -- if a photo is added, removed, or reordered there, this
// list needs updating to match.
const AMENITY_CAPTION_KEYS: TranslationKey[] = ["visitAmenity0Caption", "visitAmenity1Caption", "visitAmenity2Caption"];

export function VisitContent() {
  const { t } = useLanguage();
  const { address } = business;
  const mapLink = mapsUrl(business.mapUrl, address);
  const hasAttendant = hours.some((h) => h.attended && !isPlaceholder(h.attended));

  return (
    <>
      <div className="bg-slate-900 text-white">
        <Container className="py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("visitHeroTitle")}</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-300">
                {temporaryHours.active ? t("visitHeroEasing") : t("visitHeroOpenAlways")}
                {hasAttendant && t("visitHeroAttendantNote")}
              </p>
            </div>

            <Image
              src="/photos/doorway.jpg"
              alt={`Looking into ${business.name} through the front door`}
              width={1800}
              height={2400}
              priority
              className="max-h-[420px] w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </Container>
      </div>

      {temporaryHours.active && (
        <div className="bg-amber-50">
          <Container className="py-10">
            <h2 className="text-2xl font-bold text-amber-950">{t("visitThisWeekTitle")}</h2>
            <p className="mt-2 max-w-2xl text-amber-900">{temporaryHours.resumesNote}</p>
            <div className="mt-6 overflow-hidden rounded-xl border border-amber-200 bg-white">
              <table className="w-full text-left">
                <thead className="border-b border-amber-200 bg-amber-100">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-amber-950">
                      {t("visitDayHeader")}
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-amber-950">
                      {t("visitHoursHeader")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {temporaryHours.days.map((d) => (
                    <tr key={d.day}>
                      <th scope="row" className="px-5 py-3 font-medium text-slate-900">
                        {d.day} <span className="font-normal text-slate-500">({d.date})</span>
                      </th>
                      <td className="px-5 py-3 text-slate-700">{d.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </div>
      )}

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">
              {temporaryHours.active ? t("visitRegularHoursTitle") : t("visitHoursOnlyTitle")}
            </h2>
            {temporaryHours.active && <p className="mt-1 text-sm text-slate-500">{t("visitStartingNote")}</p>}
            <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-slate-700">
                      {t("visitDayHeader")}
                    </th>
                    <th scope="col" className="px-5 py-3 text-sm font-semibold text-slate-700">
                      {t("visitOpenHeader")}
                    </th>
                    {hasAttendant && (
                      <th scope="col" className="px-5 py-3 text-sm font-semibold text-slate-700">
                        {t("visitAttendedHeader")}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hours.map((h) => (
                    <tr key={h.day}>
                      <th scope="row" className="px-5 py-3 font-medium text-slate-900">
                        {t(dayKey(h.day))}
                      </th>
                      <td className="px-5 py-3 text-slate-700">{display(h.open)}</td>
                      {hasAttendant && (
                        <td className="px-5 py-3 text-slate-500">
                          {!h.attended ? (
                            <span className="text-slate-400">{t("selfServe")}</span>
                          ) : isPlaceholder(h.attended) ? (
                            <span className="text-slate-400">{t("toBePosted")}</span>
                          ) : (
                            display(h.attended)
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {lastWashNotice && !isPlaceholder(lastWashNotice) && (
              <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {display(lastWashNotice)}
              </p>
            )}

            {hasAttendant && (
              <p className="mt-4 text-sm leading-relaxed text-slate-500">{t("visitOutsideAttendedNote")}</p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold">{t("visitFindUsTitle")}</h2>
            <address className="mt-6 not-italic text-lg leading-relaxed text-slate-700">
              {display(address.street)}
              <br />
              {display(address.city)}, {display(address.state)} {display(address.zip)}
            </address>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {mapLink && (
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-brand-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-700"
                >
                  {t("visitOpenInMaps")}
                </a>
              )}
              <a
                href={telHref(business.phoneHref)}
                className="rounded-lg border border-slate-300 px-6 py-3 text-center font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                {interpolate(t("callLabel"), { phone: display(business.phone) })}
              </a>
            </div>

            <dl className="mt-10 space-y-4">
              {!isPlaceholder(business.email) && (
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {t("visitEmailLabel")}
                  </dt>
                  <dd className="mt-1 text-lg">
                    <a href={mailtoHref(business.email)} className="text-brand-700 hover:underline">
                      {display(business.email)}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="muted" title={t("visitWhatsInsideTitle")}>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {amenityPhotos.map((photo, i) => (
            <figure key={photo.src} className="overflow-hidden rounded-xl bg-white shadow-sm">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="h-64 w-full object-cover"
              />
              <figcaption className="p-5 text-slate-600">{t(AMENITY_CAPTION_KEYS[i])}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}
