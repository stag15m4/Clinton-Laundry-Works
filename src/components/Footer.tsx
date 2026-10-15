import Link from "next/link";
import { business, hours, payment } from "@/content/site";
import { display, telHref, mailtoHref, isPlaceholder } from "@/content/util";
import { CardIcons } from "./CardIcons";
import { SocialIcons } from "./SocialIcons";
import { Container } from "./Container";

export function Footer() {
  const { address } = business;

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold text-white">{business.name}</h2>
            <address className="mt-4 not-italic leading-relaxed">
              {display(address.street)}
              <br />
              {display(address.city)}, {display(address.state)}{" "}
              {display(address.zip)}
            </address>
            <p className="mt-4">
              <a href={telHref(business.phoneHref)} className="hover:text-white">
                {display(business.phone)}
              </a>
            </p>
            {!isPlaceholder(business.email) && (
              <p>
                <a href={mailtoHref(business.email)} className="hover:text-white">
                  {display(business.email)}
                </a>
              </p>
            )}
            <SocialIcons className="mt-4" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">Hours</h2>
            <dl className="mt-4 space-y-1 text-sm">
              {hours.map((h) => (
                <div key={h.day} className="flex justify-between gap-4">
                  <dt>{h.day}</dt>
                  <dd className="text-right text-slate-400">{display(h.open)}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">Pages</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/pricing/" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/commercial/" className="hover:text-white">Business Accounts</Link></li>
              <li><Link href="/visit/" className="hover:text-white">Hours &amp; Location</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-slate-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-slate-500">
            <span className="text-sm">{payment.card.title}</span>
            <CardIcons />
          </div>
        </div>
      </Container>
    </footer>
  );
}
