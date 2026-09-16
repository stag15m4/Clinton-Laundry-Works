import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { pricing, payment, equipment } from "@/content/site";
import { display } from "@/content/util";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Wash and dry prices by machine size, and laundry supplies available in store.",
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

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          {/* ── Washers ──────────────────────────────────────────────── */}
          <div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <caption className="bg-slate-50 px-6 py-4 text-left text-lg font-semibold text-slate-900">
                  Washers
                </caption>
                <thead className="border-y border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-sm font-semibold text-slate-700">
                      Capacity
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pricing.washers.map((w) => (
                    <tr key={w.size}>
                      <th scope="row" className="px-6 py-4 font-medium text-slate-900">
                        {w.size}
                      </th>
                      <td className="px-6 py-4 text-right tabular-nums text-slate-700">
                        {display(w.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              {pricing.washerNote}
            </p>
          </div>

          {/* ── Dryers ───────────────────────────────────────────────── */}
          <div>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-left">
                <caption className="bg-slate-50 px-6 py-4 text-left text-lg font-semibold text-slate-900">
                  Dryers
                </caption>
                <thead className="border-y border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-sm font-semibold text-slate-700">
                      Capacity
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                      Price
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
                        <span className="text-slate-500">
                          per {display(d.minutes)} min
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Add as much time as you need. Our washers spin at a high extract
              speed, so most loads need less dryer time than you are used to.
            </p>
          </div>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Prices are subject to change. Posted prices in store are authoritative.
        </p>
      </Section>

      <Section tone="muted" title="Supplies in store">
        <p className="max-w-2xl text-lg leading-relaxed text-slate-600">
          {pricing.suppliesNote}
        </p>
      </Section>

      <Section title="How to pay">
        <div className="grid gap-6 sm:grid-cols-2">
          {[payment.coin, payment.card].map((p) => (
            <div key={p.title} className="rounded-xl border border-slate-200 p-8">
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-slate-600">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted" title="Picking the right machine">
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
