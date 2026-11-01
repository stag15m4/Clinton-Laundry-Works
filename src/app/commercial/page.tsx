import type { Metadata } from "next";
import { CommercialContent } from "@/components/CommercialContent";

export const metadata: Metadata = {
  title: "Business Accounts",
  description:
    "Commercial laundry accounts for salons, gyms, restaurants, and short-term rentals. Volume pricing and dependable turnaround.",
};

export default function CommercialPage() {
  return <CommercialContent />;
}
