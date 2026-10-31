import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/StructuredData";
import { TemporaryHoursBanner } from "@/components/TemporaryHoursBanner";
import { FacebookInviteBanner } from "@/components/FacebookInviteBanner";
import { SkipToContentLink } from "@/components/SkipToContentLink";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { business } from "@/content/site";
import { display, orUndefined } from "@/content/util";

const siteUrl = orUndefined(business.siteUrl);
const city = display(business.address.city);

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${business.name} — Laundromat in ${city}`,
    template: `%s — ${business.name}`,
  },
  description:
    "Self-service laundromat with large-capacity commercial washers and dryers, on-site supplies, and business accounts welcome.",
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} — Laundromat in ${city}`,
    description:
      "Large-capacity commercial washers and dryers, on-site supplies, and business accounts welcome.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white font-sans text-slate-900 antialiased">
        <LanguageProvider>
          <SkipToContentLink />
          <FacebookInviteBanner />
          <TemporaryHoursBanner />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <StructuredData />
      </body>
    </html>
  );
}
