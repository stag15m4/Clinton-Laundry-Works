"use client";

import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { videos } from "@/content/videos";
import { useLanguage } from "@/i18n/LanguageProvider";

export function VideoGallery() {
  const { t } = useLanguage();

  return (
    <>
      <div className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <Container className="py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">🎬 {t("videosHeading")}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-50">{t("videosLead")}</p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-8 sm:grid-cols-2">
          {videos.map((v) => (
            <div
              key={v.id}
              className="overflow-hidden rounded-2xl border-4 border-brand-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-video w-full bg-slate-100">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="px-5 py-4 text-center text-lg font-semibold text-slate-900">{v.title}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
