import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { pricing, washerCycles, payment, equipment } from "@/content/site";
import { display, lowestPrice } from "@/content/util";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Wash prices by machine size and cycle, dryer prices and run times, and laundry supplies available in store.",
};

export default function PricingPage() {
  return (
    <>
      <div className="bg-slate-900 text-white">
        <Container className="py-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Pay for the machine that fits your load. Bigger drums cost more per
            cycle but far less per pound — one 60 lb wash beats three small ones
            on both price and time.
          </p>
        </Container>
      </div>

      {/* ── Washers: size × cycle ──────────────────────────────────────── */}
      <Section
        title="Washers"
        lead="Each machine size is priced by cycle. Cold water costs less to run than hot, and that difference is passed through rather than averaged into one flat price."
      >
        {/* Horizontally scrollable on phones — the matrix is wider than 390px. */}
        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 border-b border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  Capacity
                </th>
                {washerCycles.map((cycle) => (
                  <th
                    key={cycle}
                    scope="col"
                    className="border-b border-slate-200 px-4 py-3 text-right text-sm font-semibold text-slate-700"
                  >
                    {cycle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.washers.map((washer) => {
                const from = lowestPrice(Object.values(washer.cycles));
                return (
                  <tr key={washer.size}>
                    <th
                      scope="row"
                      className="sticky left-0 z-10 border-b border-slate-100 bg-white px-4 py-4 font-medium text-slate-900"
                    >
                      {washer.size}
                      {from && (
                        <span className="block text-xs font-normal text-slate-500">
                          from {from}
                        </span>
                      )}
                    </th>
                    {washerCycles.map((cycle) => {
                      const value = washer.cycles[cycle];
                      return (
                        <td
                          key={cycle}
                          className="border-b border-slate-100 px-4 py-4 text-right tabular-nums text-slate-700"
                        >
                          {value === null ? (
                            <span className="text-slate-300" aria-label="Not available">
                              —
                            </span>
                          ) : (
                            display(value)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {pricing.washerExtras.length > 0 && (
          <div className="mt-8 max-w-md rounded-xl border border-slate-200 p-6">
            <h3 className="text-base font-semibold text-slate-900">Add-ons</h3>
            <dl className="mt-4 space-y-2">
              {pricing.washerExtras.map((extra) => (
                <div key={extra.label} className="flex justify-between gap-4">
                  <dt className="text-slate-600">{extra.label}</dt>
                  <dd className="tabular-nums font-medium text-slate-900">
                    {display(extra.price)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              An extra rinse is worth it for towels, bedding, and anyone with
              sensitive skin — it pulls out detergent a single rinse leaves
              behind.
            </p>
          </div>
        )}
      </Section>

      {/* ── Dryers ─────────────────────────────────────────────────────── */}
      <Section tone="muted" title="Dryers" lead="A flat price buys a fixed run time. Add more time as needed.">
        <div className="max-w-2xl overflow-hidden rounded-xl bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-sm font-semibold text-slate-700">
                  Capacity
                </th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                  Run time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pricing.dryers.map((dryer) => (
                <tr key={dryer.size}>
                  <th scope="row" className="px-6 py-4 font-medium text-slate-900">
                    {dryer.size}
                  </th>
                  <td className="px-6 py-4 text-right tabular-nums text-slate-700">
                    {display(dryer.price)}
                  </td>
                  <td className="px-6 py-4 text-right tabular-nums text-slate-700">
                    {display(dryer.minutes)} min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* ── Supplies ───────────────────────────────────────────────────── */}
      {pricing.vending && (
        <Section title="Supplies in store">
          <div className="max-w-md overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-sm font-semibold text-slate-700">
                    Item
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pricing.vending.map((v) => (
                  <tr key={v.item}>
                    <th scope="row" className="px-6 py-4 font-medium text-slate-900">
                      {v.item}
                    </th>
                    <td className="px-6 py-4 text-right tabular-nums text-slate-700">
                      {display(v.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Prices are subject to change. Posted prices in store are authoritative.
          </p>
        </Section>
      )}

      <Section tone="muted" title="How to pay">
        <div className="grid gap-6 sm:grid-cols-2">
          {[payment.coin, payment.card].map((p) => (
            <div key={p.title} className="rounded-xl bg-white p-8 shadow-sm">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Picking the right machine">
        <div className="max-w-3xl space-y-4 leading-relaxed text-slate-600">
          <p>
            <strong className="text-slate-900">20 lb</strong> handles roughly one
            full home hamper — a good choice for a single person&apos;s weekly load
            or a separate delicates run.
          </p>
          <p>
            <strong className="text-slate-900">30 lb</strong> is about three
            regular home loads. For most families this is the everyday machine:
            one wash instead of three.
          </p>
          <p>
            <strong className="text-slate-900">60 lb</strong> is for the things
            that do not fit anywhere else — king comforters, sleeping bags,
            mattress pads, or a week of laundry for a full household in a single
            cycle.
          </p>
          <p>
            All {equipment.washers.reduce((n, w) => n + w.count, 0)} washers are{" "}
            {equipment.brand} commercial units with a high-speed extract, which
            pulls more water out before the dryer. That means less dryer time and
            less money spent drying.
          </p>
        </div>
      </Section>
    </>
  );
}
