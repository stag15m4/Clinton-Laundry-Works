"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { business, refundApiBaseUrl, turnstileSiteKey } from "@/content/site";
import { display, isPlaceholder, orFallback, telHref, mailtoHref } from "@/content/util";
import { useLanguage } from "@/i18n/LanguageProvider";
import { interpolate } from "@/i18n/interpolate";

// Cloudflare's published "always passes" test site key -- used only while
// turnstileSiteKey is still the TODO placeholder, so the form stays usable
// (if unverified) in local development before a real key is set.
const TEST_SITE_KEY = "1x00000000000000000000AA";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

function emptyForm() {
  return {
    machineLabel: "",
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    customerEmail: "",
    issueDateTime: "",
    transactionAmount: "",
    amountRequested: "",
    description: "",
    certifiedAccurate: false,
  };
}

export function RefundContent() {
  const { t } = useLanguage();
  const siteKey = orFallback(turnstileSiteKey, TEST_SITE_KEY);
  const apiConfigured = !isPlaceholder(refundApiBaseUrl);

  const [form, setForm] = useState(emptyForm());
  const [turnstileToken, setTurnstileToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scriptReady || !widgetRef.current || !window.turnstile) return;
    const id = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      callback: (token) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
    });
    return () => window.turnstile?.reset(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptReady]);

  function update<K extends keyof ReturnType<typeof emptyForm>>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (
      !form.machineLabel.trim() ||
      !form.customerName.trim() ||
      !form.customerPhone.trim() ||
      !form.customerAddress.trim() ||
      !form.issueDateTime ||
      !form.transactionAmount ||
      !form.amountRequested ||
      !form.description.trim()
    ) {
      setError(t("refundErrorRequired"));
      return;
    }
    if (!form.certifiedAccurate) {
      setError(t("refundErrorCertify"));
      return;
    }
    if (!turnstileToken) {
      setError(t("refundErrorHuman"));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${refundApiBaseUrl}/api/refund-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          turnstileToken,
          machineLabel: form.machineLabel.trim(),
          customerName: form.customerName.trim(),
          customerPhone: form.customerPhone.trim(),
          customerAddress: form.customerAddress.trim(),
          customerEmail: form.customerEmail.trim() || null,
          issueDate: new Date(form.issueDateTime).toISOString(),
          transactionAmount: Number(form.transactionAmount),
          amountRequested: Number(form.amountRequested),
          description: form.description.trim(),
          certifiedAccurate: true,
        }),
      });
      if (!res.ok) {
        setError(t("refundErrorGeneric"));
        window.turnstile?.reset();
        setTurnstileToken("");
        return;
      }
      setSubmitted(true);
    } catch {
      setError(t("refundErrorGeneric"));
    } finally {
      setSubmitting(false);
    }
  }

  function startOver() {
    setForm(emptyForm());
    setSubmitted(false);
    setError("");
    setTurnstileToken("");
  }

  return (
    <>
      <div className="bg-slate-900 text-white">
        <Container className="py-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("refundPageTitle")}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">{t("refundPageLead")}</p>
        </Container>
      </div>

      <Section>
        {!apiConfigured ? (
          <div className="max-w-xl rounded-xl border border-slate-200 bg-slate-50 p-8">
            <p className="leading-relaxed text-slate-700">{t("refundFallbackText")}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={telHref(business.phoneHref)}
                className="rounded-lg bg-brand-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-brand-700"
              >
                {interpolate(t("commercialFallbackCall"), { phone: display(business.phone) })}
              </a>
              {!isPlaceholder(business.email) && (
                <a
                  href={mailtoHref(business.email, "Refund request")}
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-800 transition hover:bg-slate-100"
                >
                  {t("commercialFallbackEmail")}
                </a>
              )}
            </div>
          </div>
        ) : submitted ? (
          <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{t("refundSuccessTitle")}</h2>
            <p className="mt-2 text-slate-600">{t("refundSuccessBody")}</p>
            <button
              type="button"
              onClick={startOver}
              className="mt-6 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              {t("refundNewRequestButton")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl space-y-5">
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              strategy="afterInteractive"
              onLoad={() => setScriptReady(true)}
            />

            <div>
              <label htmlFor="machineLabel" className="block text-sm font-medium text-slate-700">
                {t("refundUnitLabel")}
              </label>
              <input
                id="machineLabel"
                type="text"
                required
                value={form.machineLabel}
                onChange={(e) => update("machineLabel", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
              <p className="mt-1 text-xs text-slate-500">{t("refundUnitHint")}</p>
            </div>

            <div>
              <label htmlFor="issueDateTime" className="block text-sm font-medium text-slate-700">
                {t("refundDateTimeLabel")}
              </label>
              <input
                id="issueDateTime"
                type="datetime-local"
                required
                value={form.issueDateTime}
                onChange={(e) => update("issueDateTime", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="transactionAmount" className="block text-sm font-medium text-slate-700">
                  {t("refundTransactionAmountLabel")}
                </label>
                <input
                  id="transactionAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={form.transactionAmount}
                  onChange={(e) => update("transactionAmount", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
                />
                <p className="mt-1 text-xs text-slate-500">{t("refundTransactionAmountHint")}</p>
              </div>
              <div>
                <label htmlFor="amountRequested" className="block text-sm font-medium text-slate-700">
                  {t("refundAmountRequestedLabel")}
                </label>
                <input
                  id="amountRequested"
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={form.amountRequested}
                  onChange={(e) => update("amountRequested", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-slate-700">
                {t("refundNameLabel")}
              </label>
              <input
                id="customerName"
                type="text"
                required
                autoComplete="name"
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-slate-700">
                  {t("refundPhoneLabel")}
                </label>
                <input
                  id="customerPhone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.customerPhone}
                  onChange={(e) => update("customerPhone", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-slate-700">
                  {t("refundEmailLabel")}
                </label>
                <input
                  id="customerEmail"
                  type="email"
                  autoComplete="email"
                  value={form.customerEmail}
                  onChange={(e) => update("customerEmail", e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="customerAddress" className="block text-sm font-medium text-slate-700">
                {t("refundAddressLabel")}
              </label>
              <textarea
                id="customerAddress"
                rows={2}
                required
                autoComplete="street-address"
                value={form.customerAddress}
                onChange={(e) => update("customerAddress", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                {t("refundDescriptionLabel")}
              </label>
              <textarea
                id="description"
                rows={4}
                required
                placeholder={t("refundDescriptionPlaceholder")}
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2.5 shadow-sm"
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-800">{t("refundDisclaimerHeading")}</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {interpolate(t("refundDisclaimerBody"), { name: business.name })}
              </p>
              <label className="mt-4 flex items-start gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.certifiedAccurate}
                  onChange={(e) => update("certifiedAccurate", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300"
                />
                {t("refundCertifyLabel")}
              </label>
            </div>

            <div ref={widgetRef} />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {submitting ? t("refundSubmittingButton") : t("refundSubmitButton")}
            </button>
          </form>
        )}
      </Section>
    </>
  );
}
