"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { LOCALES } from "@/i18n/locales";

// Each language's own name is its own cue -- someone who reads only
// Spanish or only Haitian Creole doesn't need to read English first to
// recognize "Español" or "Kreyòl". The globe icon (not text) signals "pick
// a language" without assuming a reading language either.
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white ${
        compact ? "px-1.5 py-1" : "px-2 py-1.5"
      }`}
      role="group"
      aria-label="Language"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5 h-4 w-4 shrink-0 fill-none stroke-slate-400">
        <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" strokeWidth="1.75" />
      </svg>
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          className={`rounded-full font-semibold transition-colors ${
            compact ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
          } ${locale === l.code ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
